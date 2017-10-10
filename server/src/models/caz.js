
import bookshelf from '../init/bookshelf-init'

export default class Caz extends bookshelf.Model {}

Caz.prototype.tableName = 'v5_caz'

Caz.prototype.idAttribute = 'uuid';
