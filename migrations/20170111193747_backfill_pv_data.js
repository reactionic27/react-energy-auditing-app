
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.raw(`
      INSERT INTO v5_recommendations (
        job_id,
        rec_definition_id,
        uuid,
        \`order\`,
        status,
        title,
        created_at,
        updated_at,
        touched_cost,
        why_it_matters
      )
      SELECT
          job_id,
          24 AS rec_definition_id,
          UUID() AS uuid,
          num_rows + 1 AS 'order',
          3 AS 'status',
          'PV Production' AS title,
          CURRENT_TIMESTAMP AS created_at,
          CURRENT_TIMESTAMP AS updated_at,
          0 AS touched_cost,
          'Install a solar PV (photovoltaic) system to offset electric energy consumption in your house. A PV system can reduce or even eliminate your electric bill entirely.' AS why_it_matters
        FROM (
          SELECT job_id, count(*) AS num_rows FROM v5_recommendations where job_id not in (
            SELECT DISTINCT job_id FROM v5_recommendations where rec_definition_id = 24
          ) GROUP BY job_id
        ) AS tbl
    `),
    knex.raw(`
      INSERT INTO v5_pv (
        job_id,
        uuid,
        \`order\`,
        created_at,
        updated_at
      )
      SELECT
        id AS job_id,
        UUID() as 'uuid',
        0 as 'order',
        CURRENT_TIMESTAMP AS created_at,
        CURRENT_TIMESTAMP AS updated_at
      FROM (
        SELECT id FROM jobs where id not in (
          SELECT DISTINCT job_id FROM v5_pv
        ) GROUP BY id
      ) as tbl
    `)
  ])
};

exports.down = function(knex, Promise) {

};
