import bookshelf from '../init/bookshelf-init'

export default class jobStageHistory extends bookshelf.Model {}

jobStageHistory.prototype.tableName = 'v5_job_stage_history'

jobStageHistory.prototype.idAttribute = 'id';
