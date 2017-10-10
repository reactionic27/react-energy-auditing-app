#!/bin/bash

# Start unofficial bash strict mode boilerplate
# http://redsymbol.net/articles/unofficial-bash-strict-mode/
set -o errexit    # always exit on error
set -o errtrace   # trap errors in functions as well
set -o pipefail   # don't ignore exit codes when piping output
set -o posix      # more strict failures in subshells
# set -x          # enable debugging

IFS="$(printf "\n\t")"
# End unofficial bash strict mode boilerplate

cd "$(dirname "$0")/.."

printf 'babelrc cleanup…'
$(npm bin)/babel-node --presets=es2015 ./sh/rm-babelrc.js
echo ✓

printf 'server build clean…'
rm -rf ./.build
echo ✓

printf 'server build prep…'
./sh/make-symlinks.sh
echo ✓

export BABEL_ENV=server_development
echo 'server build dev, webpack, watch'
$(npm bin)/npm-run-all -p build:data build:util build:server build:constants webpack
