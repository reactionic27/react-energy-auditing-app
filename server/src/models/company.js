import bookshelf from '../init/bookshelf-init'

export default class Company extends bookshelf.Model {

  templates() {
    return this.hasMany('job').query((qb) => {
      return qb.where({is_template: 1}).whereIn('version', [4, 5])
    })
  }

  accounts() {
    return this.belongsToMany('account').withPivot(['role', 'display_title', 'display_email'])
  }

  programs() {
    return this.belongsToMany('program')
  }

  jobs() {
    return this.hasMany('job')
  }

  invitations() {
    return this.hasMany('invitation').query({where: {deleted_at: null}})
  }

  financingTemplates() {
    return this.hasMany('financing-template')
      .query({where: ['type', '=', 'company'], andWhere: {deleted_at: null}})
  }

}

Company.prototype.tableName = 'companies';
