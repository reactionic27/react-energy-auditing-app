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

# Ensure at least an empty .env file exists for dotenv
touch .env

if [[ ${HEROKU} -ne 1 ]]; then
  ./sh/make-symlinks.sh
  echo 'Local app detected (HEROKU=0), skipping heroku build.'
  echo 'run "npm run build-server-dev" and "npm start" to start app'
  exit
fi

if [[ ${KUE_APP} -ne 1 ]]; then
  ./sh/build-assets.sh
fi

./sh/build-server.sh
