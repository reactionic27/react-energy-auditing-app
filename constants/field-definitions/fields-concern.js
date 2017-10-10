export default [
  {
    name: "Summary",
    outputTable: "v5_concern",
    outputColumn: "concern_summary",
    migrateV4Column: "summary",
    collectionName: "concern",
    description: "Type a short sentence that details a concern from the homeowner. This could be regarding comfort, health and safety, energy savings, aesthetics, noise, etc. There is no right or wrong answer.",
    maxLength: 255,
    csv: "Concerns > Summary",
    affectsModeling: false,
    type: "Text"
  },
  {
    name: "Detail",
    outputTable: "v5_concern",
    outputColumn: "concern_detail",
    migrateV4Column: "detail",
    collectionName: "concern",
    description: "Type a more detailed description of this concern from the homeowner.",
    csv: "Concerns > Detail %{n}",
    affectsModeling: false,
    type: "Textarea"
  }
]
