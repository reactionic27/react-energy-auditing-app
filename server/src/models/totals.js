import bookshelf from '../init/bookshelf-init'

export default class Totals extends bookshelf.Model {}

Totals.prototype.tableName = 'v5_totals'

Totals.prototype.idAttribute = 'job_id'
