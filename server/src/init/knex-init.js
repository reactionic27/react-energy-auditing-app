import knexfile from '../../../knexfile'
import Knex from 'knex'
import QueryBuilder from 'knex/lib/query/builder'

const cfg = knexfile[process.env.NODE_ENV || 'development'];
const knex = Knex(cfg);

QueryBuilder.prototype.toJSON = function() {
  return this + ''
}

export default knex
