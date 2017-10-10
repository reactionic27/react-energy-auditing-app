import bookshelf from '../init/bookshelf-init'

export default class Invitation extends bookshelf.Model {

  company() {
    return this.belongsTo('company')
  }

}

Invitation.prototype.tableName = 'invitations';

Invitation.prototype.hasTimestamps = true
