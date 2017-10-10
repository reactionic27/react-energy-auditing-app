export default [
  {
    name: "Job First name",
    label: "First name",
    outputTable: 'jobs',
    outputColumn: "first_name",
  },
  {
    name: "Job Last name",
    outputTable: 'jobs',
    outputColumn: "last_name",
    label: "Last name",
  },
  {
    name: "Job Rent or own",
    label: "Rents or owns",
    outputTable: 'jobs',
    outputColumn: 'renter_owner',
    options: [[0, 'Renter'], [1, 'Owner']],
    description: "Does the customer own or rent this property."
  },
  {
    name: "Appointment Date & Time",
    outputTable: 'jobs',
    outputColumn: 'service_time',
  },
  {
    name: "Job Email",
    label: "Email",
    outputTable: 'jobs',
    outputColumn: 'email',
    type: "Email"
  },
  {
    name: "Job Phone",
    label: "Phone",
    outputTable: 'jobs',
    outputColumn: 'home_phone',
  },
  {
    name: "Job Address 1",
    label: "Address 1",
    outputTable: 'jobs',
    outputColumn: 'address_1',
  },
  {
    name: "Job Address 2",
    label: "Address 2",
    outputTable: 'jobs',
    outputColumn: 'address_2',
  },
  {
    name: "Job City",
    label: "City",
    placeholder: '(555) 555-5555',
    outputTable: 'jobs',
    outputColumn: 'city',
  },
  {
    name: "Job State",
    label: "State",
    outputTable: 'jobs',
    outputColumn: 'state',
    affectsModeling: true
  },
  {
    name: "Job Zip",
    label: "Zip",
    outputTable: 'jobs',
    outputColumn: 'zip',
    affectsModeling: true,
    type: "Zip"
  },
  {
    name: "Job Account id",
    label: "Account",
    outputTable: 'jobs',
    outputColumn: 'account_id',
  },
  {
    name: "Job Stage id",
    label: "Stage",
    outputTable: 'jobs',
    outputColumn: 'stage_id',
  },
  {
    name: "Job Company id",
    label: "Company",
    outputTable: 'jobs',
    outputColumn: 'company_id',
  },
  {
    name: "Job Coc additional info",
    label: "Additional Information",
    outputTable: 'jobs',
    outputColumn: 'coc_additional_info',
    maxLength: 200
  },
  {
    name: "Job Coc work performed by",
    label: "Work performed by",
    outputTable: 'jobs',
    outputColumn: 'coc_work_performed_by',
    maxLength: 44,
    type: "Text"
  },
  {
    name: "Job Coc work verified by",
    label: "Work verified by",
    outputTable: 'jobs',
    outputColumn: 'coc_work_verified_by',
    maxLength: 44,
    type: "Text"
  }
]
