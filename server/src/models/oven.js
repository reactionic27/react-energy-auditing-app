import bookshelf from '../init/bookshelf-init'

export default class Oven extends bookshelf.Model {}

Oven.prototype.tableName = 'v5_oven'

Oven.prototype.idAttribute = 'uuid';
