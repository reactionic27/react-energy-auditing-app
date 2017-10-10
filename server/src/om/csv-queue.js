import csvDataReader from '../csv/csvDataReader';
import AWS from 'aws-sdk'
import uuid from 'node-uuid'
import json2csv from 'json2csv'
import {saveKueJob, getKueJob} from '../init/kue-init'
import {emitter} from '../lib/socket-emitter'
import _ from 'lodash'
import bole from 'bole'

const log = bole(__filename)

import {AWS_S3_CSV_BUCKET} from '../constants'
const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY} = process.env

const s3 = new AWS.S3({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY
})

async function createMultipartUpload(params) {
  const multiPart = await s3.createMultipartUpload(params).promise()
  return multiPart.UploadId
}

async function uploadPart(params) {
  const part = await s3.uploadPart(params).promise()
  return {
    ETag: part.ETag,
    PartNumber: params.PartNumber
  }
}

async function completeMultipartUpload(params) {
  await s3.completeMultipartUpload(params).promise()
}

function csvDataCheck(csvData, jobIds, done) {
  for (var i = 0; i < csvData.data.length; i++) {
    const row = csvData.data[i]
    if (row.length !== csvData.fields.length) {
      done(new Error(
        `Expected job ${jobIds[i]} to have ` +
        `${csvData.fields.length} columns, saw ${row.length} columns`
      ))
      return
    }
  }
}

function sizeInMB(str) {
  return str.length/(1000 * 1000)
}

export async function csvQueueProcess(job, done) {
  try {
    const fileId = uuid.v4()
    const fileName = `${fileId}.csv`
    const s3Params = {
      Bucket: AWS_S3_CSV_BUCKET,
      Key: fileName,
      // ServerSideEncryption: 'AES256'
    }

    let UploadId = await createMultipartUpload(s3Params)

    let multipartMap = {
      Parts: []
    };
    const {jobIds} = job.data.data
    // Generate csv 50 jobs at a time
    const batchSize = 50
    const jobIdChunks = _.chunk(jobIds, batchSize)
    let PartNumber = 1
    let index = 0
    let csvStore = ''
    for (let jobIdChunk of jobIdChunks) {
      const csvData = await csvDataReader(jobIdChunk);
      csvDataCheck(csvData, jobIdChunk, done)
      const csv = await createCSV(csvData, index === 0);
      csvStore = index === 0 ? csv: csvStore + '\n' + csv
      // only upload a part to s3 if csv is size > 8 MB or it is the last iteration
      // (Added margin for 5MB minimum limit of S3 multipart upload)
      if (sizeInMB(csvStore) > 8 || ((index + 1) === jobIdChunks.length)) {
        const part = await uploadPart({
          ...s3Params,
          PartNumber,
          UploadId,
          Body: csvStore
        })
        PartNumber += 1
        multipartMap.Parts.push(part)
        csvStore = ''
      }
      index += 1
    }

    await completeMultipartUpload({
      ...s3Params,
      UploadId,
      MultipartUpload: multipartMap
    })

    job.data.fileId = fileId
    await saveKueJob(job)
    done()
  } catch (e) {
    log.warn("exception occur while processing csv-queue ", e);
    done(e)
  }
}

export async function handleCsvCompletedJob(id, done) {
  const kueJob = await getKueJob(id)
  const url = s3.getSignedUrl('getObject', {
    Bucket: AWS_S3_CSV_BUCKET,
    Key: `${kueJob.data.fileId}.csv`,
    Expires: 60 * 60 * 1.25
  })
  let account = kueJob.data.accounts;
  emitter
   .to(`account:${account.id}`)
   .emit('csvgenerate/complete', {
     url
   });
  kueJob.remove(err => {
    if (err) {
      console.error(err.stack)
    } else {
      console.log('removed completed job #%s', id);
      console.log('=================================')
    }
  })
}

 /**
  * @description To create csv file from json data
  * @param csvData
  * @returns {string}
  */
async function createCSV(csvData, csvFieldsRequired) {
  let fields = csvData.fields;
  let records = csvData.data;
  let allRecords = [];
  let obj;
  for (let rows = 0; rows < records.length; rows++) {
    let data = records[rows];
    obj = {};
    for (var i = 0; i <= fields.length; i++) {
      obj[fields[i]] = data[i];
    }
    allRecords.push(obj);
  }
  const csvOptions = csvFieldsRequired ?
    {data: allRecords, fields: fields}
    :
    {data: allRecords, fields: fields, hasCSVColumnTitle: false}
  let csv = json2csv(csvOptions);
  return csv
}
