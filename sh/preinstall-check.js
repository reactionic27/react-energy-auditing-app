var child_process = require('child_process')
var semver = process.versions.node.split('.').map(v => parseInt(v, 10))

if (semver[0] !== 6) {
  console.log(`
    Snugg App expects node version 6.x, saw ${process.versions.node}.
    Please run:

    $ nvm i 6.1
    $ nvm alias default 6
  `)
  process.exit(1)
}

const npmVersion = String(child_process.execSync(`npm -v`))

const npmV = npmVersion.split('.').map(v => parseInt(v, 10))

if (npmV[0] !== 3) {
  console.error(`
    Snugg App expects npm version 3, saw ${npmVersion}.
  `)
  process.exit(1)
}

process.exit(0)
