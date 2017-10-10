
import bookshelf from '../init/bookshelf-init'

export default class Refrigerator extends bookshelf.Model {}

Refrigerator.prototype.tableName = 'v5_refrigerator'

Refrigerator.prototype.idAttribute = 'uuid';
