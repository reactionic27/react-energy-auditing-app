export default [
  {
    name: "Bill Entry Type",
    outputTable: "v5_utilities",
    outputColumn: "bill_entry_type",
    isSelect: true,
    type: "Radio",
    description: "Choose a method of utility bill entry. Always use detailed bills if you have 13 months of meter read dates with associated fuel and electricity usage. Detailed bills will provide more accurate energy savings estimates. If you can get monthly bills that cover the primary heating and cooling season, then choose detailed bills.<br><br> Simple Bills can be used if the home has not been occupied by the current occupants for more than 13 months or you don\'t have access to detailed bills for the current occupants. You can typically get the high and low bills for gas and electric for any address by calling the utility\'s customer service number and requesting it (even without permission of the tenants at the time).",
    options: [
      {
        displayValue: "Detailed",
        omValue: "TRUE"
      },
      {
        displayValue: "Simple",
        omValue: "FALSE"
      },
      "No Bills"
    ],
  },
  {
    name: "Electric Utility Provider Name",
    outputTable: "v5_utilities",
    outputColumn: "electric_utility_provider_name",
    migrateV4Column: "electric_name",
    description: "Enter the name of the electric utility provider. This is an optional field for most users, but could be required for certain efficiency programs.",
    suffix: "abc",
    type: "Text",
    maxLength: 255
  },
  {
    name: "Electric Account Number",
    outputTable: "v5_utilities",
    outputColumn: "electric_account_number",
    description: "Enter the utility account number for the meter that these bills correspond to. This is an optional field for most users, but could be required for certain efficiency programs.",
    type: "Text",
    maxLength: 255
  },
  {
    name: "Highest monthly summer electric bill",
    outputTable: "v5_utilities",
    outputColumn: "highest_monthly_summer_electric_bill",
    description: "Enter the amount of the highest monthly summertime electricity bill for the home during the past 12 months.  Summertime is typically those months when many buildings would use air conditioning to cool the building.<br/><br/>If the home is on a budget plan where the monthly electricity bills are all the same, the highest bill can be estimated by looking for the summer month with the highest electricity usage and then multiplying that amount by the electricity rate being charged.",
    migrateV4Column: "simple_electric_high",
    suffix: "Dollars",
    type: "PositiveNumeric"
  },
  {
    name: "Lowest monthly electric bill",
    outputTable: "v5_utilities",
    outputColumn: "lowest_monthly_electric_bill",
    description: "Enter the amount of the lowest of all the monthly electricity bills for the home during the past 12 months. If the home is on a budget plan where the monthly electricity bills are all the same, the lowest bill can be estimated by looking for the month with the lowest electricity usage and then multiplying that amount by the electricity rate being charged.",
    migrateV4Column: "simple_electric_low",
    suffix: "Dollars",
    type: "PositiveNumeric"
  },
  {
    name: "Electric Bill Units",
    outputTable: "v5_utilities",
    outputColumn: "electric_bill_units",
    description: "Enter the units used for the electric bills. This is a required field if you're going to use Detailed Bills. For best results, utilize the kWh option instead of dollars for more accurate representations of the home.",
    migrateV4Column: "electric_detailed_units",
    isSelect: true,
    type: "Select",
    defaultValue: "kWh",
    options: [
      "kWh",
      "Dollars"
    ]
  },
  {
    name: "Start Electric Date 1",
    outputTable: "v5_utilities",
    outputColumn: "start_electric_date_1",
    description: "<strong>Start with the oldest bill first.</strong><br/><br/>It's very important to enter meter read dates as opposed to billing dates.<br><ul><li>If you have 13 months of utility bills, enter the meter read date of the oldest of the 13 bills. </li><li>If you only have 12 months of utility bills, look at the oldest bill. Search for a previous meter read date. Enter that here. <br/>If you can't find a previous meter read date, then search \"number of days in billing period\". Enter a date that's this number of days prior to the meter read date you're looking at.</li></ul><em>See the knowledge base for more information on entering utility bills. </em>",
    migrateV4Column: "electric_start_date",
    type: "DateField"
  },
  {
    name: "End Electric Date 1",
    outputTable: "v5_utilities",
    outputColumn: "end_electric_date_1",
    description: "<ul><li>If you only have 12 months of utility bills, enter the meter read date for <strong>the oldest bill</strong> you have.</li><li> If you have 13 months of bills, enter the meter read date and usage for the <strong>2nd oldest bill</strong>.</li><li>Then enter the energy usage from the corresponding date to the left. Be sure that this usage is for the time period between the End Bill Date to the left and the previous date in this list.</li></ul>",
    migrateV4Column: "electric_date_1",
    type: "DateField"
  },
  {
    name: "End Electric Bill 1",
    outputTable: "v5_utilities",
    outputColumn: "end_electric_bill_1",
    migrateV4Column: "electric_value_1",
    type: "PositiveNumeric"
  },
  {
    name: "End Electric Date 2",
    outputTable: "v5_utilities",
    outputColumn: "end_electric_date_2",
    description: "<ul><li>Fill out as many of these meter read dates as you have available.</li><li> This detailed input section can be used with any amount of available data.</li><li> Enter zero for missing or abnormal bills. The utility analysis will treat an entry of zero as missing and will do its best to compensate for missing bills. </li><li>To include a bill with actual zero usage, enter 0.01. </li><li>Be sure that you're entering the usage for the corresponding measurement that you designated in the Bill Units above (ie. dollars or kWh).</li></ul>",
    migrateV4Column: "electric_date_2",
    type: "DateField"
  },
  {
    name: "End Electric Bill 2",
    outputTable: "v5_utilities",
    outputColumn: "end_electric_bill_2",
    migrateV4Column: "electric_value_2",
    type: "PositiveNumeric"
  },
  {
    name: "End Electric Date 3",
    outputTable: "v5_utilities",
    outputColumn: "end_electric_date_3",
    description: "<ul><li>Fill out as many of these meter read dates as you have available.</li><li> This detailed input section can be used with any amount of available data.</li><li> Enter zero for missing or abnormal bills. The utility analysis will treat an entry of zero as missing and will do its best to compensate for missing bills. </li><li>To include a bill with actual zero usage, enter 0.01. </li><li>Be sure that you're entering the usage for the corresponding measurement that you designated in the Bill Units above (ie. dollars or kWh).</li></ul>",
    migrateV4Column: "electric_date_3",
    type: "DateField"
  },
  {
    name: "End Electric Bill 3",
    outputTable: "v5_utilities",
    outputColumn: "end_electric_bill_3",
    migrateV4Column: "electric_value_3",
    type: "PositiveNumeric"
  },
  {
    name: "End Electric Date 4",
    outputTable: "v5_utilities",
    outputColumn: "end_electric_date_4",
    description: "<ul><li>Fill out as many of these meter read dates as you have available.</li><li> This detailed input section can be used with any amount of available data.</li><li> Enter zero for missing or abnormal bills. The utility analysis will treat an entry of zero as missing and will do its best to compensate for missing bills. </li><li>To include a bill with actual zero usage, enter 0.01. </li><li>Be sure that you're entering the usage for the corresponding measurement that you designated in the Bill Units above (ie. dollars or kWh).</li></ul>",
    migrateV4Column: "electric_date_4",
    type: "DateField"
  },
  {
    name: "End Electric Bill 4",
    outputTable: "v5_utilities",
    outputColumn: "end_electric_bill_4",
    migrateV4Column: "electric_value_4",
    type: "PositiveNumeric"
  },
  {
    name: "End Electric Date 5",
    outputTable: "v5_utilities",
    outputColumn: "end_electric_date_5",
    description: "<ul><li>Fill out as many of these meter read dates as you have available.</li><li> This detailed input section can be used with any amount of available data.</li><li> Enter zero for missing or abnormal bills. The utility analysis will treat an entry of zero as missing and will do its best to compensate for missing bills. </li><li>To include a bill with actual zero usage, enter 0.01. </li><li>Be sure that you're entering the usage for the corresponding measurement that you designated in the Bill Units above (ie. dollars or kWh).</li></ul>",
    migrateV4Column: "electric_date_5",
    type: "DateField"
  },
  {
    name: "End Electric Bill 5",
    outputTable: "v5_utilities",
    outputColumn: "end_electric_bill_5",
    migrateV4Column: "electric_value_5",
    type: "PositiveNumeric"
  },
  {
    name: "End Electric Date 6",
    outputTable: "v5_utilities",
    outputColumn: "end_electric_date_6",
    description: "<ul><li>Fill out as many of these meter read dates as you have available.</li><li> This detailed input section can be used with any amount of available data.</li><li> Enter zero for missing or abnormal bills. The utility analysis will treat an entry of zero as missing and will do its best to compensate for missing bills. </li><li>To include a bill with actual zero usage, enter 0.01. </li><li>Be sure that you're entering the usage for the corresponding measurement that you designated in the Bill Units above (ie. dollars or kWh).</li></ul>",
    migrateV4Column: "electric_date_6",
    type: "DateField"
  },
  {
    name: "End Electric Bill 6",
    outputTable: "v5_utilities",
    outputColumn: "end_electric_bill_6",
    migrateV4Column: "electric_value_6",
    type: "PositiveNumeric"
  },
  {
    name: "End Electric Date 7",
    outputTable: "v5_utilities",
    outputColumn: "end_electric_date_7",
    description: "<ul><li>Fill out as many of these meter read dates as you have available.</li><li> This detailed input section can be used with any amount of available data.</li><li> Enter zero for missing or abnormal bills. The utility analysis will treat an entry of zero as missing and will do its best to compensate for missing bills. </li><li>To include a bill with actual zero usage, enter 0.01. </li><li>Be sure that you're entering the usage for the corresponding measurement that you designated in the Bill Units above (ie. dollars or kWh).</li></ul>",
    migrateV4Column: "electric_date_7",
    type: "DateField"
  },
  {
    name: "End Electric Bill 7",
    outputTable: "v5_utilities",
    outputColumn: "end_electric_bill_7",
    migrateV4Column: "electric_value_7",
    type: "PositiveNumeric"
  },
  {
    name: "End Electric Date 8",
    outputTable: "v5_utilities",
    outputColumn: "end_electric_date_8",
    description: "<ul><li>Fill out as many of these meter read dates as you have available.</li><li> This detailed input section can be used with any amount of available data.</li><li> Enter zero for missing or abnormal bills. The utility analysis will treat an entry of zero as missing and will do its best to compensate for missing bills. </li><li>To include a bill with actual zero usage, enter 0.01. </li><li>Be sure that you're entering the usage for the corresponding measurement that you designated in the Bill Units above (ie. dollars or kWh).</li></ul>",
    migrateV4Column: "electric_date_8",
    type: "DateField"
  },
  {
    name: "End Electric Bill 8",
    outputTable: "v5_utilities",
    outputColumn: "end_electric_bill_8",
    migrateV4Column: "electric_value_8",
    type: "PositiveNumeric"
  },
  {
    name: "End Electric Date 9",
    outputTable: "v5_utilities",
    outputColumn: "end_electric_date_9",
    description: "<ul><li>Fill out as many of these meter read dates as you have available.</li><li> This detailed input section can be used with any amount of available data.</li><li> Enter zero for missing or abnormal bills. The utility analysis will treat an entry of zero as missing and will do its best to compensate for missing bills. </li><li>To include a bill with actual zero usage, enter 0.01. </li><li>Be sure that you're entering the usage for the corresponding measurement that you designated in the Bill Units above (ie. dollars or kWh).</li></ul>",
    migrateV4Column: "electric_date_9",
    type: "DateField"
  },
  {
    name: "End Electric Bill 9",
    outputTable: "v5_utilities",
    outputColumn: "end_electric_bill_9",
    migrateV4Column: "electric_value_9",
    type: "PositiveNumeric"
  },
  {
    name: "End Electric Date 10",
    outputTable: "v5_utilities",
    outputColumn: "end_electric_date_10",
    description: "<ul><li>Fill out as many of these meter read dates as you have available.</li><li> This detailed input section can be used with any amount of available data.</li><li> Enter zero for missing or abnormal bills. The utility analysis will treat an entry of zero as missing and will do its best to compensate for missing bills. </li><li>To include a bill with actual zero usage, enter 0.01. </li><li>Be sure that you're entering the usage for the corresponding measurement that you designated in the Bill Units above (ie. dollars or kWh).</li></ul>",
    migrateV4Column: "electric_date_10",
    type: "DateField"
  },
  {
    name: "End Electric Bill 10",
    outputTable: "v5_utilities",
    outputColumn: "end_electric_bill_10",
    migrateV4Column: "electric_value_10",
    type: "PositiveNumeric"
  },
  {
    name: "End Electric Date 11",
    outputTable: "v5_utilities",
    outputColumn: "end_electric_date_11",
    description: "<ul><li>Fill out as many of these meter read dates as you have available.</li><li> This detailed input section can be used with any amount of available data.</li><li> Enter zero for missing or abnormal bills. The utility analysis will treat an entry of zero as missing and will do its best to compensate for missing bills. </li><li>To include a bill with actual zero usage, enter 0.01. </li><li>Be sure that you're entering the usage for the corresponding measurement that you designated in the Bill Units above (ie. dollars or kWh).</li></ul>",
    migrateV4Column: "electric_date_11",
    type: "DateField"
  },
  {
    name: "End Electric Bill 11",
    outputTable: "v5_utilities",
    outputColumn: "end_electric_bill_11",
    migrateV4Column: "electric_value_11",
    type: "PositiveNumeric"
  },
  {
    name: "End Electric Date 12",
    outputTable: "v5_utilities",
    outputColumn: "end_electric_date_12",
    description: "<ul><li>Fill out as many of these meter read dates as you have available.</li><li> This detailed input section can be used with any amount of available data.</li><li> Enter zero for missing or abnormal bills. The utility analysis will treat an entry of zero as missing and will do its best to compensate for missing bills. </li><li>To include a bill with actual zero usage, enter 0.01. </li><li>Be sure that you're entering the usage for the corresponding measurement that you designated in the Bill Units above (ie. dollars or kWh).</li></ul>",
    migrateV4Column: "electric_date_12",
    type: "DateField"
  },
  {
    name: "End Electric Bill 12",
    outputTable: "v5_utilities",
    outputColumn: "end_electric_bill_12",
    migrateV4Column: "electric_value_12",
    type: "PositiveNumeric"
  },
  {
    name: "Start Fuel Date 1",
    outputTable: "v5_utilities",
    outputColumn: "start_fuel_date_1",
    description: "<strong>Start with the oldest bill first.</strong><br/><br/>It's very important to enter meter read dates as opposed to billing dates.<br><ul><li>If you have 13 months of utility bills, enter the meter read date of the oldest of the 13 bills. </li><li>If you only have 12 months of utility bills, look at the oldest bill. Search for a previous meter read date. Enter that here. <br/>If you can't find a previous meter read date, then search \"number of days in billing period\". Enter a date that's this number of days prior to the meter read date you're looking at.</li></ul><em>See the tutorial (tutorial.snuggpro.com) for more information on entering utility bills. </em>",
    migrateV4Column: "fuel_start_date"
  },
  {
    name: "End Fuel Date 1",
    outputTable: "v5_utilities",
    outputColumn: "end_fuel_date_1",
    description: "<ul><li>If you only have 12 months of utility bills, enter the meter read date for <strong>the oldest bill</strong> you have.</li><li> If you have 13 months of bills, enter the meter read date and usage for the <strong>2nd oldest bill</strong>.</li><li>Then enter the energy usage from the corresponding date to the left. Be sure that this usage is for the time period between the End Bill Date to the left and the previous date in this list.</li></ul>",
    migrateV4Column: "fuel_date_1",
    type: "DateField"
  },
  {
    name: "End Fuel Bill 1",
    outputTable: "v5_utilities",
    outputColumn: "end_fuel_bill_1",
    migrateV4Column: "fuel_value_1",
    type: "PositiveNumeric"
  },
  {
    name: "End Fuel Date 2",
    outputTable: "v5_utilities",
    outputColumn: "end_fuel_date_2",
    description: "<ul><li>Fill out as many of these meter read dates as you have available.</li><li> This detailed input section can be used with any amount of available data.</li><li> Enter zero for missing or abnormal bills. The utility analysis will treat an entry of zero as missing and will do its best to compensate for missing bills. </li><li>To include a bill with actual zero usage, enter 0.01. </li><li>Be sure that you're entering the usage for the corresponding measurement that you designated in the Bill Units above (ie. dollars or kWh).</li></ul>",
    migrateV4Column: "fuel_date_2",
    type: "DateField"
  },
  {
    name: "End Fuel Bill 2",
    outputTable: "v5_utilities",
    outputColumn: "end_fuel_bill_2",
    migrateV4Column: "fuel_value_2",
    type: "PositiveNumeric"
  },
  {
    name: "End Fuel Date 3",
    outputTable: "v5_utilities",
    outputColumn: "end_fuel_date_3",
    description: "<ul><li>Fill out as many of these meter read dates as you have available.</li><li> This detailed input section can be used with any amount of available data.</li><li> Enter zero for missing or abnormal bills. The utility analysis will treat an entry of zero as missing and will do its best to compensate for missing bills. </li><li>To include a bill with actual zero usage, enter 0.01. </li><li>Be sure that you're entering the usage for the corresponding measurement that you designated in the Bill Units above (ie. dollars or kWh).</li></ul>",
    migrateV4Column: "fuel_date_3",
    type: "DateField"
  },
  {
    name: "End Fuel Bill 3",
    outputTable: "v5_utilities",
    outputColumn: "end_fuel_bill_3",
    migrateV4Column: "fuel_value_3",
    type: "PositiveNumeric"
  },
  {
    name: "End Fuel Date 4",
    outputTable: "v5_utilities",
    outputColumn: "end_fuel_date_4",
    description: "<ul><li>Fill out as many of these meter read dates as you have available.</li><li> This detailed input section can be used with any amount of available data.</li><li> Enter zero for missing or abnormal bills. The utility analysis will treat an entry of zero as missing and will do its best to compensate for missing bills. </li><li>To include a bill with actual zero usage, enter 0.01. </li><li>Be sure that you're entering the usage for the corresponding measurement that you designated in the Bill Units above (ie. dollars or kWh).</li></ul>",
    migrateV4Column: "fuel_date_4",
    type: "DateField"
  },
  {
    name: "End Fuel Bill 4",
    outputTable: "v5_utilities",
    outputColumn: "end_fuel_bill_4",
    migrateV4Column: "fuel_value_4",
    type: "PositiveNumeric"
  },
  {
    name: "End Fuel Date 5",
    outputTable: "v5_utilities",
    outputColumn: "end_fuel_date_5",
    description: "<ul><li>Fill out as many of these meter read dates as you have available.</li><li> This detailed input section can be used with any amount of available data.</li><li> Enter zero for missing or abnormal bills. The utility analysis will treat an entry of zero as missing and will do its best to compensate for missing bills. </li><li>To include a bill with actual zero usage, enter 0.01. </li><li>Be sure that you're entering the usage for the corresponding measurement that you designated in the Bill Units above (ie. dollars or kWh).</li></ul>",
    migrateV4Column: "fuel_date_5",
    type: "DateField"
  },
  {
    name: "End Fuel Bill 5",
    outputTable: "v5_utilities",
    outputColumn: "end_fuel_bill_5",
    migrateV4Column: "fuel_value_5",
    type: "PositiveNumeric"
  },
  {
    name: "End Fuel Date 6",
    outputTable: "v5_utilities",
    outputColumn: "end_fuel_date_6",
    description: "<ul><li>Fill out as many of these meter read dates as you have available.</li><li> This detailed input section can be used with any amount of available data.</li><li> Enter zero for missing or abnormal bills. The utility analysis will treat an entry of zero as missing and will do its best to compensate for missing bills. </li><li>To include a bill with actual zero usage, enter 0.01. </li><li>Be sure that you're entering the usage for the corresponding measurement that you designated in the Bill Units above (ie. dollars or kWh).</li></ul>",
    migrateV4Column: "fuel_date_6",
    type: "DateField"
  },
  {
    name: "End Fuel Bill 6",
    outputTable: "v5_utilities",
    outputColumn: "end_fuel_bill_6",
    migrateV4Column: "fuel_value_6",
    type: "PositiveNumeric"
  },
  {
    name: "End Fuel Date 7",
    outputTable: "v5_utilities",
    outputColumn: "end_fuel_date_7",
    description: "<ul><li>Fill out as many of these meter read dates as you have available.</li><li> This detailed input section can be used with any amount of available data.</li><li> Enter zero for missing or abnormal bills. The utility analysis will treat an entry of zero as missing and will do its best to compensate for missing bills. </li><li>To include a bill with actual zero usage, enter 0.01. </li><li>Be sure that you're entering the usage for the corresponding measurement that you designated in the Bill Units above (ie. dollars or kWh).</li></ul>",
    migrateV4Column: "fuel_date_7",
    type: "DateField"
  },
  {
    name: "End Fuel Bill 7",
    outputTable: "v5_utilities",
    outputColumn: "end_fuel_bill_7",
    migrateV4Column: "fuel_value_7",
    type: "PositiveNumeric"
  },
  {
    name: "End Fuel Date 8",
    outputTable: "v5_utilities",
    outputColumn: "end_fuel_date_8",
    description: "<ul><li>Fill out as many of these meter read dates as you have available.</li><li> This detailed input section can be used with any amount of available data.</li><li> Enter zero for missing or abnormal bills. The utility analysis will treat an entry of zero as missing and will do its best to compensate for missing bills. </li><li>To include a bill with actual zero usage, enter 0.01. </li><li>Be sure that you're entering the usage for the corresponding measurement that you designated in the Bill Units above (ie. dollars or kWh).</li></ul>",
    migrateV4Column: "fuel_date_8",
    type: "DateField"
  },
  {
    name: "End Fuel Bill 8",
    outputTable: "v5_utilities",
    outputColumn: "end_fuel_bill_8",
    migrateV4Column: "fuel_value_8",
    type: "PositiveNumeric"
  },
  {
    name: "End Fuel Date 9",
    outputTable: "v5_utilities",
    outputColumn: "end_fuel_date_9",
    description: "<ul><li>Fill out as many of these meter read dates as you have available.</li><li> This detailed input section can be used with any amount of available data.</li><li> Enter zero for missing or abnormal bills. The utility analysis will treat an entry of zero as missing and will do its best to compensate for missing bills. </li><li>To include a bill with actual zero usage, enter 0.01. </li><li>Be sure that you're entering the usage for the corresponding measurement that you designated in the Bill Units above (ie. dollars or kWh).</li></ul>",
    migrateV4Column: "fuel_date_9",
    type: "DateField"
  },
  {
    name: "End Fuel Bill 9",
    outputTable: "v5_utilities",
    outputColumn: "end_fuel_bill_9",
    migrateV4Column: "fuel_value_9",
    type: "PositiveNumeric"
  },
  {
    name: "End Fuel Date 10",
    outputTable: "v5_utilities",
    outputColumn: "end_fuel_date_10",
    description: "<ul><li>Fill out as many of these meter read dates as you have available.</li><li> This detailed input section can be used with any amount of available data.</li><li> Enter zero for missing or abnormal bills. The utility analysis will treat an entry of zero as missing and will do its best to compensate for missing bills. </li><li>To include a bill with actual zero usage, enter 0.01. </li><li>Be sure that you're entering the usage for the corresponding measurement that you designated in the Bill Units above (ie. dollars or kWh).</li></ul>",
    migrateV4Column: "fuel_date_10",
    type: "DateField"
  },
  {
    name: "End Fuel Bill 10",
    outputTable: "v5_utilities",
    outputColumn: "end_fuel_bill_10",
    migrateV4Column: "fuel_value_10",
    type: "PositiveNumeric"
  },
  {
    name: "End Fuel Date 11",
    outputTable: "v5_utilities",
    outputColumn: "end_fuel_date_11",
    description: "<ul><li>Fill out as many of these meter read dates as you have available.</li><li> This detailed input section can be used with any amount of available data.</li><li> Enter zero for missing or abnormal bills. The utility analysis will treat an entry of zero as missing and will do its best to compensate for missing bills. </li><li>To include a bill with actual zero usage, enter 0.01. </li><li>Be sure that you're entering the usage for the corresponding measurement that you designated in the Bill Units above (ie. dollars or kWh).</li></ul>",
    migrateV4Column: "fuel_date_11",
    type: "DateField"
  },
  {
    name: "End Fuel Bill 11",
    outputTable: "v5_utilities",
    outputColumn: "end_fuel_bill_11",
    migrateV4Column: "fuel_value_11",
    type: "PositiveNumeric"
  },
  {
    name: "End Fuel Date 12",
    outputTable: "v5_utilities",
    outputColumn: "end_fuel_date_12",
    description: "<ul><li>Fill out as many of these meter read dates as you have available.</li><li> This detailed input section can be used with any amount of available data.</li><li> Enter zero for missing or abnormal bills. The utility analysis will treat an entry of zero as missing and will do its best to compensate for missing bills. </li><li>To include a bill with actual zero usage, enter 0.01. </li><li>Be sure that you're entering the usage for the corresponding measurement that you designated in the Bill Units above (ie. dollars or kWh).</li></ul>",
    migrateV4Column: "fuel_date_12",
    type: "DateField"
  },
  {
    name: "End Fuel Bill 12",
    outputTable: "v5_utilities",
    outputColumn: "end_fuel_bill_12",
    migrateV4Column: "fuel_value_12",
    type: "PositiveNumeric"
  },
  {
    name: "Primary Heating Fuel Type",
    outputTable: "v5_utilities",
    outputColumn: "primary_heating_fuel_type",
    description: "This is the primary fuel source. It is used to set prices and energy content.",
    migrateV4Column: "fuel_primary_type",
    isSelect: true,
    type: "Select",
    options: [
      "",
      {
        displayValue: "Natural Gas",
        omValue: "Gas"
      },
      {
        displayValue: "Electricity",
        omValue: "Elec"
      },
      "Fuel Oil",
      "Propane",
      "Wood",
      "Pellets",
      "Solar"
    ]
  },
  {
    name: "Fuel Utility Provider Name",
    outputTable: "v5_utilities",
    outputColumn: "fuel_utility_provider_name",
    description: "Enter the name of the fuel utility provider. This is an optional field for most users, but could be required for certain efficiency programs.",
    migrateV4Column: "fuel_name",
    suffix: "abc",
    type: "Text",
    maxLength: 255
  },
  {
    name: "Fuel Account Number",
    outputTable: "v5_utilities",
    outputColumn: "fuel_account_number",
    description: "Enter the utility account number for the meter that the fuel bills correspond to. This is an optional field for most users, but could be required for certain efficiency programs.",
    suffix: "#",
    type: "Text",
    maxLength: 255
  },
  {
    name: "Highest monthly winter electric bill",
    outputTable: "v5_utilities",
    outputColumn: "highest_monthly_winter_electric_bill",
    description: "Enter the amount of the highest monthly winter electric bill for the home during the past 12 months.<br/><br/>If the home is on a budget plan where the monthly electricity bills are all the same, the highest bill can be estimated by looking for the winter month with the highest electricity usage and then multiplying that amount by the electricity rate being charged.",
    migrateV4Column: "simple_electric_winter",
    suffix: "Dollars",
    type: "PositiveNumeric"
  },
  {
    name: "Highest monthly winter natural gas bill",
    outputTable: "v5_utilities",
    outputColumn: "highest_monthly_winter_natural_gas_bill",
    description: "Enter the amount of the highest monthly winter gas bill for the home during the past 12 months.<br/><br/>If the home is on a budget plan where the monthly gas bills are all the same, the highest bill can be estimated by looking for the winter month with the highest gas usage and then multiplying that amount by the gas rate being charged. If the home is heated by more than one type of fuel, use the bill from the type which provides the heat for the largest area of the home.",
    migrateV4Column: "simple_fuel_gas_high",
    suffix: "Dollars",
    type: "PositiveNumeric"
  },
  {
    name: "Lowest monthly natural gas bill",
    outputTable: "v5_utilities",
    outputColumn: "lowest_monthly_natural_gas_bill",
    description: "This is typically in the summer time when you're only using fuel for hot water and cooking.<br/><br/> If the home uses more than one type, use the bill from the type which is used the most within the home.",
    migrateV4Column: "simple_fuel_gas_low",
    suffix: "Dollars",
    type: "PositiveNumeric"
  },
  {
    name: "Simple Fuel Units",
    outputTable: "v5_utilities",
    outputColumn: "simple_fuel_units",
    isSelect: true,
    type: "Select",
    defaultValue: "Dollars",
    options: [
      "Gallons",
      "Dollars"
    ]
  },
  {
    name: "Total %{type} Used in last 12 Months",
    outputTable: "v5_utilities",
    outputColumn: "total_simple_fuel_used_in_last_12_months",
    description: "Take a look at your delivery receipts and add up the total gallons delivered over the past 12 months. If you don't have information on the gallons, you can look at bank statements, etc. to total up how much you've spent on deliveries over the past 12 months.",
    migrateV4Column: "simple_fuel_total_12",
    type: "Numeric"
  },
  {
    name: "Fuel Bill Units",
    outputTable: "v5_utilities",
    outputColumn: "fuel_bill_units",
    description: "The units used for the fuel bills. This is a required field if you're going to use Detailed Bills. For best results, utilize the kWh option instead of dollars for more accurate representations of the home.",
    migrateV4Column: "fuel_detailed_units",
    isSelect: true,
    type: "Select",
    defaultValue: "Therms",
    options: [
      "Therms",
      "Gallons",
      "Dollars"
    ]
  }
].map(obj => {
  if (obj.affectsModeling !== false) {
    obj.affectsModeling = true
  }
  return obj
})
