import bookshelf from '../init/bookshelf-init'

export default class ActivityFeed extends bookshelf.Model {}

ActivityFeed.prototype.tableName = 'v5_activity_feed'
ActivityFeed.prototype.idAttribute = 'uuid'
