import bookshelf from '../init/bookshelf-init'

export default class OptimiserSession extends bookshelf.Model {}

OptimiserSession.prototype.tableName = 'v5_optimiser_sessions';

OptimiserSession.prototype.hasTimestamps = ['created_at'];
