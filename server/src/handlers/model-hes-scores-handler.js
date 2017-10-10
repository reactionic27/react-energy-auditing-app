// All HES-related information is in the wiki:
// HES Score API:
// https://github.com/SnuggHome/4SnuggPro/wiki/HEScore-Guidelines-&-Technical-Docs
import Boom from 'boom'
import knex from '../../src/init/knex-init'
import syncSoap from 'soap'
import Promise from 'bluebird'
import bole from 'bole'
import _ from 'lodash'
import xml2js from 'xml2js'
const log = bole(__filename)
const soap = Promise.promisifyAll(syncSoap)
const {NODE_ENV} = process.env

const wsdl = NODE_ENV === 'production'
  ? 'https://hesapi.labworks.org/st_api/wsdl'
  : 'https://sandbeta.hesapi.labworks.org/st_api/wsdl'

const wsdlOptions = {
  "overrideRootElement": {
    "xmlnsAttributes": [{
      "name": "xmlns",
      "value": "http://hesapi.labworks.org/st_api/serve"
    }]
  }
}

// Snugg's doe_assessor_id is TST-Snugg
export default async function modelHesScoresHandler(req: Object, res: Object) {
  const {body} = req

  log.debug({...body, hpxml: '<...>', wsdl: wsdl}, 'calculateHesScores starting')

  const {
    job_id,
    hpxml,
    doe_assessor_id: hes_qualified_assessor_id,
    stage1: hes_hpxml_event_type_1,
    stage2: hes_hpxml_event_type_2,
    transaction_type: hes_xml_transaction_type,
    hpxml_building_node: hes_hpxml_building_node
  } = body


  // Step 0: Create the SOAP client
  const client = Promise.promisifyAll(await soap.createClientAsync(wsdl, wsdlOptions))


  console.log('== Modeling HES ================================================')
  // == Step 1: submit_hpxml_inputs() ==========================================
  // Submit the HPXML file
  const inputsResults = await client.submit_hpxml_inputsAsync(
    await hpxmlInputOpts(hpxml, hes_qualified_assessor_id, hes_hpxml_building_node)
  )
  if (inputsResults.submit_hpxml_inputs_result.result !== 'OK') {
    throw Boom.badRequest(`Error: 1. submit_hpxml_inputs (Job ${job_id}): ${inputsResults.submit_hpxml_inputs_result.message}`)
  }
  const hes_building_id = inputsResults.submit_hpxml_inputs_result.building_id
  console.log(`1. inputsResults success (Job ${job_id}): `, JSON.stringify(inputsResults, null, 2))


  // == Step 2: validate_inputs() ==============================================
  // Step 2: calculate_base_building(): Now that we have a building_id,
  // pass it back to calculate the results
  const calculateResults = await client.calculate_base_buildingAsync(
    calculateBaseBuildingOpts(hes_building_id)
  )
  if (calculateResults.calculate_result.result !== 'OK') {
    const validationResults = calculateResults.calculate_result.validate_inputs_results
    console.log('================ calculateResults error ======================')
    const errorArray = _.filter(validationResults, result => result.status !== "2")
    const errorMessages = _.map(errorArray, msg => `HES Error: ${String(msg.xpath).replace('text()=', '').replace('//', '')}: ${msg.error_message}`)
    console.log('validationResults: ', errorMessages.join('\n'))
    throw Boom.badRequest(`Error: 3. calculate_base_building (Job ${job_id}): ${errorMessages.join('\n')}`)
  }
  console.log(`2. calculateResults success (Job ${job_id}): `, JSON.stringify(calculateResults, null, 2))


  // == Step 3: retrieve_inputs() ==============================================
  // Retrieve the inputs that were sent to the HES score from the HPXML translator.
  // Get the assessment_type from this b/c this isn't sent with the official score.
  const retrievedInputs = await client.retrieve_inputsAsync(
    retrieveInputsOpts(hes_building_id)
  )
  if (retrievedInputs.building_inputs.result !== 'OK') {
    throw Boom.badRequest(`Error: 3. retrieve_inputs (Job ${job_id}):  ${retrievedInputs.building_inputs.message}`)
  }
  const hes_assessment_type_code = retrievedInputs.building_inputs.about.assessment_type || null
  console.log(`3. retrievedInputs success (Job ${job_id}): `, JSON.stringify(retrievedInputs, null, 2))


  // == Step 4: commit_results() ==============================================
  // Now that the building is calculated, commit (lock) results. If we need a
  // new score, we need to run it again and generate a new building_id
  const commitResults = await client.commit_resultsAsync(
    commitResultOpts(hes_building_id)
  )
  const labelResults = commitResults.label_result
  console.log(`4. commitResults (Job ${job_id}): `, JSON.stringify(commitResults, null, 2))


  // Update db with new HES record
  const insertData = {
    job_id,
    hes_building_id,
    hes_assessment_type_code,
    hes_xml_transaction_type,
    hes_hpxml_building_node,
    hes_locked: true,
    hes_hpxml_event_type_1,
    hes_hpxml_event_type_2,
  }

  HES_FIELDS.forEach(field => {
    insertData[`hes_${field}`] = labelResults[field]
  })

  const [id] = await knex.insert(insertData).into('v5_hes_scores')
  const response = await knex.first('*').from('v5_hes_scores').where({id: id})
  const returnData = {
    ...response,
    hes_retrieved_input_json: retrievedInputs.building_inputs
  }

  res.json(returnData)
}

