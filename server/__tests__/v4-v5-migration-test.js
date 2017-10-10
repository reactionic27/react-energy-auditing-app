/* eslint-env mocha */
import {buildMigrationInsertData} from '../scripts/v4-to-v5-migration'

describe('v4-v5 migration test', () => {

  it.skip('41908 - should migrate base age & heat', async () => {

    const {
      rows: rowDataFromDb,
      uuidRows: uuidDataFromDb
    } = require('./assets/41908-test')

    try {
      const {inserts, hvacNotes} = buildMigrationInsertData(
        {job_id: 41908, has_calculated: true},
        rowDataFromDb,
        uuidDataFromDb,
        {},
        {}
      )
    } catch (e) {
      debugger
    }

  })

  it.skip('41907 - should migrate missing duct values', async () => {

    const {
      rows: rowDataFromDb,
      uuidRows: uuidDataFromDb
    } = require('./assets/41907-test')

    try {
      const {inserts, hvacNotes} = buildMigrationInsertData(
        {job_id: 41907, has_calculated: true},
        rowDataFromDb,
        uuidDataFromDb,
        {},
        {}
      )
      debugger
    } catch (e) {
      debugger
    }
  })


  it.skip('bug #504, job #41853 pairing orphaned heat pumps', async () => {

    const {
      rows: rowDataFromDb,
      uuidRows: uuidDataFromDb
    } = require('./assets/bug-504-41853-test')

    try {
      const {inserts, hvacNotes} = buildMigrationInsertData(
        {job_id: 41907, has_calculated: true},
        rowDataFromDb,
        uuidDataFromDb,
        {},
        {}
      )
      debugger
    } catch (e) {
      debugger
    }
  })

})
