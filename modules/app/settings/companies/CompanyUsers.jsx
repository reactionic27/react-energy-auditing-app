import React from 'react'
import {Map as IMap} from 'immutable'
import {InlineNotification} from 'app/components/overlays'
import InviteForm from './UserInviteForm'
import {DeleteButton, Button, Icon, MutedText} from 'ui'
import {connect, connectSelector} from 'snugg-redux'
import {dispatchSave} from 'data/actions'

@connectSelector({
  companyName: (state, {companyId}) => {
    return state.fn.companyById(companyId).get('name')
  },
  activeAccounts: (state, {companyId}) => {
    return state.fn.accountsByCompanyId(companyId)
  },
  pendingInvites: (state, {companyId}) => {
    return state.fn.pendingInvitesByCompanyId(companyId)
  },
  accountsCompanies: (state) => state.snugg.get('accountsCompanies')
})
export default class CompanyUsers extends React.Component {

  state = {
    showInviteForm: false,
  };

  showForm = (e) => {
    e.preventDefault()
    this.setState({showInviteForm: !this.state.showInviteForm})
  }

  closeForm() {
    this.setState({showInviteForm: false})
  }

  render() {
    const {
      props: {
        params: {companyId},
        pendingInvites,
        activeAccounts,
        companyName,
        accountsCompanies
      }
    } = this

    let pendingInviteRows = null
    let activeAccountRows = null

    if (pendingInvites.length > 0) {
      const invitedRows = [pendingInviteHeader].concat(pendingInvites.map(invite => (
        <PendingInviteRow key={invite.get('id')} invite={invite} />
      )))
      pendingInviteRows = (
        <div>
          <h4>Pending invitations
            <span className="badge">{pendingInvites.length}</span>
          </h4>
          <table className="table table-expansive">
            <tbody>
              {invitedRows}
            </tbody>
          </table>
        </div>
      )
    }

    if (activeAccounts.length > 0) {
      const tableRows = [activeUsersHeader].concat(activeAccounts.map(acct => activeUserRow(acct, accountsCompanies, companyId)))
      activeAccountRows = (
        <div>
          <h4>Active users <span className="badge">{activeAccounts.length}</span></h4>
          <table className="table table-expansive">
            <tbody>
              {tableRows}
            </tbody>
          </table>
        </div>
      )
    } else {
      activeAccountRows = (
        <div>
          <h4>Active users</h4>
          <InlineNotification message={`There are no active users for ${companyName}`} />
        </div>
      )
    }

    const {showInviteForm} = this.state
    return (
      <div className="tab-pane active" id="settings-companies-users">
        <div>
          <h2>Manage Users</h2>
          <h4>Invite users to join {companyName}.</h4>
          <MutedText>
            You can invite as many users as you need, it's free.<br/>
            {pendingInvites.length > 0 ?
              <div>
                You also have
                {pendingInvites.length === 1
                  ?
                  ' a pending invitation. Scroll down to resend or delete it.'
                  :
                  ` ${pendingInvites.length} pending invitations. Scroll down to resend or delete them.`
                }
              </div>
            : null
            }
          </MutedText>
          <br/>
          {!showInviteForm &&
            <div className="animated fadeIn">
              <Button
                variant="link"
                size="lg"
                customStyle={{width: 'auto'}}
                onClick={this.showForm}>
                <Icon type="mail" style={{display: 'inline', float: 'left', paddingTop: 2, paddingRight: 9}}/>Invite a new user
              </Button>
            </div>
          }
          <div className={`inlay animated ${showInviteForm ? 'fadeIn inlay-open' : 'fadeOut'}`}>
            <InviteForm companyId={companyId} closeForm={(e) => this.closeForm(e)} />
          </div>
          <hr />
          <div className="users__all-users">
            {activeAccountRows}
            {pendingInviteRows}
          </div>
        </div>
      </div>
    )
  }

};

const activeUsersHeader = (
  <tr key='activeUsersHeader'>
    <th>First</th>
    <th>Last</th>
    <th>Email</th>
    <th>Phone</th>
    <th>Title</th>
    <th>Certifications</th>
    <th>Permissions</th>
  </tr>
)

const pendingInviteHeader = (
  <tr key="pendingInviteHeader">
    <th>Email</th>
    <th>Title</th>
    <th>Role</th>
    <th>Status</th>
    <th style={{textAlign: 'center'}}>Action</th>
    <th></th>
  </tr>
)

const activeUserRow = (account, accountsCompanies, companyId) => {
  const pairing = accountsCompanies.get(IMap({
    account_id: account.get('id'),
    company_id: companyId
  }))
  const authRole = pairing.get('role')
  const role = account.get('role') === 'snuggadmin'
    ? `${authRole} (snuggadmin)`
    : authRole
  return (
    <tr key={account.get('id')}>
      <td>{account.get('first_name')}</td>
      <td>{account.get('last_name')}</td>
      <td>{account.get('email')}</td>
      <td>{account.get('phone_number')}</td>
      <td>{account.get('title')}</td>
      <td>{account.get('certifications')}</td>
      <td>{role}</td>
    </tr>
  )
}

@connect(null, {dispatchSave})
class PendingInviteRow extends React.Component {

  deleteInvitation = (e) => {
    e.preventDefault()
    this.props.dispatchSave('invitations', {
      id: this.props.invite.get('id'),
      deleted_at: new Date()
    });
  };

  render() {
    const {props: {invite}} = this
    return (
      <tr>
        <td>{invite.get('email')}</td>
        <td>{invite.get('title')}</td>
        <td>{invite.get('role')}</td>
        <td>{invite.get('status')}</td>
        <td style={{textAlign: 'center'}}>
          <Button
            variant="link"
            customStyle={{width: 'auto'}}
            href={`mailto:${invite.get('email')}?&subject=Invitation%20to%20join%20my%20company%20on%20Snugg%20Pro&body=Here%20is%20the%20invitation%20link%3A%0D%0A%0D${encodeURI(inviteUrl(invite))}`}>
            Resend invite manually
          </Button>
        </td>
        <td style={{textAlign: 'right', padding: 2}}>
          <DeleteButton onClick={this.deleteInvitation}/>
        </td>
      </tr>
    )
  }
}

function inviteUrl(invite) {
  const linkType = invite.get('account_id') ? 'confirm-invited' : 'register-invited'
  return `${window.location.protocol}//${window.location.host}/${linkType}/${invite.get('uuid')}`
}