// encodedHPXML is temporary only for testing
const encodedHPXML   = 'PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPEhQWE1MIHhtbG5zPSJodHRwOi8vaHB4bWxvbmxpbmUuY29tLzIwMTQvNiIKICAgIHhtbG5zOnhzaT0iaHR0cDovL3d3dy53My5vcmcvMjAwMS9YTUxTY2hlbWEtaW5zdGFuY2UiIHNjaGVtYVZlcnNpb249IjIuMCI+CiAgICA8WE1MVHJhbnNhY3Rpb25IZWFkZXJJbmZvcm1hdGlvbj4KICAgICAgICA8WE1MVHlwZS8+CiAgICAgICAgPFhNTEdlbmVyYXRlZEJ5Lz4KICAgICAgICA8Q3JlYXRlZERhdGVBbmRUaW1lPjIwMTQtMTAtMjBUMTY6MDI6MDQ8L0NyZWF0ZWREYXRlQW5kVGltZT4KICAgICAgICA8VHJhbnNhY3Rpb24+Y3JlYXRlPC9UcmFuc2FjdGlvbj4KICAgIDwvWE1MVHJhbnNhY3Rpb25IZWFkZXJJbmZvcm1hdGlvbj4KICAgIDxTb2Z0d2FyZUluZm8vPgogICAgPEJ1aWxkaW5nPgogICAgICAgIDxCdWlsZGluZ0lEIGlkPSJibGRnMSIvPgogICAgICAgIDxTaXRlPgogICAgICAgICAgICA8U2l0ZUlEIGlkPSJhZGRyZXNzIi8+CiAgICAgICAgICAgIDxBZGRyZXNzPgogICAgICAgICAgICAgICAgPEFkZHJlc3NUeXBlPnN0cmVldDwvQWRkcmVzc1R5cGU+CiAgICAgICAgICAgICAgICA8QWRkcmVzczE+MSBBUEkgSG91c2U8L0FkZHJlc3MxPgogICAgICAgICAgICAgICAgPENpdHlNdW5pY2lwYWxpdHk+TWluZGVuPC9DaXR5TXVuaWNpcGFsaXR5PgogICAgICAgICAgICAgICAgPFN0YXRlQ29kZT5ORTwvU3RhdGVDb2RlPgogICAgICAgICAgICAgICAgPFppcENvZGU+Njg5NTk8L1ppcENvZGU+CiAgICAgICAgICAgIDwvQWRkcmVzcz4KICAgICAgICA8L1NpdGU+CiAgICAgICAgPFByb2plY3RTdGF0dXM+CiAgICAgICAgICAgIDxFdmVudFR5cGU+YXVkaXQ8L0V2ZW50VHlwZT4KICAgICAgICAgICAgPERhdGU+MjAxNC0xMC0yMzwvRGF0ZT4KICAgICAgICA8L1Byb2plY3RTdGF0dXM+CiAgICAgICAgPEJ1aWxkaW5nRGV0YWlscz4KICAgICAgICAgICAgPEJ1aWxkaW5nU3VtbWFyeT4KICAgICAgICAgICAgICAgIDxTaXRlPgogICAgICAgICAgICAgICAgICAgIDxPcmllbnRhdGlvbk9mRnJvbnRPZkhvbWU+ZWFzdDwvT3JpZW50YXRpb25PZkZyb250T2ZIb21lPgogICAgICAgICAgICAgICAgPC9TaXRlPgogICAgICAgICAgICAgICAgPEJ1aWxkaW5nQ29uc3RydWN0aW9uPgogICAgICAgICAgICAgICAgICAgIDxZZWFyQnVpbHQ+MTk1MzwvWWVhckJ1aWx0PgogICAgICAgICAgICAgICAgICAgIDxSZXNpZGVudGlhbEZhY2lsaXR5VHlwZT5zaW5nbGUtZmFtaWx5IGRldGFjaGVkPC9SZXNpZGVudGlhbEZhY2lsaXR5VHlwZT4KICAgICAgICAgICAgICAgICAgICA8TnVtYmVyb2ZDb25kaXRpb25lZEZsb29yc0Fib3ZlR3JhZGU+MjwvTnVtYmVyb2ZDb25kaXRpb25lZEZsb29yc0Fib3ZlR3JhZGU+CiAgICAgICAgICAgICAgICAgICAgPEF2ZXJhZ2VDZWlsaW5nSGVpZ2h0PjEwLjU8L0F2ZXJhZ2VDZWlsaW5nSGVpZ2h0PgogICAgICAgICAgICAgICAgICAgIDxOdW1iZXJvZkJlZHJvb21zPjM8L051bWJlcm9mQmVkcm9vbXM+CiAgICAgICAgICAgICAgICAgICAgPENvbmRpdGlvbmVkRmxvb3JBcmVhPjE2MjA8L0NvbmRpdGlvbmVkRmxvb3JBcmVhPgogICAgICAgICAgICAgICAgPC9CdWlsZGluZ0NvbnN0cnVjdGlvbj4KICAgICAgICAgICAgPC9CdWlsZGluZ1N1bW1hcnk+CiAgICAgICAgICAgIDxFbmNsb3N1cmU+CiAgICAgICAgICAgICAgICA8QXR0aWNBbmRSb29mPgogICAgICAgICAgICAgICAgICAgIDxSb29mcz4KICAgICAgICAgICAgICAgICAgICAgICAgPFJvb2Y+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8U3lzdGVtSWRlbnRpZmllciBpZD0icm9vZjEiLz4KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxSb29mQ29sb3I+ZGFyazwvUm9vZkNvbG9yPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgPFJvb2ZUeXBlPmFzcGhhbHQgb3IgZmliZXJnbGFzcyBzaGluZ2xlczwvUm9vZlR5cGU+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8UmFkaWFudEJhcnJpZXI+dHJ1ZTwvUmFkaWFudEJhcnJpZXI+CiAgICAgICAgICAgICAgICAgICAgICAgIDwvUm9vZj4KICAgICAgICAgICAgICAgICAgICA8L1Jvb2ZzPgogICAgICAgICAgICAgICAgICAgIDxBdHRpY3M+CiAgICAgICAgICAgICAgICAgICAgICAgIDxBdHRpYz4KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxTeXN0ZW1JZGVudGlmaWVyIGlkPSJhdHRpYzEiLz4KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxBdHRhY2hlZFRvUm9vZiBpZHJlZj0icm9vZjEiLz4KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxBdHRpY1R5cGU+dmVudGVkIGF0dGljPC9BdHRpY1R5cGU+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8QXR0aWNGbG9vckluc3VsYXRpb24+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFN5c3RlbUlkZW50aWZpZXIgaWQ9ImF0dGljMWlucyIvPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxMYXllcj4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPE5vbWluYWxSVmFsdWU+MTM8L05vbWluYWxSVmFsdWU+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9MYXllcj4KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQXR0aWNGbG9vckluc3VsYXRpb24+CiAgICAgICAgICAgICAgICAgICAgICAgIDwvQXR0aWM+CiAgICAgICAgICAgICAgICAgICAgPC9BdHRpY3M+CiAgICAgICAgICAgICAgICA8L0F0dGljQW5kUm9vZj4KICAgICAgICAgICAgICAgIDxGb3VuZGF0aW9ucz4KICAgICAgICAgICAgICAgICAgICA8Rm91bmRhdGlvbj4KICAgICAgICAgICAgICAgICAgICAgICAgPFN5c3RlbUlkZW50aWZpZXIgaWQ9ImNyYXdsMSIvPgogICAgICAgICAgICAgICAgICAgICAgICA8Rm91bmRhdGlvblR5cGU+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Q3Jhd2xzcGFjZT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VmVudGVkPnRydWU8L1ZlbnRlZD4KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQ3Jhd2xzcGFjZT4KICAgICAgICAgICAgICAgICAgICAgICAgPC9Gb3VuZGF0aW9uVHlwZT4KICAgICAgICAgICAgICAgICAgICAgICAgPEZyYW1lRmxvb3I+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8U3lzdGVtSWRlbnRpZmllciBpZD0iY3Jhd2wxZmxyMSIvPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgPEFyZWE+NDA1PC9BcmVhPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgPEluc3VsYXRpb24+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFN5c3RlbUlkZW50aWZpZXIgaWQ9ImNyYXdsMWZscjFpbnMxIi8+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPExheWVyPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Tm9taW5hbFJWYWx1ZT4zMDwvTm9taW5hbFJWYWx1ZT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0xheWVyPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9JbnN1bGF0aW9uPgogICAgICAgICAgICAgICAgICAgICAgICA8L0ZyYW1lRmxvb3I+CiAgICAgICAgICAgICAgICAgICAgICAgIDxGcmFtZUZsb29yPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgPFN5c3RlbUlkZW50aWZpZXIgaWQ9ImNyYXdsMWZscjIiLz4KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxBcmVhPjQwNTwvQXJlYT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxJbnN1bGF0aW9uPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxTeXN0ZW1JZGVudGlmaWVyIGlkPSJjcmF3bDFmbHIyaW5zMSIvPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxMYXllcj4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPE5vbWluYWxSVmFsdWU+MDwvTm9taW5hbFJWYWx1ZT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0xheWVyPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9JbnN1bGF0aW9uPgogICAgICAgICAgICAgICAgICAgICAgICA8L0ZyYW1lRmxvb3I+CiAgICAgICAgICAgICAgICAgICAgPC9Gb3VuZGF0aW9uPgogICAgICAgICAgICAgICAgPC9Gb3VuZGF0aW9ucz4KICAgICAgICAgICAgICAgIDxXYWxscz4KICAgICAgICAgICAgICAgICAgICA8V2FsbD4KICAgICAgICAgICAgICAgICAgICAgICAgPFN5c3RlbUlkZW50aWZpZXIgaWQ9IndhbGwxIi8+CiAgICAgICAgICAgICAgICAgICAgICAgIDxXYWxsVHlwZT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxXb29kU3R1ZC8+CiAgICAgICAgICAgICAgICAgICAgICAgIDwvV2FsbFR5cGU+CiAgICAgICAgICAgICAgICAgICAgICAgIDxTaWRpbmc+YnJpY2sgdmVuZWVyPC9TaWRpbmc+CiAgICAgICAgICAgICAgICAgICAgICAgIDxJbnN1bGF0aW9uPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgPFN5c3RlbUlkZW50aWZpZXIgaWQ9IndhbGwxaW5zIi8+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8TGF5ZXI+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPE5vbWluYWxSVmFsdWU+MDwvTm9taW5hbFJWYWx1ZT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvTGF5ZXI+CiAgICAgICAgICAgICAgICAgICAgICAgIDwvSW5zdWxhdGlvbj4KICAgICAgICAgICAgICAgICAgICA8L1dhbGw+CiAgICAgICAgICAgICAgICA8L1dhbGxzPgogICAgICAgICAgICAgICAgPFdpbmRvd3M+CiAgICAgICAgICAgICAgICAgICAgPFdpbmRvdz4KICAgICAgICAgICAgICAgICAgICAgICAgPFN5c3RlbUlkZW50aWZpZXIgaWQ9ImZyb250d2luZG93cyIvPgogICAgICAgICAgICAgICAgICAgICAgICA8QXJlYT4xODwvQXJlYT48IS0tIDN4NiAtLT4KICAgICAgICAgICAgICAgICAgICAgICAgPFF1YW50aXR5PjY8L1F1YW50aXR5PgogICAgICAgICAgICAgICAgICAgICAgICA8T3JpZW50YXRpb24+ZWFzdDwvT3JpZW50YXRpb24+CiAgICAgICAgICAgICAgICAgICAgICAgIDxGcmFtZVR5cGU+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8QWx1bWludW0vPgogICAgICAgICAgICAgICAgICAgICAgICA8L0ZyYW1lVHlwZT4KICAgICAgICAgICAgICAgICAgICAgICAgPEdsYXNzTGF5ZXJzPnNpbmdsZS1wYW5lZCB3aXRoIHN0b3JtczwvR2xhc3NMYXllcnM+CiAgICAgICAgICAgICAgICAgICAgPC9XaW5kb3c+CiAgICAgICAgICAgICAgICAgICAgPFdpbmRvdz4KICAgICAgICAgICAgICAgICAgICAgICAgPFN5c3RlbUlkZW50aWZpZXIgaWQ9InJpZ2h0d2luZG93cyIvPgogICAgICAgICAgICAgICAgICAgICAgICA8QXJlYT4xNTwvQXJlYT48IS0tIDN4NSAtLT4KICAgICAgICAgICAgICAgICAgICAgICAgPFF1YW50aXR5PjQ8L1F1YW50aXR5PgogICAgICAgICAgICAgICAgICAgICAgICA8T3JpZW50YXRpb24+c291dGg8L09yaWVudGF0aW9uPgogICAgICAgICAgICAgICAgICAgICAgICA8RnJhbWVUeXBlPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgPFdvb2QvPgogICAgICAgICAgICAgICAgICAgICAgICA8L0ZyYW1lVHlwZT4KICAgICAgICAgICAgICAgICAgICAgICAgPEdsYXNzTGF5ZXJzPnNpbmdsZS1wYW5lZCB3aXRoIHN0b3JtczwvR2xhc3NMYXllcnM+CiAgICAgICAgICAgICAgICAgICAgPC9XaW5kb3c+CiAgICAgICAgICAgICAgICAgICAgPFdpbmRvdz4KICAgICAgICAgICAgICAgICAgICAgICAgPFN5c3RlbUlkZW50aWZpZXIgaWQ9ImJhY2t3aW5kb3dzMSIvPgogICAgICAgICAgICAgICAgICAgICAgICA8QXJlYT4yMTwvQXJlYT48IS0tIDMuNXg2IC0tPgogICAgICAgICAgICAgICAgICAgICAgICA8UXVhbnRpdHk+MzwvUXVhbnRpdHk+CiAgICAgICAgICAgICAgICAgICAgICAgIDxPcmllbnRhdGlvbj53ZXN0PC9PcmllbnRhdGlvbj4KICAgICAgICAgICAgICAgICAgICAgICAgPEZyYW1lVHlwZT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxXb29kLz4KICAgICAgICAgICAgICAgICAgICAgICAgPC9GcmFtZVR5cGU+CiAgICAgICAgICAgICAgICAgICAgICAgIDxHbGFzc0xheWVycz5zaW5nbGUtcGFuZTwvR2xhc3NMYXllcnM+CiAgICAgICAgICAgICAgICAgICAgICAgIDxHbGFzc1R5cGU+dGludGVkPC9HbGFzc1R5cGU+CiAgICAgICAgICAgICAgICAgICAgPC9XaW5kb3c+CiAgICAgICAgICAgICAgICAgICAgPFdpbmRvdz4KICAgICAgICAgICAgICAgICAgICAgICAgPFN5c3RlbUlkZW50aWZpZXIgaWQ9ImJhY2t3aW5kb3dzMiIvPgogICAgICAgICAgICAgICAgICAgICAgICA8QXJlYT4xMjwvQXJlYT48IS0tIDN4NCAtLT4KICAgICAgICAgICAgICAgICAgICAgICAgPFF1YW50aXR5PjQ8L1F1YW50aXR5PgogICAgICAgICAgICAgICAgICAgICAgICA8T3JpZW50YXRpb24+d2VzdDwvT3JpZW50YXRpb24+CiAgICAgICAgICAgICAgICAgICAgICAgIDxGcmFtZVR5cGU+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8V29vZC8+CiAgICAgICAgICAgICAgICAgICAgICAgIDwvRnJhbWVUeXBlPgogICAgICAgICAgICAgICAgICAgICAgICA8R2xhc3NMYXllcnM+c2luZ2xlLXBhbmU8L0dsYXNzTGF5ZXJzPgogICAgICAgICAgICAgICAgICAgICAgICA8R2xhc3NUeXBlPnRpbnRlZDwvR2xhc3NUeXBlPgogICAgICAgICAgICAgICAgICAgIDwvV2luZG93PgogICAgICAgICAgICAgICAgICAgIDxXaW5kb3c+CiAgICAgICAgICAgICAgICAgICAgICAgIDxTeXN0ZW1JZGVudGlmaWVyIGlkPSJiYWNrd2luZG93czMiLz4KICAgICAgICAgICAgICAgICAgICAgICAgPEFyZWE+MzMuMzMzMzMzMzwvQXJlYT48IS0tIDYwIng4MCIgLS0+CiAgICAgICAgICAgICAgICAgICAgICAgIDxRdWFudGl0eT4xPC9RdWFudGl0eT4KICAgICAgICAgICAgICAgICAgICAgICAgPE9yaWVudGF0aW9uPndlc3Q8L09yaWVudGF0aW9uPgogICAgICAgICAgICAgICAgICAgICAgICA8RnJhbWVUeXBlPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgPEFsdW1pbnVtLz4KICAgICAgICAgICAgICAgICAgICAgICAgPC9GcmFtZVR5cGU+CiAgICAgICAgICAgICAgICAgICAgICAgIDxHbGFzc0xheWVycz5zaW5nbGUtcGFuZTwvR2xhc3NMYXllcnM+CiAgICAgICAgICAgICAgICAgICAgICAgIDxHbGFzc1R5cGU+dGludGVkPC9HbGFzc1R5cGU+CiAgICAgICAgICAgICAgICAgICAgPC9XaW5kb3c+CiAgICAgICAgICAgICAgICAgICAgPFdpbmRvdz4KICAgICAgICAgICAgICAgICAgICAgICAgPFN5c3RlbUlkZW50aWZpZXIgaWQ9ImxlZnR3aW5kb3dzIi8+CiAgICAgICAgICAgICAgICAgICAgICAgIDxBcmVhPjE1PC9BcmVhPjwhLS0gM3g1IC0tPgogICAgICAgICAgICAgICAgICAgICAgICA8UXVhbnRpdHk+MzwvUXVhbnRpdHk+CiAgICAgICAgICAgICAgICAgICAgICAgIDxPcmllbnRhdGlvbj5ub3J0aDwvT3JpZW50YXRpb24+CiAgICAgICAgICAgICAgICAgICAgICAgIDxGcmFtZVR5cGU+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8QWx1bWludW0vPgogICAgICAgICAgICAgICAgICAgICAgICA8L0ZyYW1lVHlwZT4KICAgICAgICAgICAgICAgICAgICAgICAgPEdsYXNzTGF5ZXJzPnNpbmdsZS1wYW5lZCB3aXRoIHN0b3JtczwvR2xhc3NMYXllcnM+CiAgICAgICAgICAgICAgICAgICAgPC9XaW5kb3c+CiAgICAgICAgICAgICAgICA8L1dpbmRvd3M+CiAgICAgICAgICAgIDwvRW5jbG9zdXJlPgogICAgICAgICAgICA8U3lzdGVtcz4KICAgICAgICAgICAgICAgIDxIVkFDPgogICAgICAgICAgICAgICAgICAgIDxIVkFDUGxhbnQ+CiAgICAgICAgICAgICAgICAgICAgICAgIDxIZWF0aW5nU3lzdGVtPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgPFN5c3RlbUlkZW50aWZpZXIgaWQ9ImZ1cm5hY2UxIi8+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8WWVhckluc3RhbGxlZD4yMDAwPC9ZZWFySW5zdGFsbGVkPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgPERpc3RyaWJ1dGlvblN5c3RlbSBpZHJlZj0iZHVjdHN5czEiLz4KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxIZWF0aW5nU3lzdGVtVHlwZT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8RnVybmFjZS8+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0hlYXRpbmdTeXN0ZW1UeXBlPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgPEhlYXRpbmdTeXN0ZW1GdWVsPm5hdHVyYWwgZ2FzPC9IZWF0aW5nU3lzdGVtRnVlbD4KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxBbm51YWxIZWF0aW5nRWZmaWNpZW5jeT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VW5pdHM+QUZVRTwvVW5pdHM+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFZhbHVlPjAuOTI8L1ZhbHVlPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9Bbm51YWxIZWF0aW5nRWZmaWNpZW5jeT4KICAgICAgICAgICAgICAgICAgICAgICAgPC9IZWF0aW5nU3lzdGVtPgogICAgICAgICAgICAgICAgICAgICAgICA8Q29vbGluZ1N5c3RlbT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxTeXN0ZW1JZGVudGlmaWVyIGlkPSJjZW50cmFsYWlyMSIvPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgPFllYXJJbnN0YWxsZWQ+MjAwMDwvWWVhckluc3RhbGxlZD4KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxEaXN0cmlidXRpb25TeXN0ZW0gaWRyZWY9ImR1Y3RzeXMxIi8+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Q29vbGluZ1N5c3RlbVR5cGU+Y2VudHJhbCBhaXIgY29uZGl0aW9uaW5nPC9Db29saW5nU3lzdGVtVHlwZT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxBbm51YWxDb29saW5nRWZmaWNpZW5jeT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VW5pdHM+U0VFUjwvVW5pdHM+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFZhbHVlPjEzPC9WYWx1ZT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvQW5udWFsQ29vbGluZ0VmZmljaWVuY3k+CiAgICAgICAgICAgICAgICAgICAgICAgIDwvQ29vbGluZ1N5c3RlbT4KICAgICAgICAgICAgICAgICAgICA8L0hWQUNQbGFudD4KICAgICAgICAgICAgICAgICAgICA8SFZBQ0Rpc3RyaWJ1dGlvbj4KICAgICAgICAgICAgICAgICAgICAgICAgPFN5c3RlbUlkZW50aWZpZXIgaWQ9ImR1Y3RzeXMxIi8+CiAgICAgICAgICAgICAgICAgICAgICAgIDxEaXN0cmlidXRpb25TeXN0ZW1UeXBlPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgPEFpckRpc3RyaWJ1dGlvbj4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8RHVjdExlYWthZ2VNZWFzdXJlbWVudD4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPCEtLSBpbmRpY2F0ZSB0aGF0IGl0IGlzIHNlYWxlZCBiZWNhdXNlIDg1JSBvZiB0aGUgZHVjdHMgYXJlIHNlYWxlZCAtLT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPExlYWtpbmVzc09ic2VydmVkVmlzdWFsSW5zcGVjdGlvbj5jb25uZWN0aW9ucyBzZWFsZWQgdyBtYXN0aWM8L0xlYWtpbmVzc09ic2VydmVkVmlzdWFsSW5zcGVjdGlvbj4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0R1Y3RMZWFrYWdlTWVhc3VyZW1lbnQ+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPER1Y3RzPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8RHVjdEluc3VsYXRpb25SVmFsdWU+NDwvRHVjdEluc3VsYXRpb25SVmFsdWU+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxEdWN0TG9jYXRpb24+dmVudGVkIGNyYXdsc3BhY2U8L0R1Y3RMb2NhdGlvbj4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEZyYWN0aW9uRHVjdEFyZWE+MC41PC9GcmFjdGlvbkR1Y3RBcmVhPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tIHNlYWxlZCAtLT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0R1Y3RzPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxEdWN0cz4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPER1Y3RJbnN1bGF0aW9uUlZhbHVlPjA8L0R1Y3RJbnN1bGF0aW9uUlZhbHVlPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8RHVjdExvY2F0aW9uPmNvbmRpdGlvbmVkIHNwYWNlPC9EdWN0TG9jYXRpb24+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxGcmFjdGlvbkR1Y3RBcmVhPjAuMTU8L0ZyYWN0aW9uRHVjdEFyZWE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS0gdW5zZWFsZWQgLS0+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9EdWN0cz4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8RHVjdHM+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxEdWN0SW5zdWxhdGlvblRoaWNrbmVzcz4xPC9EdWN0SW5zdWxhdGlvblRoaWNrbmVzcz4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPER1Y3RMb2NhdGlvbj51bmNvbmRpdGlvbmVkIGF0dGljPC9EdWN0TG9jYXRpb24+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxGcmFjdGlvbkR1Y3RBcmVhPjAuMzU8L0ZyYWN0aW9uRHVjdEFyZWE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwhLS0gc2VhbGVkIC0tPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvRHVjdHM+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0FpckRpc3RyaWJ1dGlvbj4KICAgICAgICAgICAgICAgICAgICAgICAgPC9EaXN0cmlidXRpb25TeXN0ZW1UeXBlPgogICAgICAgICAgICAgICAgICAgIDwvSFZBQ0Rpc3RyaWJ1dGlvbj4KICAgICAgICAgICAgICAgIDwvSFZBQz4KICAgICAgICAgICAgICAgIDxXYXRlckhlYXRpbmc+CiAgICAgICAgICAgICAgICAgICAgPFdhdGVySGVhdGluZ1N5c3RlbT4KICAgICAgICAgICAgICAgICAgICAgICAgPFN5c3RlbUlkZW50aWZpZXIgaWQ9ImRodzEiLz4KICAgICAgICAgICAgICAgICAgICAgICAgPEZ1ZWxUeXBlPmVsZWN0cmljaXR5PC9GdWVsVHlwZT4KICAgICAgICAgICAgICAgICAgICAgICAgPFdhdGVySGVhdGVyVHlwZT5zdG9yYWdlIHdhdGVyIGhlYXRlcjwvV2F0ZXJIZWF0ZXJUeXBlPgogICAgICAgICAgICAgICAgICAgICAgICA8WWVhckluc3RhbGxlZD4xOTk1PC9ZZWFySW5zdGFsbGVkPgogICAgICAgICAgICAgICAgICAgICAgICA8RW5lcmd5RmFjdG9yPjAuODwvRW5lcmd5RmFjdG9yPgogICAgICAgICAgICAgICAgICAgIDwvV2F0ZXJIZWF0aW5nU3lzdGVtPgogICAgICAgICAgICAgICAgPC9XYXRlckhlYXRpbmc+CiAgICAgICAgICAgIDwvU3lzdGVtcz4KICAgICAgICA8L0J1aWxkaW5nRGV0YWlscz4KICAgIDwvQnVpbGRpbmc+CjwvSFBYTUw+'
const THREESCALE_KEY = '2c6cbd2be06448222d740d7a08389fce'

