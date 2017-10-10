import Promise from 'bluebird'
import fs from 'fs'
import path from 'path'

Promise.promisifyAll(fs)

import knex from '../src/init/knex-init'
import deleteMigratedV5Job from '../src/snuggadmin/delete-migrated-v5-job'
import v4ToV5Migration from './v4-to-v5-migration'

async function getIds(trx, id) {
  let ids
  if (id) {
    ids = Array.isArray(id) ? id : [id]
    ids = await trx.pluck('id').from('jobs')
      .where((qb) => {
        qb.where('version', 5)
          .whereIn('jobs.id', (qb) => {
            qb.distinct('job_id').from('v4_health')
          })
          .whereIn('jobs.id', ids)
      })
  } else {
    ids = await trx.pluck('id').from('jobs').where('version', 5).whereIn('jobs.id', (qb) => {
      qb.distinct('job_id').from('v4_health')
    })
  }
  return ids
}

async function automateRollback(trx, id) {
  let ids = await getIds(trx, id)
  console.log(`Rolling back ${ids.length} converted jobs`)
  await Promise.map(ids, async (id, i) => {
    console.log(`${i}. Rolling back ${id}`)
    await deleteMigratedV5Job(id, trx)
    console.log(`Done rolling back ${id}`)
  }, {concurrency: 100})
  return ids
}

async function automateMigrate(trx, id) {
  let ids
  if (id) {
    ids = Array.isArray(id) ? id : [id]
    ids = await trx.pluck('id').from('jobs')
      .where('version', 4)
      .whereIn('id', ids)
      .orderBy('id', 'desc')
  } else {
    ids = await trx.pluck('id').from('jobs')
      .where('version', 4)
      // .whereNotIn('id', [6, 1])
      // .where('company_id', '!=', 11)
      .whereNull('deleted_at')
      .orderBy('id', 'desc')
  }
  const time = process.hrtime()
  console.log(time)
  console.log(`Migrating ${ids.length} jobs`)

  let title = 'migrate-error-output'

  const writer = fs.createWriteStream(path.join(__dirname, `${title}.out`))

  await Promise.map(ids, async (id, i) => {
    let errored = false
    try {
      await knex.transaction(trx => v4ToV5Migration(id, trx))
      writer.write(`Completed: ${id}\n`)
    } catch (e) {
      errored = true
      if (e.message === 'ERROR_MIGRATING') {
        writer.write(`${id} ${JSON.stringify(e.errors, null, 2)}\n`)
      } else {
        writer.write(`${id} ${e.message}\n${e.stack}`)
      }
    }
    console.log(`${i}. ${id} complete: ${process.hrtime(time)}${errored ? '(ERROR, check log)' : ''}`)
  }, {concurrency: 100})

  writer.end('\n')
  writer.on('finish', () => {
    resolver()
  });

  let resolver
  return new Promise((resolve, reject) => {
    resolver = resolve
  })
}

Promise.try(async () => {
  await automateRollback(knex)
  await automateMigrate(knex)
})
.then(() => {
  console.log('Complete')
  process.exit()
})
.catch((e) => {
  console.log(e.message)
  process.exit()
})
