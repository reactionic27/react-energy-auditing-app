import bookshelf from '../init/bookshelf-init'

export default class Basedata extends bookshelf.Model {}

Basedata.prototype.tableName = 'v5_basedata';

Basedata.prototype.idAttribute = 'job_id'
