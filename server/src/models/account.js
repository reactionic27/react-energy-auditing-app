import bookshelf from '../init/bookshelf-init'

export default class Account extends bookshelf.Model {

  fullName() {
    return this.get('first_name') + ' ' + this.get('last_name')
  }

  sampleJobs() {
    return this.hasMany('job')
  }

  filterValues() {
    return this.pick('first_name', 'last_name', 'phone_number',
      'email', 'title', 'certifications', 'doe_assessor_id', 'hours_of_operation', 'gets_newsletter')
  }

  companies() {
    return this.belongsToMany('company').withPivot(['role', 'display_title', 'display_email']).query({
      where: {'deleted_at': null, 'disabled': 0},
    })
  }

  jobs() {
    return this.hasMany('job')
  }

  adminProgram() {
    return this.belongsTo('program')
  }

  financingTemplates() {
    return this.hasMany('financing-template').query({
      where: ['type', '=', 'account'],
      andWhere: {deleted_at: null}
    })
  }
}

Account.prototype.hasTimestamps = true

Account.prototype.tableName = 'accounts'

Account.prototype.hidden = [
  'password', 'password_reset_link', 'offer',
  'adgroup', 'source', 'last_used_company', 'tours',
  'updated_at'
]
