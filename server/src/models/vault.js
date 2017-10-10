
import bookshelf from '../init/bookshelf-init'

export default class Vault extends bookshelf.Model {}

Vault.prototype.tableName = 'v5_vault'

Vault.prototype.idAttribute = 'uuid';
