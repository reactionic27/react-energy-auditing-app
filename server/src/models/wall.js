
import bookshelf from '../init/bookshelf-init'

export default class Wall extends bookshelf.Model {}

Wall.prototype.tableName = 'v5_wall'

Wall.prototype.idAttribute = 'uuid';
