/* eslint-env mocha */
import expect from 'expect'
import render from '../src/emails/render'

const modules = [
  'forgot-password',
  'invite-existing-user',
  'invite-new-user',
  'welcome-admin',
  'welcome-user'
]

describe('emails', () => {

  // Just sanity check all the template modules load a subject and body
  describe('template modules', () => {

    modules.forEach(function(name) {

      it(name + ' should have subject and body', () => {
        var email = require('../src/emails/' + name).default
        expect(email).toIncludeKey('subject')
        expect(email).toIncludeKey('body')
        expect(email.body).toInclude('<%=')
        expect(email.subject).toBeA('string')
      })

    })

  })

  describe('emails/render', () => {

    it('should handle subject, layout, body', () => {
      const options = {
        subject: 'Test Subject <%= name %>',
        body: 'Test body <%= color %>. <div>some div</div>',
        locals: {
          name: 'UT Name',
          color: 'ut-blue'
        }
      }
      const result = render(options)

      // subject should render properly
      expect(result.subject).toEqual('Test Subject UT Name')

      // body should render properly
      expect(result.body).toInclude('Test body ut-blue.')
      expect(result.body).toInclude('<div>some div</div>')

      // smoke tests that the layout is there
      expect(result.body).toInclude('<title>')
      expect(result.body).toInclude('footer')
      expect(result.body).toInclude('http://support.snuggpro.com')

      // no ejs delimiters unrendered
      expect(result.body).toExclude('<%')
      expect(result.body).toExclude('%>')
    })

    it('should escape HTML properly', () => {
      const options = {
        subject: 'Test Subject <%= name %>',
        body: 'Test body <%= color %>.<p>para OK here</p>',
        locals: {
          name: 'UT Name<script>alert("!")</script>',
          color: 'ut-blue<script>alert("!")</script>'
        }
      }
      const result = render(options)

      // subject should render properly
      expect(result.subject).toEqual('Test Subject UT Name&lt;script&gt;alert(&#34;!&#34;)&lt;/script&gt;')
      expect(result.body).toInclude('Test body ut-blue&lt;script&gt;alert(&#34;!&#34;)&lt;/script&gt;')
      expect(result.body).toInclude('<p>para OK here</p>')
      expect(result.body).toExclude('<script>')
    })

  })


})
