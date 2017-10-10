export default [
  {
    name: "Program Name",
    outputTable: "programs",
    outputColumn: "name",
    description: ""
  }
].map(obj => {
  if (obj.affectsModeling !== false) {
    obj.affectsModeling = true
  }
  return obj
})
