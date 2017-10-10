export default [
  {
    name: "Company Name",
    outputColumn: "name",
    description: "Enter the depth of all installed attic or ceiling insulation. If the insulation is not evenly distributed, estimate an average depth for the area. If the insulation is evenly distributed but has different depths installed in different area, use the depth of insulation that covers the largest area. If there is no attic and instead vaulted ceilings, enter an estimate of the thickness of insulation in the vaulted cavity."
  },
  {
    name: "Company Address 1",
    label: "Address 1",
    outputColumn: 'address_1',
  },
  {
    name: "Company Address 2",
    label: "Address 2",
    outputColumn: 'address_2',
  },
  {
    name: "Company City",
    label: "City",
    outputColumn: 'city',
  },
  {
    name: "Company State",
    label: "State",
    outputColumn: 'state',
  },
  {
    name: "Company Zip",
    label: "Zip",
    outputColumn: 'zip',
  },
  {
    name: "Company Website",
    label: "Website",
    outputColumn: 'website',
  },
  {
    name: "Company Office Phone",
    label: "Office Phone",
    placeholder: '(555) 555-5555',
    outputColumn: 'phone',
  },
  {
    name: "Company Hours of operation",
    label: "Hours of operation",
    outputColumn: 'hours_of_operation'
  }
].map(f => {
  f.outputTable = 'companies'
  f.label = f.name.slice(8)
  return f
})
