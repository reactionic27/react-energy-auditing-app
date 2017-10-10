import expect from 'expect'
import optimiserJob from '../data/optimiser/optimiserJob'
import {mockPayload} from '../__mocks__/mocks'

const trimJob = require('./optimiser-job-trim.json')

/* eslint-env mocha */
describe('optimiser test', () => {

  it('should trim values when sending ', () => {
    expect(optimiserJob({
      payload: {
        ...mockPayload,
        jobs: trimJob
      },
      values: {},
      returning: [],
      returningInto: {},
      errors: [],
      sections: {}
    }, trimJob).values).toEqual({
      City: 'Colorado',
      FirstName: 'Ben',
      LastName: 'Tester',
      ProjectID: '1'
    })
  })

})
