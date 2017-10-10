import validateBody from '../helpers/validate-body'
import registerSignup from '../helpers/register-signup'
import {
  ensureLoggedOut,
  login,
  register,
  duplicateCompany,
  forgotPassword,
  resetPassword,
  registerInvited,
  inviteUuid,
  loginInvited,
  confirmInvited,
} from '../middleware/auth-middleware'

module.exports = function(router) {

  router.get('/ping', (req, res) => res.json({}))

  router.route('/login')
    .all(ensureLoggedOut('Login'))
    .get(login.get)
    .post(validateBody('login'), login.post)

  router.route('/register')
    .all(ensureLoggedOut('Register'))
    .get(register.get)
    .post(validateBody('register'), registerSignup('register'))

  router.route('/duplicate-company-msg')
    .all(ensureLoggedOut('Register'))
    .get(duplicateCompany.get)
    .post(validateBody('register'), registerSignup('register'))

  router.route('/forgot-password')
    .all(ensureLoggedOut('Forgot Password'))
    .get(forgotPassword.get)
    .post(validateBody('forgotPassword'), forgotPassword.post)

  router.route('/reset-password/:uuid')
    .all(ensureLoggedOut('Reset Password'))
    .get(resetPassword.get)
    .post(validateBody('resetPassword'), resetPassword.post)

  router.route('/register-invited/:uuid')
    .all(ensureLoggedOut('Invitation Registration'))
    .get(inviteUuid.get, registerInvited.get)
    .post(inviteUuid.post, validateBody('registerInvited'), registerSignup('invited'))

  router.route('/login-invited/:uuid')
    .all(ensureLoggedOut('Invite Registration'))
    .get(inviteUuid.get, loginInvited.get)
    .post(inviteUuid.post, validateBody('loginInvited'), loginInvited.post)

  router.route('/confirm-invited/:uuid')
    .get(inviteUuid.get, confirmInvited.get)
    .post(inviteUuid.post, validateBody('confirmInvited'), confirmInvited.post)

  return router
}
