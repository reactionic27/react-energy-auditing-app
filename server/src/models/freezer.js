
import bookshelf from '../init/bookshelf-init'

export default class Freezer extends bookshelf.Model {}

Freezer.prototype.tableName = 'v5_freezer'

Freezer.prototype.idAttribute = 'uuid';
