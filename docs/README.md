# SnuggPro: Redux Edition

## New Developer Setup

- clone this git repo if you haven't already
- install [node version manager](https://github.com/creationix/nvm) (`brew install nvm` recommended on OSX)
- cd into the project directory
- `nvm install` (gets you the right node/npm version)
- `npm install` (gets you the npm deps)
- `cp .env.development.tmpl .env`
  - Review `.env` and make any edits you may need for your local setup
  - Normally development is done against a shared dev dataset in the cloud so only the node app server runs locally. However, you can point the app server to local MySQL and Redis if you prefer.

## How to View the Developer Documentation
- just read the markdown files in the `docs` directory and get on with it
- **OR**
- `npm run docs` to view the gitbook documentation as needed
    - gitbook docs should be available at [http://localhost:4000]()

## How to Do Normal App Development

below are out of date:

### 1. Start the App Server

- `npm start` to start the server
  - The app should now be available at [http://localhost:3000]()

**Or**

- `npm run dev` to automatically restart if you edit server source code (which will be transpiled by babel --watch and written to `.build`, which `node-dev` will watch and detect and restart the server

### 2. Get Babel Transpiling

- `npm run build-server-dev` for JS transforms & webpack
  - you must always leave this running and make sure it's working after git pull, git checkout, etc in order for the server code to work properly, as well as the server unit tests
- transpiled ES5 code goes into the `.build` directory tree, and from there we run things, watch for changes, etc

### 3. Start the Kue Server (only needed if you are going to model)

- `npm run kue` to start the kue server
  - The kue UI should now be available at [http://localhost:5000]()

### 4. Start the docs

- `npm run docs` to start the documentation server


## How to Debug the Server With node-inspector  (Currently doesn't work)

- make sure `npm run build-server` is working and succeeding in a terminal window
- run `npm run inspector`
- open [http://localhost:8080]() to debug
- **WAIT** a long time (30-60s) for the debugger to load all files. There is no progress indicator, but it takes a while.

## How to Debug the Server With iron-node (Currently doesn't work)

- make sure `npm run build-server` is working and succeeding in a terminal window
- run via `npm run iron`


## Running the Client Tests:
- `npm run karma`

- Any file ending in `-test.js` will be run.
- Karma is a runner, it runs the tests in a browser. Mocha adds the beforeEach / afterEach / it stuff
- See financing-test.js for how to import formatters
- In order to access the functions, you need to export the function in `test` env:
```
if (process.env.NODE_ENV === 'test') {
    exports.calculateMonthlyPayments = calculateMonthlyPayments
}
```

## Running the Server & DB Tests: Initial Setup

- Make sure redis and mysql are installed (`brew install redis`, `brew install mysql`). For redis, follow instructions on setting it up and running.
- Make sure a local database is set up in Sequel Pro. It has to be called `snugg_v4_test`.
- `cp .env.test.tmpl .env.test`
- Review `.env.test` and make any edits you may need for your local setup
  - Normally tests run against a local non-shared test dataset in mysql and redis.
  - If the database username is root and there is no password, `.env.test` would look like this:
```
#REDISCLOUD_URL=
MAILGUN_SENDER='Snugg Development <noreply@snugg.mailgun.org>'
NODE_ENV='test'
NODE_HOST='localhost'
RDS_URL='mysql://root:@localhost/snugg_v4_test?reconnect=true'
REDISCLOUD_URL='redis://localhost'
STRIPE_SECRET_KEY='sk_bogus_stripe_unit_test_secret_key'
```
- proceed to the normal test run instructions

## How To Run the Server & DB Tests

- Complete the "Running the Tests: Initial Setup" instructions above one time
- make sure `npm run build-server` is working and succeeding in a terminal window
- `./sh/lab.sh` to run all the tests (`npm test` or `npm t` do the same if you prefer)
- To run just a single or subset of the tests, pass them as command line arguments to the script
  - `./sh/lab.sh .build/server/src/api/create-financing-product.lab.js`

## How to Debug the Server & DB Tests
- make sure `npm run build-server` is working and succeeding in a terminal window
- run `./sh/lab-debug-brk.sh` (`npm run debug-test` does the same)
  - no arguments runs all the tests
  - or pass specific test file(s) as command line arguments
- this will launch node with the debugger listening on port **5859** (NOT the default of 5858 to avoid conflicts with the server)
- open [http://localhost:8080/?port=5859]() in a browser
- **wait** a long time (30s) for the debugger to load the code. It is slow and there is no progress indicator.
- **wait** a long time for the test initialization code to run. It takes a long time and there is no progress indicator.

## How to run the option and option group editor UI
We have a lot of option and option groups that would be hard to add and modify in the db. Tim wrote a UI and scripts to make sure the relationship integrity is intact:
These may not work yet in the new branch (if not try it in master)
```
http://localhost:3000/admin/fields
http://localhost:3000/admin/option-groups
```

## Coding Guidelines

- ES 2016 (AKA ES7), ES2015 (AKA ES6, AKA "Harmony"), ES5 used heavily
  - async/await OK for async flow control
- style checked by eslint
  - `npm run lint-browser` to check browser code
  - `npm run lint-server` to check server code

## How Configuration Works

We use [dotenv](https://www.npmjs.com/package/dotenv) to make sure required environment variables are set.

- For local development, dotenv is loaded by `server/src/index.js`
- During tests, the `knexfile.js` looks if `NODE_ENV` is "test" and if so, loads the `.env.test` settings instead
- During asset building, we load settings via `sh/build-constants.js` and in out `webpack.config.js`
- dotenv won't overwrite env vars that are already set, it will only set them if they are currently undefined
- For development, you need a valid `.env` file with the appropriate settings for local/cloud development
- For running the tests, you need a valid `.env.test` with the appropriate settings for a local test mysql, etc
- For stage and production, only the `.env` file is necessary, but most things are directly set as environment variables via the heroku app configuration

## How to Deploy to Heroku for staging (snugg-next-dev2)

- **Initial Setup** (not needed every time once configured)
  - `git remote add heroku	https://git.heroku.com/snugg-next-dev2.git`
- make sure the code you want to deploy is ready and has been committed to git and you know the local branch name
- run `./sh/deploy-staging.sh`
- this will ask you the local branch name to deploy
- watch the output for any errors, but if all goes well, the deploy should be available at [http://snuggdev2.snuggpro.com/]()

## How to Deploy to Heroku for PRODUCTION

- **Initial Setup** (not needed every time once configured)
  - `git remote add production	https://git.heroku.com/snuggpro4-production.git`
- make sure the code you want to deploy is ready and has been committed to git and you know the local branch name
- run `./sh/deploy-production.sh`
- this will ask you the local branch name to deploy
- watch the output for any errors, but if all goes well, the deploy should be available at [https://snuggpro.com]()

#### TODO

* Base vs Improved values: Explain outputBaseValue, outputImprovedValue, output vs. outputCollections
* asset pipelining, cache invalidation
