var _ = require('lodash')
var invariant = require('fbjs/lib/invariant')

function enumString(opts) {
  return `ENUM(${opts.map(o => `"${o.replace('"', '\"', 'g')}"`)})`
}

module.exports = function enumHelper(knex, table, column, operations) {
  invariant(
    _.isString(table),
    'Missing table for enum migrator'
  )

  invariant(
    _.isString(column),
    'Missing column for enum migrator'
  )
  const requiredKeys = ['adding', 'renaming', 'current']

  requiredKeys.forEach(prop => {
    invariant(
      operations.hasOwnProperty(prop),
      `
      Enum must have adding, renaming, current properties in last field,
      even if they are set to null
      `
    )
  })

  let {adding, renaming, current} = operations

  renaming = renaming || {}

  invariant(
    Array.isArray(current),
    'Missing current value for enum must be an array of current enum values'
  )

  invariant(
    _.isPlainObject(renaming),
    'Renaming should be a plain object of {[current]: renamed} pairs'
  )

  adding = adding || []

  var alterBase = `ALTER TABLE \`${table}\` CHANGE \`${column}\` \`${column}\``

  if (_.isEmpty(renaming)) {
    return knex.schema.raw(`${alterBase} ${enumString(current.concat(adding))}`)
  }

  var allOptions = _.uniq(current.concat(_.values(renaming)).concat(adding))
  var newOptions = _.difference(allOptions, _.keys(renaming))

  var first = `${alterBase} ${enumString(allOptions)}`
  var second = `${alterBase} ${enumString(newOptions)}`

  return knex.schema.raw(first)
    .then(() => {
      const results = _.reduce(renaming, (result, val, key) => {
        return result.concat(knex(table).update({[column]: val}).where({[column]: key}))
      }, [])
      return Promise.all(results)
    })
    .then(() => {
      return knex.schema.raw(second)
    })
};
