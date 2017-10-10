
import bookshelf from '../init/bookshelf-init'

export default class Door extends bookshelf.Model {}

Door.prototype.tableName = 'v5_door'

Door.prototype.idAttribute = 'uuid';
