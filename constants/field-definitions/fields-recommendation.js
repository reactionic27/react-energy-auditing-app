export default [{
  name: 'Recommendation: Status',
  outputColumn: 'status',
  options: [
    [1, 'Recommend'],
    [2, 'Note'],
    [3, 'Decline'],
  ],
  description: "<p><strong>Recommend</strong> a measure to feature it in the report's upgrade details section. This measure will factor into the job's total cost, savings and SIR.</p><p><strong>Note</strong> a measure to list it in the report as 'Additional Notes'. Noted measures do not count towards the job's total cost, savings and SIR.</p><p><strong>Decline</strong> a measure to hide it altogether report. Declined measures do not count towards the job's total cost, savings and SIR.</p>"
}, {
  name: 'Recommendation: Title',
  outputColumn: 'title',
  type: "Text",
  maxLength: 255,
  affectsModeling: false,
  description: "The title will appear throughout the audit report. When appropriate, consider wording this as an actionable sentence. For instance, instead of 'Programmable Thermostat', you could write 'Program your thermostat'."
}, {
  name: 'Recommendation: Cost',
  outputColumn: 'cost',
  decimals: 2,
  type: "Numeric"
}, {
  name: 'Recommendation: Measure code',
  label: 'Measure Code',
  outputColumn: 'measure_code',
  type: "MultiSelect",
  description: "Tag this measure with a custom measure code."
}, {
  name: 'Notes to Homeowners',
  outputColumn: 'homeowner_notes',
  affectsModeling: false,
  type: "Textarea",
  description: "Add a note to the homeowner about this recommendation"
}, {
  name: 'Notes to Contractors',
  outputColumn: 'contractor_notes',
  affectsModeling: false,
  type: "Textarea",
  description: "This field is intended to communicate details with other professionals. It can be turned on or off in the report so you can chose to hide technical jargon or other information when presenting to the homeowner. "
}, {
  name: 'Why it Matters',
  outputColumn: 'why_it_matters',
  affectsModeling: false,
  type: "Textarea",
  description: "Best kept short and concise, this field is largely educational and appears in the sidebar of the recommendation."
}].map(obj => {
  obj.outputTable = 'v5_recommendations'
  obj.collectionName = 'recommendations'
  if (obj.affectsModeling !== false) {
    obj.affectsModeling = true
  }

  return obj
})
