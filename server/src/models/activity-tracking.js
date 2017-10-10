import bookshelf from '../init/bookshelf-init'

export default class ActivityTracking extends bookshelf.Model {}

ActivityTracking.prototype.tableName = 'v5_activity_tracking'
