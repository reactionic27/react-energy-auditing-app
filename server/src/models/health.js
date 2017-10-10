import bookshelf from '../init/bookshelf-init'

export default class Health extends bookshelf.Model {}

Health.prototype.tableName = 'v5_health'

Health.prototype.idAttribute = 'job_id'
