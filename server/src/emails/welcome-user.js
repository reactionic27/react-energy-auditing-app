// WELCOME USER //

// User Role:  Contractor User
// Trigger:  Sign up (as an invited user for a contractor admin)
import load from './load-template'

export default {
  body: load('welcome-user.ejs'),
  subject: 'Welcome to Snugg Pro'
}
