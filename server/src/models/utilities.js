
import bookshelf from '../init/bookshelf-init'

export default class Utilities extends bookshelf.Model {}

Utilities.prototype.tableName = 'v5_utilities'

Utilities.prototype.idAttribute = 'job_id';
