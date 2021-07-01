# concurrently-dir

Concurrently runs command in every matching directory

# Installation
```
npm install -g @hitorisensei/concurrently-dir
```

# Usage
```
concurrently-dir 'packages/*' 'npm run build:watch'
```

```
concurrently-dir <glob> <command> [args]

Positionals:
  glob     glob of directories to match                                 [string]
  command  command to execute in each matching directory                [string]

Options:
  --version          Show version number                               [boolean]
  --help             Show help                                         [boolean]
  --retries          number of retries when command fails before aborting (-1 is
                     infinite)                            [string] [default: -1]
  --checkNpmCommand  If command is an npm script, should check if directory
                     contains package.json with specified command before trying
                     to run it.                        [boolean] [default: true]
  --cwd              base directory for globs
                   [boolean] [default: "/home/hitori/Projekty/concurrently-dir"]
  --npmPrefix        command prefix used for checkNpmCommand
                                                   [string] [default: "npm run"]
  --dry              just list commands that would execute and quit
                                                      [boolean] [default: false]
```
