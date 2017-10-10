
let reusedQueryInfo = `
  FROM jobs
  INNER JOIN accounts_companies ON accounts_companies.company_id = jobs.company_id
  WHERE 1 = 1
  AND accounts_companies.account_id = :accountId
  AND jobs.is_template = 0
  AND jobs.deleted_at IS NULL
  AND jobs.company_id = :companyId
`


let roleBasedQuery = `
  AND (
    jobs.account_id = :accountId
    OR
    (accounts_companies.role = 'admin' AND jobs.sample_job = 0)
  )
`

export default async function joblistCountReader(
  req: Object,
  companyId: number,
  accountId: number,
  accountRole: string
) {
  let [data] = await req.knex.raw(`
    SELECT v5_stages.id AS stage_id, (
      SELECT COUNT(jobs.id)
      ${reusedQueryInfo}
      ${accountRole !== 'snuggadmin' ? roleBasedQuery : ``}
        AND jobs.stage_id = v5_stages.id
        GROUP BY v5_stages.id
    ) AS count
      FROM v5_stages

    UNION

    SELECT 0 AS stage_id,

    COUNT(*) as count
      ${reusedQueryInfo}
      ${accountRole !== 'snuggadmin' ? roleBasedQuery : ``}
      AND jobs.stage_id != 9
      AND jobs.stage_id != 10
  `, {companyId, accountId})
  return data
}
