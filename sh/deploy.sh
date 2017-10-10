#!/bin/bash

VALID_APP=0
VALID_REV=0
VALID_LOCATION=0

while [ $VALID_APP -ne 1 ]; do
  read -p "Which app do you wish to deploy [ main, kue ]:" app
  if [ $app = "kue" ] || [ $app = "main" ];
    then VALID_APP=1
  fi
done

while [ $VALID_REV -ne 1 ]; do
  read -p "Which branch (or revision) do you wish to deploy:" branch
  cmd="git rev-parse --verify $branch"
  $cmd >/dev/null 2>/dev/null
  if (( $? == 0 )); then
      VALID_REV=1
  else
      echo "Invalid branch or revision $branch"
  fi
done

while [ $VALID_LOCATION -ne 1 ]; do
  read -p "Where do you wish to deploy (staging, production):" location
  if [ $location = "prod" ]; then
    location="production"
  fi
  if [ $location = "staging" ] || [ $location = "production" ];  then
    VALID_LOCATION=1
  fi
done

echo "Deploying app:$app, branch:$branch to $location, ctrl+c to cancel..."

repo=""

if [ $app = "kue" ]; then
  if [ $location = "production" ]; then
    repo="git@heroku.com:snugg-kue.git"
  else
    repo="git@heroku.com:snugg-dev-kue.git"
  fi
else # $app = "main"
  if [ $location = "production" ]; then
    repo="git@heroku.com:snuggpro5-production.git"
  elif [ $location = "staging" ]; then
    repo="git@heroku.com:snuggpro5-staging.git"
  fi
fi

git push "$repo" "$branch:master" --force
