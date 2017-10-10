import bookshelf from '../init/bookshelf-init'

export default class CazSystem extends bookshelf.Model {}

CazSystem.prototype.tableName = 'v5_caz_system'

CazSystem.prototype.idAttribute = 'uuid';
