#!/usr/bin/env node
import path from 'path';
import fs from 'fs-extra';
import minimist from 'minimist';
import prompts from 'prompts';
import { fileURLToPath } from 'url';
import { createRequire } from 'node:module';


const argv = minimist(process.argv.slice(2));
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const require = createRequire(import.meta.url);

if (argv.t && argv.template) {
  console.error(`Error: illegal options: specify either -t or --template, not both.`)
  process.exit(1)
}
if (argv.s && argv.sync) {
  console.error(`Error: illegal options: specify either -s or --sync, not both.`)
  process.exit(1)
}
if (argv.e && argv.endpoints) {
  console.error(`Error: illegal options: specify either -e or --endpoint, not both.`)
  process.exit(1)
}

let template = argv.t || argv.template;
let sync = argv.s || argv.sync;
let endpoints = argv.e?.join(', ') || argv.endpoints;

async function init() {
  if (!template || !sync || !endpoints) {
    await (async () => {
      let options = [];
      if (!template) {
        options.push({
          type: 'select',
          name: 'template',
          message: 'Choose a template:',
          choices: [
            { title: 'Vanilla Vite TS', value: 'vanilla-vite-ts' }
          ],
        })
      }
      if (!sync) {
        options.push({
          type: 'text',
          name: 'sync',
          message: 'Set your DWN sync interval, eg. 2s; 2m; 2h; 2d; (Default set if not provided: 2m)',
          initial: '',
          validate: sync => /^[0-9][a-z]/.test(sync) || sync === '' ? true : 'Please enter response as a valid time format eg. 2s; 2m; 2h; 2d'
        })
      }
      if (!endpoints) {
        options.push({
          type: 'text',
          name: 'endpoints',
          message: 'Set DWN endpoints (Default set if not provided)',
          initial: '',
          validate: endpoints => /^https?:\/\//.test(endpoints) || endpoints === '' ? true : 'Please enter a valid URL'
        })
      }
      const response = await prompts(options, { onCancel: () => { console.error(`Project terminated.`); process.exit(1) }});
      template = template || response.template;
      sync = sync || response.sync;
      endpoints = endpoints || response.endpoints;
    })();
  }
  const targetDir = argv._[0] || '.' // last arg ie. `my-app` in `npx create web5/@latest my-app`
  const cwd = process.cwd()
  const root = path.join(cwd, targetDir)
  const renameFiles = {
    _gitignore: '.gitignore',
  }
  console.log(`Scaffolding project in ${root}...`)

  await fs.ensureDir(root)
  const existing = await fs.readdir(root)
  if (existing.length) {
    console.error(`Error: target directory is not empty.`)
    process.exit(1)
  }

  const templateDir = path.join(
    __dirname,
    `template-${template || 'vanilla-vite-ts'}` // -t or --template=template-vanilla-vite-ts
  )
 
  const write = async (file, content) => {
    const targetPath = path.join(root, renameFiles[file] ?? file)
    if (content) {
      await fs.writeFile(targetPath, content)
    } else {
      await fs.copy(path.join(templateDir, file), targetPath)
    }
  }


  const files = await fs.readdir(templateDir)
  for (const file of files) {
    if (file === 'package.json') {
      const pkg = require(path.join(templateDir, `package.json`))
      pkg.name = path.basename(root)
      await write(file, JSON.stringify(pkg, null, 2))
    } else if (file === 'web5-config.ts' && (sync || endpoints)) {
      fs.readFile(path.join(templateDir, `web5-config.ts`), 'utf8', async function (err, data) {
        if (err) {
          return console.log(err);
        }
        const dwnSync = (sync) ? `sync: '${sync}'` : undefined // -s or --sync=2m
        const dwnEndpoints = (endpoints) ? `dwnEndpoints: ['${endpoints}']` : undefined // -e for each endpoint or --endpoints=https://test.com,https://test2.com
        const concat = dwnSync && dwnEndpoints ? dwnSync + ', ' + dwnEndpoints : undefined
        const result = data.replace(/Web5.connect\(\)/g, `Web5.connect({ ${concat ?? dwnSync ?? dwnEndpoints } })`);
        await write(file, result)
      });
    } else {
      await write(file, undefined)
    }
  }

  console.log(`\nDone. Now run:\n`)
  if (root !== cwd) {
    console.log(`  cd ${path.relative(cwd, root)}`)
  }
  console.log(`  npm install`)
  console.log(`  npm run dev`)
  console.log()
}

init().catch((e) => {
  console.error(e)
})