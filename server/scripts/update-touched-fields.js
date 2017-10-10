import knex from '../src/init/knex-init'
const parseArgs = require('minimist')(process.argv.slice(2))

async function updateTouchedFields() : void {
  console.log("Script Started Executing. Wait it will take time to finish")
  const startTime = new Date()
  console.log("Script Start Time", startTime)
  const jobs = await getJobData()
  if (jobs.length > 0) {
    await processJobs(jobs, 'update')
  } else {
    console.log("No data found")
  }
  const endTime = new Date();
  console.log("Script End Time", endTime)
  console.log("Time Taken in minutes", (endTime.getTime() - startTime.getTime()) / 60000)
  console.log("Time Taken in seconds", (endTime.getTime() - startTime.getTime()) / 1000)
}


export function getJobData() : Object {
  let query = knex
    .select('id')
    .from('jobs')
    .whereNot('is_template', 1)
    .andWhere('has_calculated', 1)
  if (parseArgs.jobId) {
    query.where('id', parseArgs.jobId)
  }
  return query
}

function getV5BaseData(jobId : number) : Object {
  return knex
    .select('touched_fields')
    .from('v5_basedata')
    .where('job_id', jobId)
}

async function updateV5BaseData(jobId : number, touchFields : string) : void {
  await knex('v5_basedata')
    .update('touched_fields', touchFields)
    .where({job_id: jobId})
}

export async function processJobs(jobs : Array,  action : string) : void {
  let dataProcessed = 0;
  for (let values of jobs) {
    dataProcessed++;
    const v5Data = await getV5BaseData(values.id)
    if (v5Data.length > 0) {
      let touchFields = {};
      if (v5Data[0].touched_fields) {
        touchFields = JSON.parse(v5Data[0].touched_fields)
      }
      touchFields.utility_price_natural_gas = true;
      touchFields.utility_price_propane = true;
      touchFields.utility_price_fuel_oil = true;
      touchFields.utility_price_electricity = true;
      if (action === 'update')
        await updateV5BaseData(values.id, JSON.stringify(touchFields))
      else
        console.log({job_id:values.id, touched_fields:JSON.stringify(touchFields)})
    } else {
      console.log('No record found in v5_basedata table for jobId ' + values.id)
    }
    if (dataProcessed === jobs.length) {
      console.log("touch_fields " + action + " script completed in v5_basedata table")
      knex.destroy()
    }
  }
}

if (process.env.IS_UPDATE) {
  updateTouchedFields()
}
