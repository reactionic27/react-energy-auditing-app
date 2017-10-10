
export default async function programJoblistCountReader(
  req: Object,
  companyId: number
) {
  let [data] = await req.knex.raw(`
    select v5_stages.id as stage_id, (
      select
        count(jobs.id) from jobs
        where jobs.stage_id = v5_stages.id
          and jobs.is_template = 0
          and jobs.sample_job = 0
          and jobs.deleted_at is NULL
          and jobs.company_id = :companyId
          and jobs.program_id = :programId
        group by v5_stages.id
      ) as count
    from v5_stages
    union select 0 as stage_id,
    count(*) as count
      from jobs
      where jobs.is_template = 0
        and jobs.sample_job = 0
        and jobs.deleted_at is NULL
        and jobs.stage_id != 9
        and jobs.stage_id != 10
        and jobs.company_id = :companyId
        and jobs.program_id = :programId
  `, {companyId, programId: req.account.program_id})
  return data
}
