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

printf 'server build prep…'
./sh/make-symlinks.sh
echo ✓

export BABEL_ENV=server_production

printf 'server build babel modules…'
$(npm bin)/babel --quiet --out-dir .build/constants constants
$(npm bin)/babel --quiet --out-dir .build/modules/data modules/data
$(npm bin)/babel --quiet --out-dir .build/modules/util modules/util
echo ✓

# pass --watch as command line argument if desired for local dev
printf 'server build babel server…'
$(npm bin)/babel --quiet --out-dir .build/server server
echo ✓

printf 'generate build meta'
$() node .build/server/scripts/generate-build-meta.js
echo ✓
