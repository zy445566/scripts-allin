#!/usr/bin/env node
const { exec } = require('child_process');
const commander = require('commander');
const program = new commander.Command();

function run(commandList) {
    const childList = []
    for(const command of commandList) {
        const child = exec(command);
        child.ref()
        childList.push(child)
        child.stdout.pipe(process.stdout)
        child.stderr.pipe(process.stderr)
    }
    function closeChildHandle(signal) {
        for(const child of childList) {
            if(!child.killed) {
                child.kill(signal)
            }
        }
    }
    process.on('SIGINT', closeChildHandle);
    process.on('SIGTERM', closeChildHandle);
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