// hpxml_building_id is *not* the building_id that is passed back from the DOE
// hpxml_building_id is the string inside the id attr of <BuildingID id="BaseBuilding1"/> in the HPXML file.
// 'BaseBuilding1' tells the HPXML translator to send the first <Building> node (base).
// 'ImpBuilding1' sends the second (improved) node. These id's should be pulled for each file instead of hardcoded
async function hpxmlInputOpts(
  hpxml: string,
  qualified_assessor_id: string,
  hes_hpxml_building_node: ?string
) {

  const finalHpxml = NODE_ENV === 'test'
    ? encodedHPXML
    : new Buffer(hpxml).toString('base64')

  let opts = {
    submit_hpxml_inputs: {
      user_key: THREESCALE_KEY,
      qualified_assessor_id,
      hpxml: finalHpxml
    }
  }

  if (hes_hpxml_building_node === 'improved') {
    const buildingNodeId = await getImprovedBuildingNodeId(hpxml)
    if (!_.isString(buildingNodeId)) {
      throw Boom.badRequest('1a. Could not retrieve second building node id')
    }
    opts.submit_hpxml_inputs.hpxml_building_id = buildingNodeId
  }
  return opts
}

function calculateBaseBuildingOpts(buildingId) {
  return {
    building_info: {
      user_key: THREESCALE_KEY,
      building_id: buildingId,
      is_polling: false
    }
  }
}

