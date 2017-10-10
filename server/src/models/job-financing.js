import bookshelf from '../init/bookshelf-init'

export default class JobFinancing extends bookshelf.Model {}

JobFinancing.prototype.tableName = 'v5_job_financing'

JobFinancing.prototype.idAttribute = 'uuid'
