import { downloadTemplate } from 'giget';
import fs from 'fs-extra';

export async function example(project, context) {
      console.log(`\nNow cloning ${project} example... $\n`)
      await copyExample(project, context);
}

export function getExampleTarget(project) {
    const pathToExamples = 'TBD54566975/developer.tbd.website/examples/tutorials/';
    return `github:${pathToExamples}${project}`;
}

export default async function copyExample(project, context) {
    const exampleTarget = getExampleTarget(project);
    //Copy
    try {
        const response = await downloadTemplate(exampleTarget, {
            force: true,
            provider: 'github',
            cwd: context.cwd,
            dir: context.targetDir,
        });
        console.log('Example downloaded!');
    } catch (err) {
        console.error(`Failed to clone ${exampleTarget}`, err);

        // Only remove the directory if it's most likely created by us.
        if (context.cwd !== '.' && context.cwd !== './' && !context.cwd.startsWith('../')) {
            try {
                fs.rmdirSync(context.cwd);
                process.exit(1);
            } catch (_) {
                // Ignore any errors from removing the directory,
                // make sure we throw and display the original error.
                process.exit(1);
            }
        }

        if (err.message.includes('404')) {
            throw new Error(`Example ${project} does not exist!`);
        } else {
            throw new Error(err.message);
        }
    }

    // `giget` doesn't throw error if the example route is invalide. So we check if the directory is empty.
    if (fs.readdirSync(context.cwd).length === 0) {
        throw new Error(`Example ${project} is empty!`);
    }
}
