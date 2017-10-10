
import bookshelf from '../init/bookshelf-init'

export default class Window extends bookshelf.Model {}

Window.prototype.tableName = 'v5_window'

Window.prototype.idAttribute = 'uuid';
