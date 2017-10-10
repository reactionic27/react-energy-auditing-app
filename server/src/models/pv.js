import bookshelf from '../init/bookshelf-init'

export default class PV extends bookshelf.Model {}

PV.prototype.tableName = 'v5_pv'

PV.prototype.idAttribute = 'uuid';
