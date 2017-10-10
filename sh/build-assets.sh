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

mkdir -p "$(dirname "$0")/../.build/views"

##### WORKING DIR IS NOW the .build directory
cd "$(dirname "$0")/../.build"

printf 'build assets clean…'
[[ -d ./views/dist ]] && rm -r ./views/dist
[[ -d ./dist ]] && rm -r ./dist
echo ✓

mkdir -p ./dist/src

##### WORKING DIR IS NOW the project root
cd ..

printf 'build assets webpack…'
$(npm bin)/babel-node --presets=es2015,stage-0 $(npm bin)/webpack --hide-modules --no-color
echo ✓

cp -r ./views/dev ./.build/views
cp -r ./views/dev ./.build/views/dist

printf 'build assets uglify…'
# Handle the UGLIFY since this isn't dealt with using Webpack
cp ./src/js/uploadcare.js ./.build/dist/src/uploadcare.js
cp ./src/js/raven.js ./.build/dist/src/raven.js

$(npm bin)/uglifyjs ./.build/dist/src/uploadcare.js -m -o ./.build/dist/src/uploadcare.min.js --source-map ./.build/dist/src/uploadcare.min.js.map --source-map-url ./uploadcare.min.js.map
$(npm bin)/uglifyjs ./.build/dist/src/raven.js -m -o ./.build/dist/src/raven.min.js --source-map ./.build/dist/src/raven.min.js.map --source-map-url ./raven.min.js.map
echo ✓

##### WORKING DIR IS NOW the .build directory
cd .build

checksum() {
  # get just the checksum hex value without filename
  shasum "$1" | cut -d " " -f 1
}

printf 'build assets checksum…'
RAVEN=$(checksum ./dist/src/raven.min.js)
UPLOADCARE=$(checksum ./dist/src/uploadcare.min.js)
echo ✓

printf 'moving / gzipping files…'
mv ./dist/src/raven.min.js       ./dist/src/raven-$RAVEN.js
mv ./dist/src/uploadcare.min.js  ./dist/src/uc-$UPLOADCARE.js

gzip -k ./dist/src/raven-$RAVEN.js \
  ./dist/src/uc-$UPLOADCARE.js \

perl -pi -e "s/raven\.js/raven-$RAVEN.js/g" $(find ./views/dist -name '*.html')
perl -pi -e "s/uploadcare\.js/uc-$UPLOADCARE.js/g" $(find ./views/dist -name '*.html')
echo ✓
