import _ from 'lodash'

export default async function swapOrderHandler(req: Object, res: Object) {
  const {body, knex: {raw}} = req
  const {job_id, uuid_a, uuid_b, table} = body

  const tableName = `v5_${_.snakeCase(table)}`

  await req.knex(`${tableName} as t1`)
   .join(`${tableName} as t2`, (j) => {
     j.on('t1.uuid', raw('?', uuid_a))
      .on('t2.uuid', raw('?', uuid_b))
   })
   .update({
     't1.order': raw('t2.order'),
     't2.order': raw('t1.order')
   })

  req.snuggAction = 'swap-order'
  req.broadcast(`job:${job_id}`, body)

  res.json({})
}
