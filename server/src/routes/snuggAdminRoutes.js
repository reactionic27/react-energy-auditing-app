import validateBody from '../helpers/validate-body'
import authorize from '../authorizations/authorize'
import optimiserDataReader from '../readers/optimiserDataReader'
import optimiserRawDataReader from '../readers/optimiserRawDataReader'
import deleteMigratedV5Job from '../snuggadmin/delete-migrated-v5-job'
import  createJobFromJob from '../handlers/job-from-job-handler'

module.exports = function snuggAdminRoutes(router: Object) {

  router.all('/snuggadmin/*', async (req, res, next) => {
    await authorize('snuggadmin', req)
    next()
  });

  router.get('/account/use/:account_id', authorize('snuggadmin'), (req, res) => {
    req.token = {id: parseInt(req.params.account_id, 10)}
    res.redirect('/')
  })

  router.post('/snuggadmin/remove-v5-job/:job_id', async (req, res) => {

    validateBody('empty', req)

    try {
      await deleteMigratedV5Job(req.params.job_id)
      res.json({})
    } catch (e) {
      res.json({error: e.stack})
    }

  })

  router.post('/snuggadmin/create-job-from-job',
    authorize('snuggadmin'),
    validateBody('snuggadmin/create-job-from-job'),
    createJobFromJob)

  router.get('/api/optimiser/:id', authorize('snuggadmin'), async (req, res) => {
    const {errors, returning, values} = await optimiserDataReader(req, +req.params.id)
    res.json({
      errors,
      varlist: returning,
      output: values
    })
  })

  router.get('/optimiser/job/raw-response/:id', authorize('snuggadmin'), async (req, res) => {
    res.json(await optimiserRawDataReader(req, +req.params.id))
  })

}
