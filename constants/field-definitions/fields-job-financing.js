export default [
  {
    name: 'Job Financing: Title',
    outputColumn: 'title',
    type: "Text",
    maxLength: 255
  }, {
    name: 'Job Financing: Is Shown?',
    outputColumn: 'is_shown',
    type: "Radio",
    options: [
      [0, 'Hide'],
      [1, 'Show']
    ]
  }, {
    name: 'Job Financing: Cash Down',
    outputColumn: 'cash_down',
    type: "Numeric"
  }
].map(f => {
  f.outputTable = 'v5_job_financing'
  f.collectionName = 'jobFinancing'
  return f
})