function retrieveInputsOpts(buildingId) {
  return {
    building_info: {
      user_key: THREESCALE_KEY,
      building_id: buildingId
    }
  }
}

function commitResultOpts(buildingId) {
  return {
    building_info: {
      user_key: THREESCALE_KEY,
      building_id: buildingId
    }
  }
}

// TODO: add 'address' (requires db migration)
const HES_FIELDS = [
  'assessment_type',
  'city',
  'state',
  'zip_code',
  'conditioned_floor_area',
  'year_built',
  'cooling_present',
  'base_score',
  'assessment_date',
  'label_number',
  'qualified_assessor_id',
  'hescore_version',
  'utility_electric',
  'utility_natural_gas',
  'utility_fuel_oil',
  'utility_lpg',
  'utility_cord_wood',
  'utility_pellet_wood',
  'source_energy_total_base',
  'source_energy_asset_base',
  'hescore_version'
]

async function getImprovedBuildingNodeId(hpxml) {
  const jsPath = 'HPXML.Building[1].BuildingID[0].$.id'
  const parsedXMLJS = await new Promise((resolver, rejecter) => {
    xml2js.parseString(hpxml, (err, result) => {
      err ? rejecter(err) : resolver(result)
    })
  })
  return _.get(parsedXMLJS, jsPath)
}
