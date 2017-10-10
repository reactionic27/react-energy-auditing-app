
import bookshelf from '../init/bookshelf-init'

export default class Dhw extends bookshelf.Model {}

Dhw.prototype.tableName = 'v5_dhw'

Dhw.prototype.idAttribute = 'uuid';
