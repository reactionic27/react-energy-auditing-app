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

mkdir -p .build/node_modules .build/server/__tests__/assets
ln -nsf ../modules/data .build/node_modules/data
ln -nsf ../modules/util .build/node_modules/util
ln -nsf ../email-templates .build/email-templates
ln -nsf ../views .build/views
ln -nsf ../src .build/src
ln -nsf ../knexfile.js .build/knexfile.js
ln -nsf ../../../../server/__tests__/assets/test_db_base.sql .build/server/__tests__/assets/test_db_base.sql
ln -nsf ../../../../server/__tests__/assets/test_duplicator.sql .build/server/__tests__/assets/test_duplicator.sql
ln -nsf ../../server/amazon-rds-ca-cert.pem .build/server/amazon-rds-ca-cert.pem
ln -nsf ../stats.json .build/stats.json
