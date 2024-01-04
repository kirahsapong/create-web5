#!/usr/bin/env node
import path from 'path';
import fs from 'fs-extra';
import minimist from 'minimist';
import { fileURLToPath } from 'url';
import { createRequire } from 'node:module';


const argv = minimist(process.argv.slice(2));
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const require = createRequire(import.meta.url);

async function init() {
  const targetDir = argv._[0] || '.' // last arg ie. npx create web5/@latest my-app
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
    `template-${argv.t || argv.template || 'vanilla'}` // -t or --template=example-template
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
    } else if (file === 'web5-utils.js' && (argv.s || argv.sync || argv.e || argv.endpoint)) {
      if (argv.s && argv.sync) {
        console.error(`Error: illegal options: specify either -s or --sync, not both.`)
        process.exit(1)
      }
      if (argv.e && argv.endpoint) {
        console.error(`Error: illegal options: specify either -e or --endpoint, not both.`)
        process.exit(1)
      }
      fs.readFile(path.join(templateDir, `web5-utils.js`), 'utf8', async function (err, data) {
        if (err) {
          return console.log(err);
        }
        const sync = (argv.s || argv.sync) ? `sync: '${argv.s || argv.sync}'` : undefined // -s or --sync=2m
        const dwnEndpoints = (argv.e || argv.endpoint) ? `dwnEndpoints: ['${argv.e?.join(', ') || argv.endpoint}']` : undefined // -e for each endpoint or --endpoint=test.com
        const concat = sync && dwnEndpoints ? sync + ', ' + dwnEndpoints : undefined
        const result = data.replace(/Web5.connect\(\)/g, `Web5.connect({ ${concat ?? sync ?? dwnEndpoints } })`);
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
  console.log(`npm install`)
  console.log(`npm run serve`)
  console.log()
}

init().catch((e) => {
  console.error(e)
})