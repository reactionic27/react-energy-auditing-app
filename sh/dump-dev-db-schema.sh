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

source .env
eval $(./sh/url-to-vars.js "${RDS_URL}")

dump_with_creds="mysqldump --user=$USER --host=$HOST --password=$PASSWORD"

##### First get just the schema
schema_command="${dump_with_creds} --no-data $DATABASE"
# This assumes docker. If you have mysqldump available locally,
# feel free to run directly

docker exec --interactive --tty mysql bash -c \
  "${schema_command}" \
  | grep -v 'mysqldump: \[Warning\]' \
  > server/src/init/snugg_v4_test.sql

##### Then get the static data needed
data_command=$(cat <<EOF | xargs
${dump_with_creds}
${DATABASE}
v4_rec_definitions
v4_collection_definitions
v4_fields
v4_tech_spec_definitions
v4_options
v4_optiongroups
v4_jobform_sections
EOF
)
docker exec --interactive --tty mysql bash -c \
  "${data_command} " \
  | grep -v 'mysqldump: \[Warning\]' \
  >> server/src/init/snugg_v4_test.sql
