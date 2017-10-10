import bookshelf from '../init/bookshelf-init'

export default class Report extends bookshelf.Model {}

Report.prototype.tableName = 'v5_reports'

Report.prototype.idAttribute = 'job_id'
