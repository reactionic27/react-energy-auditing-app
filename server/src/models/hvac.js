
import bookshelf from '../init/bookshelf-init'

export default class Hvac extends bookshelf.Model {}

Hvac.prototype.tableName = 'v5_hvac'

Hvac.prototype.idAttribute = 'uuid';
