// WELCOME ADMIN //

// User Role:  Contractor Admin
// Trigger:  Sign up
import load from './load-template'

export default {
  body: load('welcome-admin.ejs'),
  subject: 'Welcome to Snugg Pro'
}
