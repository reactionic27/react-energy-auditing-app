import {getJobData, processJobs} from './update-touched-fields'
export async function readTouchFields() : void {
  const jobs = await getJobData()
  if (jobs.length > 0) {
    await processJobs(jobs, 'read')
  } else {
    console.log("No data found")
  }
}
readTouchFields()
