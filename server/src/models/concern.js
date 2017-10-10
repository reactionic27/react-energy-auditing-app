
import bookshelf from '../init/bookshelf-init'

export default class Concern extends bookshelf.Model {}

Concern.prototype.tableName = 'v5_concern'

Concern.prototype.idAttribute = 'uuid';
