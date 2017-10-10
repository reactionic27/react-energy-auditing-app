export default [{
  name: 'Account: First name',
  outputColumn: 'first_name',
}, {
  name: 'Account: Last name',
  outputColumn: 'last_name',
}, {
  name: 'Account: Email',
  outputColumn: 'email',
  type: "Email"
}, {
  name: 'Account: Personal Phone',
  outputColumn: 'phone_number',
}, {
  name: 'Account: Title',
  outputColumn: 'title',
}, {
  name: 'Account: Certifications',
  outputColumn: 'certifications',
}, {
  name: "Account: DOE Assessor ID",
  outputColumn: "doe_assessor_id",
  maxLength: 255,
}, {
  name: 'Account: Hours of operation',
  outputColumn: 'hours_of_operation',
}, {
  name: 'Account: Receive newsletter',
  outputColumn: 'gets_newsletter',
  isSelect: true,
  options: [[1, 'On'], [0, 'Off']]
}].map(obj => {
  obj.label = obj.name.slice(9)
  obj.outputTable = 'accounts'
  return obj
})
