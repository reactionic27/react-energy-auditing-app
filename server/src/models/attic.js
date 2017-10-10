
import bookshelf from '../init/bookshelf-init'

export default class Attic extends bookshelf.Model {}

Attic.prototype.tableName = 'v5_attic'

Attic.prototype.idAttribute = 'uuid';
