import {
  TEST_COMPANY_ID,
  TEST_JOB_ID,
  TEST_FINANCING_ID,
  TEST_JOB_FINANCING_UUID,
} from '../__mocks__/mocks'

require('../entry/styles')
require('../app')
// import jest from 'jest'

import {testRoute, setNode} from '../__mocks__/route-test-helper'

// Set to true to see all of the pages render during tests.
const RENDER_DISPLAY = false

/* eslint-env mocha */
describe('routes', function() {

  //this.timeout(0)
  before(() => {
    var containerNode = document.createElement('div')
    containerNode.id = 'primary-container'

    if (RENDER_DISPLAY) {
      document.body.appendChild(containerNode)
    } else {
      setNode(containerNode)
    }
  })

  testRoute(`/joblist/${TEST_COMPANY_ID}`)

  testRoute(`/joblist/${TEST_COMPANY_ID}/stage/1`)

  testRoute(`/job/${TEST_JOB_ID}`, [
    'Warning: a `ul` tag (owner:',
    'Warning: a `button` tag (owner:'
  ])

  testRoute(`/job/${TEST_JOB_ID}/recommendations`, [
    'Invalid prop `val` supplied to `SnuggValue`',
    'Required prop `recType` was not specified in `CalculatedWrapper`'
  ])

  testRoute(`/job/${TEST_JOB_ID}/financing`, [
    'Required prop `val` was not specified in `SnuggValue`'
  ])

  testRoute(`/job/${TEST_JOB_ID}/financing/select`)

  testRoute(`/job/${TEST_JOB_ID}/financing/create`)

  testRoute(`/job/${TEST_JOB_ID}/financing/edit/${TEST_JOB_FINANCING_UUID}`)

  testRoute(`/job/${TEST_JOB_ID}/report`, [
    'Required prop `name` was not specified in `ReportSection`'
  ])

  testRoute(`/job/${TEST_JOB_ID}/present`)

  testRoute(`/job/${TEST_JOB_ID}/hvac/create`)

  // testRoute(`/job/${TEST_JOB_ID}/hvac/${TEST_HVAC_UUID}`, [
  //   'A component is `contentEditable` and contains `children` managed by React'
  // ])

  const recommendationTypes = [
    'air_leakage',
    'attic',
    'basement',
    'cooling',
    'crawl',
    'dhw',
    'dhw_temp',
    'doors',
    'duct',
    'floor',
    'freezer',
    'heating',
    'lighting',
    'refrigerators',
    'thermostat',
    'wall',
    'window',
    'vault',
    'pool',
    'dishwasher',
    'clotheswasher',
    // 'pv',
  ]

  recommendationTypes.forEach(type => {
    testRoute(`/job/${TEST_JOB_ID}/quickrefine/${type}`)
  })

  testRoute(`/settings`)

  testRoute(`/settings/password`)

  testRoute(`/settings/companies`)

  testRoute(`/settings/companies/add-new`)

  testRoute(`/settings/company/${TEST_COMPANY_ID}`)

  testRoute(`/settings/company/${TEST_COMPANY_ID}/billing`)

  testRoute(`/settings/company/${TEST_COMPANY_ID}/users`)

  testRoute(`/create-job`)

  testRoute(`/create-job/${TEST_COMPANY_ID}`)

  testRoute(`/create-template`)

  testRoute(`/create-template/${TEST_COMPANY_ID}`)

  testRoute(`/settings/financing`)

  testRoute(`/settings/financing/create`)

  testRoute(`/settings/financing/edit/${TEST_FINANCING_ID}`)

})
