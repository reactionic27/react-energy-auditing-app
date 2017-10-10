import {queue} from '../init/kue-init'

type
csvDataSource = {
  filename: string,
  jobIds: number[]
};

export default async function csvDownloadCommon(data: csvDataSource, req, res, next) {
  try {
    let accounts = req.locals.account;
    let kueJob = queue.create('csv_queue', {
      data,
      accounts
    })
      .delay(5000)
      .backoff(function(attempts) {
        if (attempts < 10) {
          return (10 - attempts) * 1000
        }
        return 5000;
      })
      .save(err => {
        if (err) {
          console.log("Error", err);
          res.status(500).json({
            "message": "Error occur while creating csv job queue"
          });
        }
        console.log("Job Created");
        res.status(200).send({
          "kueJobId": kueJob.id,
          "message": "Creating csv job started"
        });
      });
  } catch (e) {
    console.log("exception in csvDownloadCommon", e);
    next(e)
  }
}
