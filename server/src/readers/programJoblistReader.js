
export default async function programJoblistReader(
  req: Object,
  programId: number,
  companyId: number,
  stageId: ?number,
) {
  const {model} = req
  return await model('company')
    .where('id', companyId)
    .fetch({
      require: true,
      withRelated: [{
        jobs(qb) {
          qb.where({
            deleted_at: null,
            sample_job: 0,
            program_id: programId,
            is_template: 0
          })
          .whereIn('version', [4, 5])
          if (stageId) {
            qb.where({'stage_id': stageId})
          } else {
            qb.where(qb2 => {
              qb2.whereNull('stage_id').orWhereNotIn('jobs.stage_id', [9, 10])
            })
          }
        }
      }, 'jobs.account', 'jobs.program', 'jobs.company']
    })
}
