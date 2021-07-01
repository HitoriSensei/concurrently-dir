#!/usr/bin/env node
'use strict'
const concurrently = require('concurrently')
const globby = require('globby')
const path = require('path')
const yargs = require('yargs')

let {glob, command, retries, checkNpmCommand, cwd, npmPrefix, dry} = yargs(process.argv.slice(2))
    .usage('$0 [args]')
    .help()
    .options({
        glob: {
            demandOption: true,
            type: 'string',
            describe:
                "glob of directories to match",
        },
        command: {
            demandOption: true,
            type: 'string',
            describe: "command to execute in each matching directory",
        },
        retries: {
            demandOption: false,
            type: 'string',
            default: -1,
            describe: "number of retries when command fails before aborting (-1 is infinite)",
        },
        checkNpmCommand: {
            demandOption: false,
            type: 'boolean',
            default: true,
            describe: "If command is an npm script, should check if directory contains package.json with specified command before trying to run it.",
        },
        cwd: {
            demandOption: false,
            type: 'boolean',
            default: process.cwd(),
            describe: 'base directory for globs'
        },
        npmPrefix: {
            demandOption: false,
            type: 'string',
            default: 'npm run',
            describe: 'command prefix used for checkNpmCommand'
        },
        dry: {
            demandOption: false,
            type: 'boolean',
            default: false,
            describe: 'just list commands that would execute and quit'
        },

    }).argv;

async function main() {
    checkNpmCommand = checkNpmCommand && command.startsWith(npmPrefix)

    const packages = await globby(glob, {
        onlyDirectories: true,
        cwd: cwd
    })

    const buildWatchPackages = packages.filter(packageDir => {
        if (checkNpmCommand) {
            const scriptName = command.replace(npmPrefix, '').trim()
            try {
                const packageJson = require(path.resolve(cwd, packageDir, 'package.json'))
                return !!packageJson.scripts[scriptName]
            } catch (e) {
                if (e.errno !== -2) {
                    console.error(e)
                }
                return false
            }
        } else {
            return true
        }
    })

    if (!packages.length) {
        console.warn('Could not find any matching directory')
        return process.exit(1)
    }

    const commands = buildWatchPackages.map(packageCwd => ({
        command: command,
        name: `${packageCwd}`,
        cwd: path.resolve(cwd, packageCwd)
    }))

    if(dry) {
        for(const concommand of commands) {
            console.log(`${concommand.command}\t${concommand.cwd}`)
        }
        return process.exit(0)
    }

    await concurrently(
        commands,
        {
            prefix: 'name',
            killOthers: ['failure', 'success'],
            restartTries: retries,
        }
    )
}

main()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
