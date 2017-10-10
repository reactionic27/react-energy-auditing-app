import bookshelf from '../init/bookshelf-init'

export default class ClothesDryer extends bookshelf.Model {}

ClothesDryer.prototype.tableName = 'v5_clothes_dryer'

ClothesDryer.prototype.idAttribute = 'uuid';
