import bookshelf from '../init/bookshelf-init'

export default class OptimiserSubmission extends bookshelf.Model {}

OptimiserSubmission.prototype.tableName = 'v5_optimiser_submissions'

OptimiserSubmission.prototype.hasTimestamps = true
