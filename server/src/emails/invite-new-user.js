// INVITED NEW USER TO TEAM //
// User Role:  Contractor User
// Trigger:    Contractor Admin invited a non-Snugg Pro user to their company
import load from './load-template'

export default {
  body: load('invite-new-user.ejs'),
  subject: '<%= first_name %> invited you to join <%= company_name %> on Snugg Pro'
}
