# concurrently-dir

Concurrently runs command in every matching directory

# Installation
```
npm install -g @hitorisensei/concurrently-dir
```

# Usage
```
concurrently-dir --glob 'packages/*' --command 'npm run build:watch'
```

```
concurrently-dir [args]

Options:
  --version          Show version number                               [boolean]
  --help             Show help                                         [boolean]
  --glob             glob of directories to match            [string] [required]
  --command          command to execute in each matching directory
                                                             [string] [required]
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
