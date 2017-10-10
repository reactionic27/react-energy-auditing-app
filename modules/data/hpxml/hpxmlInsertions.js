import _ from 'lodash'
import type {
  rootStateType,
  validHPXMLStageType
} from '../flowtypes/flowtypes'
import isTruthyFalseOrZero from '../../util/isTruthyFalseOrZero'
import {VERSION} from 'data/constants'
import xml2js from 'xml2js'
const xmlBuilder = new xml2js.Builder()

import stageInsertions from './stageInsertions'
import cazInsertions from './cazInsertions'
import commentInsertions from './commentInsertions'
import {convertXPathToJsPath} from './hpxmlUtils'
import type {hesTransactionTypeTypes} from '../flowtypes/flowtypes'

const DEFAULT_INSERTIONS = [
  {xpath: 'SoftwareInfo/SoftwareProgramUsed', value: 'Snugg Pro'},
  {xpath: 'SoftwareInfo/SoftwareProgramVersion', value: VERSION}
]
const HES_REDACTIONS = [
  {xpath: 'Customer/CustomerDetails/Person/Name/LastName', value: 'redacted'},
  {xpath: 'Customer/CustomerDetails/Person/Name/FirstName', value: 'redacted'},
]

type hpxmlOptionsType = {
  hpxml: string,
  source: 'download' | 'hes',
  stage1: validHPXMLStageType,
  stage2: validHPXMLStageType,
  job_id: number,
  transaction_type: hesTransactionTypeTypes,
  state: rootStateType,
};

// == HPXML Insertions =========================================================
// Strategy: Insert or replace nodes in original XML file
// 1. Convert XML to JS file (use xml2js, Immutable doesn't preserve XML order)
// 2. Insert nodes using Lodash _.set(xmlObj, 'a[0].b.c', node)
// 3. Convert back to XML
export default async function hpxmlInsertions(options: hpxmlOptionsType) {
  let parsedXMLJS = await new Promise((resolver, rejecter) => {
    xml2js.parseString(options.hpxml, (err, result) => {
      err ? rejecter(err) : resolver(result)
    })
  })
  let newXMLJS = _.cloneDeep(parsedXMLJS)

  if (process.env.NODE_ENV === 'development') {
    try {
      parsedXMLJS = require('deep-freeze')(parsedXMLJS)
    } catch (e) {
      parsedXMLJS = Object.freeze(parsedXMLJS)
    }
  }

  let insertions = stageInsertions(options)

  if (options.source === 'download') {
    insertions = insertions
      .concat(DEFAULT_INSERTIONS)
      .concat(cazInsertions(parsedXMLJS, options))
  } else {
    insertions = insertions.concat(HES_REDACTIONS)
  }

  insertions = insertions.filter(element => isTruthyFalseOrZero(element.value))

  if (process.env.NODE_ENV === 'development') {
    const faultyNodes = insertions.filter(el => !el.value || !el.xpath)
    if (faultyNodes.size > 0) {
      throw new Error('faulty insertion nodes')
    }
  }

  newXMLJS = insertions
    .map(element => convertXPathToJsPath(element))
    .reduce((acc, element) => _.set(acc, element.jspath, element.value), newXMLJS)

  if (options.modelAsMentor) {
    [0, 1].forEach(function(index) {
      const hesMentorElement = convertXPathToJsPath({xpath: `Building[${index}]/ProjectStatus/extension/HEScoreMentorAssessment`, value: ''})
      newXMLJS = _.set(newXMLJS, hesMentorElement.jspath, hesMentorElement.value)
    })
  }

  const newXML = xmlBuilder.buildObject(newXMLJS)

  if (options.source === 'download') {
    return {hpxml: commentInsertions(newXML)}
  }

  return {hpxml: newXML}
}
