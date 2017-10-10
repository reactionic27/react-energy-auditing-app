import {
  isDate, isString, transform, toUpper
} from 'lodash'
import moment from 'moment'
import type {omContextType, jobType} from './optimiser-types'
import {returnContext} from './optimiser-helpers'

import optimiserConstantsCA from './optimiserConstantsCA'
import optimiserConstantsNY from './optimiserConstantsNY'
import optimiserConstantsWI from './optimiserConstantsWI'

export default function optimiserJob(context: omContextType, job: jobType) {
  let errors = []
  const serviceTime = isDate(job.service_time)
  let additionalConstants = {}
  switch (toUpper(job.state)) {
    case 'NY': additionalConstants = optimiserConstantsNY; break;
    case 'CA': additionalConstants = optimiserConstantsCA; break;
    case 'WI': additionalConstants = optimiserConstantsWI; break;
  }

  if (!/^\d{5}$/.test(job.zip)) {
    errors.push({field: 'Job Zip', message: 'Zip Code must be 5 digits'})
  }

  const values = transform({
    ProjectID: job.id,
    FirstName: job.first_name,
    LastName: job.last_name,
    HomePhone: job.home_phone,
    Street: job.address_1,
    ProjectStreet: job.address_1,
    AptNumber: job.address_2,
    ProjectAptNumber: job.address_2,
    City: job.city,
    State: job.state,
    A1ProjectZip: job.zip,
    Date: serviceTime ? moment.utc(job.service_time).format('MM-DD-YYYY') : null,
    QAContractStartDate: serviceTime ? moment.utc(job.service_time).format('MM-DD-YYYY') : null,
    QAContractEndDate: serviceTime ? moment.utc(job.service_time).format('MM-DD-YYYY') : null,
    ...additionalConstants
  }, (acc, val, key) => {
    acc[key] = isString(val) ? val.trim() : val
  })

  if (!job.first_name) {
    errors.push({
      field: 'Job First name',
      id: job.id,
      message: `First name is required for modeling. Please note that it cannot be changed after modeling`
    })
  }

  if (!job.last_name) {
    errors.push({
      field: 'Job Last name',
      id: job.id,
      message: `Last name is required for modeling. Please note that it cannot be changed after modeling`
    })
  }

  return returnContext('jobs', context, {
    values,
    errors
  })
}
