import bookshelf from '../init/bookshelf-init'

export default class FinancingTemplate extends bookshelf.Model {}

FinancingTemplate.prototype.transitTag = 'model'

FinancingTemplate.prototype.tableName = 'v5_financing_templates';
