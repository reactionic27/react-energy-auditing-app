/* eslint-env mocha */
import knex from '../src/init/knex-init'
import expect from 'expect'
import {validRegistration, makeServer} from './assets/test-mocks'

const request = makeServer()

describe('auth-middleware', () => {

  describe('/register', () => {

    it('should reject missing password', () => {
      const form = validRegistration()
      delete form.password
      return request
        .post('/register')
        .type('form')
        .send(form)
        .expect(302)
        .expect('Location', '/register')
        .expect('Set-Cookie', /password.*required/)
    })

    it('should reject empty password', () => {
      const form = validRegistration()
      form.password = ''
      return request
        .post('/register')
        .type('form')
        .send(form)
        .expect(302)
        .expect('Location', '/register')
        .expect('Set-Cookie', /password.*empty/)
    })

    it('should reject wrong confirm password', () => {
      const form = validRegistration()
      form.password_confirm += '-NOPE'
      return request
        .post('/register')
        .type('form')
        .send(form)
        .expect(302)
        .expect('Location', '/register')
        .expect('Set-Cookie', /password.*not%20match/)
    })

    it('should create an account', () => {
      const registration = validRegistration()
      return request
        .post('/register')
        .type('form')
        .send(registration)
        .expect(302)
        .expect('Location', '/')
        .then(async function expectAccount() {
          const accounts = await knex.select('*')
            .from('accounts')
            .where('email', registration.email).limit(1)
          expect(accounts.length).toEqual(1)
          const ac_rows = await knex.select('*')
            .from('accounts_companies')
            .where('account_id', accounts[0].id).limit(1)
          expect(ac_rows.length).toEqual(1)
          expect(ac_rows[0]).toInclude({role: 'admin'})
          const company_id = ac_rows[0].company_id
          const companies = await knex.select('*')
            .from('companies')
            .where('id', company_id).limit(1)
          expect(companies.length).toEqual(1)
          const company = companies[0]
          expect(company).toInclude({name: registration.company_name})
        })
    })
  })

  describe('/login', () => {
    const registration = validRegistration()

    before(() => {
      // create an account to test login
      return request
        .post('/register')
        .type('form')
        .send(registration)
        .expect(302)
        .expect('Location', '/')
    })

    it('should reject wrong password', () => {
      let {email} = registration
      return request
        .post('/login')
        .type('form')
        .send({email, password: 'NOPE'})
        .expect(302)
        .expect('Location', '/login')
        .expect('Set-Cookie', /Check%20your%20email%20and%20password/)
    })

    it('should reject wrong email', () => {
      let {email, password} = registration
      return request
        .post('/login')
        .type('form')
        .send({email: email + '.NOPE', password})
        .expect(302)
        .expect('Location', '/login')
        .expect('Set-Cookie', /Check%20your%20email%20and%20password/)
    })

    it('should accept valid credentials', () => {
      let {email, password} = registration
      return request
        .post('/login')
        .type('form')
        .send({email, password})
        .expect(302)
        .expect('Location', '/')
    })

    it.skip('should send reset password email', () => {

    })

    it.skip('should reset password', () => {

    })

  })

})
