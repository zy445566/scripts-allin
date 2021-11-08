#!/usr/bin/env node
const { exec } = require('child_process');
const commander = require('commander');
const program = new commander.Command();

function run(commandList) {
    for(const command of commandList) {
        const child = exec(command);
        child.stdout.pipe(process.stdout)
        child.stderr.pipe(process.stderr)
    }
   
}
program.option('-s, --npm-script [script...]', 'npm script name of package.json');
program.parse();
const opts = program.opts()
if(opts.npmScript) {
    if(!(opts.npmScript instanceof Array)) {return program.help()}
    const commandList = opts.npmScript.map(script=>`npm run ${script}`);
    run(commandList)
} else {
    program.help()
}