var child_process = require('child_process')

process.env.APP_COOKIE = process.env.APP_COOKIE || 'snuggtoken';
process.env.FLASH_COOKIE = process.env.FLASH_COOKIE || 'snuggflash';

if (process.env.KUE_APP) {
  require('./src/om')
} else {
  var time = process.hrtime();
  child_process.execSync('knex migrate:latest', { stdio: 'inherit' })
  console.log(process.hrtime(time));
  require('./src')
}
