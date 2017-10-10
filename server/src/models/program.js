import bookshelf from '../init/bookshelf-init'

export default class Program extends bookshelf.Model {

  companies() {
    return this.belongsToMany('company')
  }

  financingTemplates() {
    return this.hasMany('financing-template')
      .query({where: ['type', '=', 'program'], andWhere: {deleted_at: null}})
  }

  templates() {
    return this.hasMany('job').query((qb) => {
      qb.where('is_template', 1).whereNull('account_id').whereNull('company_id')
    })
  }

}

Program.prototype.tableName = 'programs';
