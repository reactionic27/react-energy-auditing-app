import bookshelf from '../init/bookshelf-init'

export default class Range extends bookshelf.Model {}

Range.prototype.tableName = 'v5_range'

Range.prototype.idAttribute = 'uuid';
