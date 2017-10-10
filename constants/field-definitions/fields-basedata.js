import moment from 'moment'
const currentYear = parseInt(moment().format('YYYY'), 10)

export default [
  {
    name: "Year Built",
    outputColumn: "year_built",
    description: "Enter the year the home or building was constructed. If there was a major addition made to the home, the \"Year built\" should be entered as the year the majority of the area that is heated and air conditioned was built.",
    suffix: "#",
    examples: "1923,2003",
    min: 1800,
    max: currentYear,
    checkit: ['min:1800', `max:${currentYear}`, 'integer'],
    decimals: 0,
    omA1BaseKey: "A1YearBuilt",
    csv: "Building > Year Built",
    type: 'Year'
  },
  {
    name: "Conditioned Area",
    outputColumn: "conditioned_area",
    description: "Enter the total area of the home that is heated or air conditioned. This may be different from the typical measure of the size of the home, especially if you have a heated garage or similar area of the home that receives heating or air conditioning. Make sure to include any space of the home that has heating or air conditioning, including conditioned basements (unless you mark the next field \"Area Includes Basement\" as No). ",
    suffix: "ft²",
    examples: "850,3600",
    min: 100,
    max: 100000,
    decimals: 2,
    type: 'Numeric',
    omA1BaseKey: "A1BaseArea",
    csv: "Building > Conditioned Area"
  },
  {
    name: "Average Wall Height",
    outputColumn: "average_wall_height",
    description: "Enter the average floor to ceiling wall height (internal measurement). This is used to calculate the volume of the home as well as the wall surface area. <br><br><strong>Please note:</strong> When we calculate the volume of the house, we add an additional foot of height for the basement rim joists (if there is a basement), and an additional foot of height for every story above one (if there are any).",
    suffix: "ft",
    examples: "7.5,12",
    min: 6,
    max: 20,
    decimals: 2,
    type: 'Numeric',
    omA1BaseKey: "BaseWallHeight",
    csv: "Building > Average Wall Height"
  },
  {
    name: "House Length",
    outputColumn: "house_length",
    description: "Enter the length of the longest side of the smallest rectangle into which the home's footprint will fit. <br><br><strong>Please note:</strong> This is used only to calculate the surface area of the exterior walls, and has nothing to do with the conditioned square footage, volume, or any other calculations.<br><br>\n\nThis should give a fairly precise estimate of wall surface area in all circumstances except when the house is shaped like a U. If the home is shaped like a U, you'll need to override the total wall sqft in the Wall Details section with the additional surface area. See the knowledge base article on this for more information.",
    suffix: "ft",
    examples: "21.5,60",
    min: 10,
    max: 500,
    decimals: 1,
    type: 'Numeric',
    omA1BaseKey: "A1BaseLength",
    csv: "Building > Length"
  },
  {
    name: "House Width",
    outputColumn: "house_width",
    description: "Enter the width of the longest side of the smallest rectangle into which the home's footprint will fit. <br><br><strong>Please note:</strong> This is used only to calculate the surface area of the walls, and has nothing to do with the conditioned square footage, volume, or any other calculations. This should give a fairly precise estimate of wall surface area in all circumstances except when the house is shaped like a U.",
    suffix: "ft",
    examples: "21.5,60",
    min: 10,
    max: 500,
    decimals: 1,
    type: 'Numeric',
    omA1BaseKey: "A1BaseWidth",
    csv: "Building > Width"
  },
  {
    name: "Floors Above Grade",
    outputColumn: "floors_above_grade",
    description: "Select the number of stories for the living area of this home, not counting any basement or walkout as a story. If this home is in a multi-story, multi-family complex, report only those stories in the living area of this particular home, which could likely be less than the total number of stories of the building.",
    suffix: "#",
    examples: "1.5,4",
    min: 1,
    max: 5,
    decimals: 2,
    type: 'Numeric',
    omA1BaseKey: "A1BaseStories",
    csv: "Building > Floors Above Grade"
  },
  {
    name: "Number of Occupants",
    outputColumn: "number_of_occupants",
    description: "Enter the number of people that live full-time in the home. If there are people that live in the home only part of the year (e.g., a student away at college or an adult that travels for business a significant amount each year) then for purposes of this audit count that individual as only 1/2 (0.5) of a person.<br><br>This field directly affects human internal gains. If you don't set the bedrooms, then the occupants are used to estimate the bedrooms. Only the bedrooms field impact appliance usage levels. Occupants also impact the ASHRAE 62.2-2013 minimum ventilation.<br><br>",
    suffix: "#",
    examples: "2,3.5",
    min: 1,
    max: 100,
    decimals: 1,
    type: 'Numeric',
    omA1BaseKey: "A1BaseOccupants",
    csv: "Building > Occupant Count"
  },
  {
    name: "Type of Home",
    outputColumn: "type_of_home",
    isSelect: true,
    type: "Select",
    description: "Select the type of home that most closely resembles this home. Single-family Attached would be a duplex or a townhome with shared walls. <br><br><strong>Please note:</strong> that only multi-family units with independently metered fuel and electricity can be modeled with this software.",
    omA1BaseKey: "A1BaseBuildingType",
    options: [
      "",
      "Apartment",
      "Condominium",
      {
        displayValue: "Single Family Detached",
        omValue: "Single-family Detached"
      },
      {
        displayValue: "Single Family Attached",
        omValue: "Single-family Attached"
      },
      "Mobile Home",
      "Don't Know"
    ],
    csv: "Building > Home Type",
  },
  {
    name: "Front of Building Orientation",
    outputColumn: "front_of_building_orientation",
    isSelect: true,
    type: "Select",
    description: "Select the closest direction that the Length of the house as designated above faces (either of the opposite directions is fine). If the home is square, then choose the direction the main entry door of the home faces.",
    omA1BaseKey: "A1PlanRotation",
    options: [
      "",
      "North",
      {
        displayValue: "North East",
        omValue: "NE"
      },
      "East",
      {
        displayValue: "South East",
        omValue: "SE"
      },
      "South",
      {
        displayValue: "South West",
        omValue: "SW"
      },
      "West",
      {
        displayValue: "North West",
        omValue: "NW"
      }
    ],
    csv: "Building > Plan Rotation"
  },
  {
    name: "Tuck Under Garage",
    outputColumn: "tuck_under_garage",
    isSelect: true,
    type: "Radio",
    description: "Is there any conditioned living space over an unconditioned garage, cantilever, or frame floor that might need floor insulation? <br><br> This data is used for the \"Insulate Floors\" recommendation. For cantilevers, adjust the total sqft on the refine screen or the details section.",
    omA1BaseKey: "A1TuckUnder",
    yesNo: true,
    csv: "Building > Tuck Under Garage"
  },
  {
    name: "Garage Size",
    outputColumn: "garage_size",
    isSelect: true,
    type: "Radio",
    description: "Enter the number of cars that could fit in the the parking area of the garage. The software assumes an extra 100 sqft of storage and other space and each car takes up 200 sqft of space.<br><br>This data is used for the \"Insulate Floors\" recommendation. For cantilevers, adjust the total sqft on the refine screen or the details section.",
    omA1BaseKey: "A1TuckUnderCars",
    options: [
      {
        displayValue: "1-car",
        omValue: "1"
      },
      {
        displayValue: "2-car",
        omValue: "2"
      },
      {
        displayValue: "3-car",
        omValue: "3"
      },
      {
        displayValue: "4-car",
        omValue: "4"
      },
      {
        displayValue: "5-car",
        omValue: "5"
      }
    ],
    csv: "Building > Garage Size"
  },
  {
    name: "Programmable Thermostat Installed",
    outputColumn: "programmable_thermostat_installed",
    isSelect: true,
    type: "Radio",
    description: "Is a programmable (setback) thermostat installed in the house? If it is installed, but not used, still check this box and adjust the thermostat settings accordingly. This button determines if a cost is added to the Programmable Thermostat recommendation. If you check Yes, then no cost will be added, but the software will still recommend ideal setpoints for the home for energy savings. If you check No, then a cost will be added to the recommendation and the ideal setpoints will also be shown in the recommendation.",
    omA1BaseKey: "A1ThermostatImp",
    yesNo: true,
    csv: "Thermostat > Programmable Installed"
  },
  {
    name: "Heating Setpoint High",
    outputColumn: "heating_setpoint_high",
    hasImproved: true,
    description: "Enter the heating thermostat temperature setting (&deg;F) that is used most often when the home is occupied and used by people for normal daily activities. This is often the setting used when people are at home in the mornings before going to school or work and again when they return home from school and work in the afternoon or evening before they go to sleep for the night.<br><br>\n\n<strong>Note:</strong> The goal of this is to determine the average temperature of the home for this time period and situation (cooling or heating). If the heating system just can't keep up and never meets the setpoint on cold days or similar for the cooling system, then adjust the setpoint to closer resemble the actual temperature of the home. Since this is hard to determine, you may enter a range of temperatures for each of the setpoints separated by a dash (no spaces). For example, you can set the Low temp setpoint for heating at 60-65 and the High temp setpoint at 68-71.",
    suffix: "°F",
    examples: "65,71,63-68",
    omA1BaseKey: "A1BaseTemp1",
    omDirectSetImproved: "A1ImpTemp1",
    csv: "Thermostat > Heating Setpoint High",
    type: "Setpoint",
    improvedType: "PositiveInteger"
  },
  {
    name: "Heating Setpoint Low",
    outputColumn: "heating_setpoint_low",
    hasImproved: true,
    description: "Enter the heating thermostat temperature setting (&deg;F) that is used most often when the home is not occupied. This is often the setting used when people have left the home in the mornings to go to school or work and again when they have gone to sleep for the night.<br><br>\n\n<strong>Note:</strong> The goal of this is to determine the average temperature of the home for this time period and situation (cooling or heating). If the heating system just can't keep up and never meets the setpoint on cold days or similar for the cooling system, then adjust the setpoint to closer resemble the actual temperature of the home. Since this is hard to determine, you may enter a range of temperatures for each of the setpoints separated by a dash (no spaces). For example, you can set the Low temp setpoint for heating at 60-65 and the High temp setpoint at 68-71.",
    suffix: "°F",
    examples: "62,65,58-65",
    min: 50,
    max: 90,
    omA1BaseKey: "A1BaseTemp2",
    omDirectSetImproved: "A1ImpTemp2",
    csv: "Thermostat > Heating Setpoint Low",
    type: "Setpoint",
    improvedType: "PositiveInteger"
  },
  {
    name: "Cooling Setpoint High",
    outputColumn: "cooling_setpoint_high",
    hasImproved: true,
    description: "Enter the cooling thermostat temperature setting (&deg;F) that is used most often when the home is not occupied. This is often the setting used when people have left the home in the mornings to go to school or work and again when they have gone to sleep for the night.<br><br>\n\n<strong>Note:</strong> The goal of this is to determine the average temperature of the home for this time period and situation (cooling or heating). If the heating system just can't keep up and never meets the setpoint on cold days or similar for the cooling system, then adjust the setpoint to closer resemble the actual temperature of the home. Since this is hard to determine, you may enter a range of temperatures for each of the setpoints separated by a dash (no spaces). For example, you can set the Low temp setpoint for heating at 60-65 and the High temp setpoint at 68-71.",
    suffix: "°F",
    examples: "78,82,74-80",
    min: 50,
    max: 90,
    omA1BaseKey: "A1BaseCoolingTemp2",
    omDirectSetImproved: "ImpCoolingTemp1",
    csv: "Thermostat > Cooling Setpoint High",
    type: "Setpoint",
    improvedType: "PositiveInteger"
  },
  {
    name: "Cooling Setpoint Low",
    outputColumn: "cooling_setpoint_low",
    hasImproved: true,
    description: "Enter the cooling thermostat temperature setting (&deg;F) that is used most often when the home is occupied and used by people for normal daily activities. This is often the setting used when people are at home in the mornings before going to school or work and again when they return home from school and work in the afternoon or evening before they go to sleep for the night.<br><br>\n\n<strong>Note:</strong> The goal of this is to determine the average temperature of the home for this time period and situation (cooling or heating). If the heating system just can't keep up and never meets the setpoint on cold days or similar for the cooling system, then adjust the setpoint to closer resemble the actual temperature of the home. Since this is hard to determine, you may enter a range of temperatures for each of the setpoints separated by a dash (no spaces). For example, you can set the Low temp setpoint for heating at 60-65 and the High temp setpoint at 68-71.",
    suffix: "°F",
    examples: "70,74,70-76",
    min: 50,
    max: 90,
    omA1BaseKey: "A1BaseCoolingTemp1",
    omDirectSetImproved: "ImpCoolingTemp4",
    csv: "Thermostat > Cooling Setpoint Low",
    type: "Setpoint",
    improvedType: "PositiveInteger"
  },
  {
    name: "Total # of Light Bulbs",
    outputColumn: "total_number_of_light_bulbs",
    hasImproved: true,
    description: "Count the number of light bulbs in the home. This count assumes an average of 60 watts for each bulb. Remember to look in closets and other hidden areas for lights as well. In the Details section the Base and Improved numbers are calculated as a total of the number of bulbs for each side. ",
    suffix: "#",
    examples: "30,134",
    min: 0,
    max: 999,
    decimals: 0,
    type: "PositiveInteger",
    omDirectSetBase: "BaseLightFixtures",
    omDirectSetImproved: "ImpLightFixtures",
    csv: "Lighting > Total Bulb Count "
  },
  {
    name: "Shared Walls North",
    outputColumn: "shared_walls_north",
    description: "Enter the percent of this wall that is shared with another unit (assumed an adiabatic wall). ",
    suffix: "%",
    min: 0,
    max: 100,
    decimals: 0,
    type: "Percentage",
    omA1BaseKey: "A1NorthWallsPctShared",
    csv: "MultiFamily > % of North Walls Shared"
  },
  {
    name: "% of Ceilings Shared",
    outputColumn: "percent_of_ceilings_shared",
    description: "Select the % of heated or conditioned space (from a seperatly metered apartment or unit) above your apartment / condominium / single-family attached home? If this is a single family detached home, leave this blank or at 0.",
    suffix: "%",
    examples: "25,80",
    min: 0,
    max: 100,
    decimals: 0,
    type: "Percentage",
    omA1BaseKey: "A1BaseCeilingsPctShared",
    csv: "MultiFamily > % of Ceilings Shared"
  },
  {
    name: "% of Floors Shared",
    outputColumn: "percent_of_floors_shared",
    description: "Select the % of heated or conditioned space (from a separately metered apartment or unit) below your apartment / condominium / single-family attached home? If this is a single family detached home, leave this blank or at 0.",
    suffix: "%",
    examples: "0,60",
    min: 0,
    max: 100,
    decimals: 0,
    type: "Percentage",
    omA1BaseKey: "A1BaseFloorsPctShared",
    csv: "MultiFamily > % of Floors Shared"
  },
  {
    name: "Foundation: Basement",
    outputColumn: "foundation_basement",
    description: "Select the percentage of foundation that is <strong>basement</strong>, <strong>crawlspace</strong> or <strong>slab on grade</strong>. Total of all three foundation types cannot exceed 100%.",
    suffix: "%",
    min: 0,
    max: 100,
    decimals: 0,
    type: "Percentage",
    omA1BaseKey: "A1BaseBGArea",
    csv: "Foundation > % Basement"
  },
  {
    name: "Foundation Above Grade Height",
    outputColumn: "foundation_above_grade_height",
    description: "For the parts of the basement or crawl space that are above grade (above ground), enter the average height (in feet) of this exposed foundation for the entire perimeter of the home.",
    suffix: "ft",
    examples: "2,3.5",
    min: 0,
    max: 4,
    decimals: 1,
    type: "Numeric",
    omA1BaseKey: "A1BaseBGAboveGrade",
    csv: "Foundation > Above Grade Height"
  },
  {
    name: "Basement Wall Insulation",
    outputColumn: "basement_wall_insulation",
    isSelect: true,
    type: "Select",
    description: "Select the type of materials used, if any, on the basement walls of this home. If more than one type of material is used on the basement walls, select the type of material that is used on the most wall area of the basement. If the basement walls have insulation installed on the exterior of the walls, select the option \"Finished walls with insulation\".",
    omA1BaseKey: "A1BaseBGInsulation",
    options: [
      "",
      {
        displayValue: "None or Bare Walls",
        omValue: "None"
      },
      {
        displayValue: "Fiberglass blanket",
        omValue: "Continuous"
      },
      {
        displayValue: "Unfinished frame wall with fiberglass batts",
        omValue: "Finished and Insulated"
      },
      {
        displayValue: "Finished wall without Insulation",
        omValue: "Finished"
      },
      {
        displayValue: "Finished wall with Insulation",
        omValue: "Finished and Insulated"
      },
      "Don't Know"
    ],
    csv: "Basement > Wall Insulation Type"
  },
  {
    name: "Crawlspace Insulation",
    outputColumn: "crawlspace_insulation",
    isSelect: true,
    type: "Select",
    description: "What you type here will show up in the details page for \"Insulate Crawl Space\" on the homeowner report.",
    omA1BaseKey: "A1BaseCrawlCondition",
    options: [
      "",
      {
        displayValue: "Crawlspace has insulation installed on the exterior wall area",
        omValue: "Walls"
      },
      {
        displayValue: "Crawlspace has insulation installed under only the living space floor",
        omValue: "Floor"
      },
      {
        displayValue: "Crawlspace is uninsulated",
        omValue: "Vented"
      },
      "Don't Know"
    ],
    csv: "Crawlspace > Insulation Type"
  },
  {
    name: "Skylight Area",
    outputColumn: "skylight_area",
    description: "Enter the area of any skylights (in square feet) or roof windows that are installed in the home within the heated or air conditioned space of the home.",
    suffix: "ft²",
    min: 0,
    max: 10000,
    decimals: 2,
    type: "Numeric",
    omA1BaseKey: "A1BaseSkylights",
    csv: "Windows > Skylight Area"
  },
  {
    name: "Blower Door Reading",
    outputColumn: "blower_door_reading",
    hasImproved: true,
    description: "The baseline airflow, in cubic feet per minute, through leaks in the building when there is a pressure difference between the building and ambient of 50 Pascals. This is the result of your blower door test if you perform one. If you do not enter a number here, the software will determine an appropriate number based on the age and size of the home.<br><br>\nOn the improved side, the default recommendation is a 25% reduction in the air leakage. You may of course override this to whatever number you feel you'll be able to achieve.",
    suffix: "CFM50",
    examples: "863,2712",
    min: 0,
    max: 99999,
    checkit: [{
      // Sending blank blower door reading is fine because it will fill it in. It will
      // cause problems to send 0. A reading of 0 doesn't make sense anwyay.
      rule: (val) => +val !== 0,
      message: 'The Blower door reading cannot be 0'
    }, 'range:1:99999'],
    decimals: 2,
    type: "Numeric",
    omDirectSetBase: "BaseInfiltration",
    omDirectSetImproved: "ImpInfiltration",
    csv: "Air Leakage > Blower Door Reading"
  },
  {
    name: "Equivalent NACH",
    outputColumn: "equivalent_nach",
    hasImproved: true,
    description: "NACH is the number of times in one hour the entire volume of air inside the building leaks to the outside naturally. It is calculated from the Air Infiltration number in CFM50, the number of stories, the wind zone and type of shielding the house has.",
    suffix: "NACH",
    decimals: 2,
    type: "Numeric",
    omDirectSetBase: "BaseACH",
    omDirectSetImproved: "ImpACH",
    csv: "Air Leakage > NACH"
  },
  {
    name: "Conditioned Air Volume",
    outputColumn: "conditioned_air_volume",
    description: "The conditioned air volume is calculated from the Conditioned Area and the Average Wall Height. This is really available for informational purposes and in most cases should not be edited.",
    suffix: "ft³",
    min: 100,
    max: 1000000,
    decimals: 2,
    type: "Numeric",
    omDirectSetBase: "HouseAirVolume",
    csv: "Air Leakage > Conditioned Air Volume"
  },
  {
    name: "Effective Leakage Area",
    outputColumn: "effective_leakage_area",
    hasImproved: true,
    description: "Effective (or Equivalent) Leakage Area in square inches. This is the area of a theoretical hole (with rounded edges) in the building envelope that would produce a leakage equivalent to that produced by the actual building at 4 Pascals of pressure.",
    suffix: "in²",
    decimals: 2,
    type: "Numeric",
    omDirectSetBase: "BaseELA",
    omDirectSetImproved: "ImpELA",
    csv: "Air Leakage > Effective Leakage Area"
  },
  {
    name: "Equivalent ACH50",
    outputColumn: "equivalent_ach_50",
    hasImproved: true,
    description: "ACH50 is the number of times in one hour the entire volume of air inside the building leaks to the outside when depressurized to 50 Pascals. This number is automatically calculated based on the house volume and the Air Infiltration number in CFM50.",
    suffix: "ACH50",
    decimals: 2,
    type: "Numeric",
    omDirectSetBase: "BaseACH50",
    omDirectSetImproved: "ImpACH50",
    csv: "Air Leakage > ACH50"
  },
  {
    name: "Modeled Basement Wall Area",
    outputColumn: "modeled_basement_wall_area",
    description: "This is the total wall area along the exposed perimeter (i.e. wall area eligible for insulation improvements). Warning: Changing the wall area will not effect the model. Wall area is only used in calculating improvement costs.",
    suffix: "ft²",
    min: 0,
    max: 1000000,
    decimals: 2,
    type: "Numeric",
    omDirectSetBase: "BaseBGWallArea",
    csv: "Basement > Modeled Wall Area"
  },
  {
    name: "Basement Cavity Insulation",
    label: "Basement Wall Cavity Insulation",
    outputColumn: "basement_cavity_insulation",
    hasImproved: true,
    description: "Enter the total R-value of insulation installed (BASE) or to be installed (IMPROVED) in the framed cavity of the basement walls. If there is no framing, use Continuous Insulation below to specify insulation types such as fiberglass drape or rigid insulation.<br><br>\n\n<strong>Note:</strong><br>\nEdit Base fields in the Details section only if you're confident of the actual value that is entered. The modeling engine utilizes utility data and input form data to determine the \"effective\" values on the Base side.<br><br>\n\nEdit Improved fields in the Details section with the details of what you recommend be installed in the house. These values are only used if the item is Recommended. Default values are supplied by the modeling engine, but can be overridden.<br><br>",
    suffix: "R Value",
    min: 0,
    max: 50,
    decimals: 2,
    type: "Numeric",
    omDirectSetBase: "BaseBGInsulR",
    omDirectSetImproved: "ImpBGInsulR",
    csv: "Basement > Cavity Insulation R Value"
  },
  {
    name: "Basement Continuous Insulation",
    label: "Basement Continuous Wall Insulation",
    outputColumn: "basement_continuous_insulation",
    hasImproved: true,
    description: "Enter the total R-value of insulation installed (BASE) or to be installed (IMPROVED) in on the basement walls such as a fiberglass drape or rigid insulation. If the basement walls are framed out, then specify the R-value in the Cavity Insulation field above.<br><br>\n\n<strong>Note:</strong><br>\nEdit Base fields in the Details section only if you're confident of the actual value that is entered. The modeling engine utilizes utility data and input form data to determine the \"effective\" values on the Base side.<br><br>\n\nEdit Improved fields in the Details section with the details of what you recommend be installed in the house. These values are only used if the item is Recommended. Default values are supplied by the modeling engine, but can be overridden.<br><br>",
    suffix: "R Value",
    min: 0,
    max: 50,
    decimals: 2,
    type: "Numeric",
    omDirectSetBase: "BaseBGContInsulR",
    omDirectSetImproved: "ImpBGContInsulR",
    csv: "Basement > Continuous Insulation R Value"
  },
  {
    name: "Floor Cavity Insulation",
    outputColumn: "floor_cavity_insulation",
    hasImproved: true,
    description: "Enter the total R-value of insulation installed (BASE) or to be installed (IMPROVED) in the Floor Cavity.<br><br>\n\n<strong>Note:</strong><br>\nEdit Base fields in the Details section only if you're confident of the actual value that is entered. The modeling engine utilizes utility data and input form data to determine the \"effective\" values on the Base side.<br><br>\n\nEdit Improved fields in the Details section with the details of what you recommend be installed in the house. These values are only used if the item is Recommended. Default values are supplied by the modeling engine, but can be overridden.<br><br>",
    suffix: "R Value",
    examples: "0,19",
    min: 0,
    max: 100,
    decimals: 2,
    type: "Numeric",
    omDirectSetBase: "BaseFloorInsulR",
    omDirectSetImproved: "ImpFloorInsulR",
    csv: "Frame Floor > Cavity Insulation R Value"
  },
  {
    name: "Floor Continuous Insulation",
    outputColumn: "floor_continuous_insulation",
    hasImproved: true,
    description: "Enter the total R-value of continuous insulation installed or to be installed under the Frame Floor. Continuous insulation is any insulation like spray foam or rigid foam that is continuous and consistent in R-value across studs, joists, or any framing member.<br><br>\n\n<strong>Note:</strong><br>\nEdit Base fields in the Details section only if you're confident of the actual value that is entered. The modeling engine utilizes utility data and input form data to determine the \"effective\" values on the Base side.<br><br>\n\nEdit Improved fields in the Details section with the details of what you recommend be installed in the house. These values are only used if the item is Recommended. Default values are supplied by the modeling engine, but can be overridden.<br><br>",
    suffix: "R Value",
    examples: "5,10",
    min: 0,
    max: 100,
    decimals: 2,
    type: "Numeric",
    omDirectSetBase: "BaseFloorContInsulR",
    omDirectSetImproved: "ImpFloorContInsulR",
    csv: "Frame Floor > Continuous Insulation R Value"
  },
  {
    name: "Modeled Floor Area",
    outputColumn: "modeled_floor_area",
    description: "This field will be automatically calculated based on the data you entered in the input form for Tuck Under Garage and the associated Garage Size. This field can also be used to identify cantilevers over other unconditioned space.<br><br>\n\nEnter the area of frame floors that serve as a thermal boundary to the conditioned space, excluding those over foundation crawl spaces or basements.",
    suffix: "ft²",
    examples: "250,525",
    min: 0,
    max: 1000000,
    decimals: 2,
    type: "Numeric",
    omDirectSetBase: "BaseFloorArea",
    csv: "Frame Floor > Modeled Floor Area"
  },
  {
    name: "Shared Walls East",
    outputColumn: "shared_walls_east",
    description: "Enter the percent of this wall that is shared with another unit (assumed an adiabatic wall). ",
    suffix: "%",
    min: 0,
    max: 100,
    decimals: 0,
    type: "Percentage",
    omA1BaseKey: "A1EastWallsPctShared",
    csv: "MultiFamily > % of East Walls Shared"
  },
  {
    name: "Shared Walls South",
    outputColumn: "shared_walls_south",
    description: "Enter the percent of this wall that is shared with another unit (assumed an adiabatic wall). ",
    suffix: "%",
    min: 0,
    max: 100,
    decimals: 0,
    type: "Percentage",
    omA1BaseKey: "A1SouthWallsPctShared",
    csv: "MultiFamily > % of South Walls Shared"
  },
  {
    name: "Shared Walls West",
    outputColumn: "shared_walls_west",
    description: "Enter the percent of this wall that is shared with another unit (assumed an adiabatic wall). ",
    suffix: "%",
    min: 0,
    max: 100,
    decimals: 0,
    type: "Percentage",
    omA1BaseKey: "A1WestWallsPctShared",
    csv: "MultiFamily > % of West Walls Shared"
  },
  {
    name: "Foundation: Crawlspace",
    outputColumn: "foundation_crawlspace",
    description: "Select the percentage of foundation that is <strong>basement</strong>, <strong>crawlspace</strong> or <strong>slab on grade</strong>. Total of all three foundation types cannot exceed 100%.",
    suffix: "%",
    min: 0,
    max: 100,
    decimals: 0,
    type: "Percentage",
    omA1BaseKey: "A1BaseCrawlArea",
    csv: "Foundation > % Crawlspace"
  },
  {
    name: "Foundation: Slab",
    outputColumn: "foundation_slab",
    description: "Select the percentage of foundation that is <strong>basement</strong>, <strong>crawlspace</strong> or <strong>slab on grade</strong>. Total of all three foundation types cannot exceed 100%.",
    suffix: "%",
    examples: "20,75",
    min: 0,
    max: 100,
    decimals: 0,
    type: "Percentage",
    omA1BaseKey: "A1BaseSlabArea",
    csv: "Foundation > % Slab"
  },
  {
    name: "% CFLs or LEDs",
    outputColumn: "percent_cfls_or_leds",
    isSelect: true,
    type: "Select",
    description: "Select the percentage range that most closely represents the percentage of lamps and fixtures on the home that are fitted with compact fluorescent lights (CLFs).",
    omA1BaseKey: "A1CFLPct",
    options: [
      "",
      {
        displayValue: "0%",
        omValue: "0-0"
      },
      {
        displayValue: "1-25%",
        omValue: "1-25"
      },
      {
        displayValue: "26-50%",
        omValue: "26-50"
      },
      {
        displayValue: "51-75%",
        omValue: "51-75"
      },
      {
        displayValue: "76-99%",
        omValue: "76-99"
      },
      {
        displayValue: "100%",
        omValue: "100"
      },
      "Don't Know"
    ],
    csv: "Lighting > % CFL or LED Range"
  },
  {
    name: "Crawl Cavity Insulation",
    outputColumn: "crawl_cavity_insulation",
    hasImproved: true,
    description: "Enter the total R-value of insulation installed (BASE) or to be installed (IMPROVED) in the framed cavity of the crawlspace ceiling. This field is active only if you are treating the crawlspace as an unconditioned space.<br><br>\n\n<strong>Note:</strong><br>\nEdit Base fields in the Details section only if you're confident of the actual value that is entered. The modeling engine utilizes utility data and input form data to determine the \"effective\" values on the Base side.<br><br>\n\nEdit Improved fields in the Details section with the details of what you recommend be installed in the house. These values are only used if the item is Recommended. Default values are supplied by the modeling engine, but can be overridden.<br><br>",
    suffix: "R Value",
    min: 0,
    max: 50,
    decimals: 2,
    type: "Numeric",
    omDirectSetBase: "BaseCrawlInsulR",
    omDirectSetImproved: "ImpCrawlInsulR",
    csv: "Crawlspace > Floor Cavity Insulation R Value"
  },
  {
    name: "Crawl Wall Insulation",
    outputColumn: "crawl_wall_insulation",
    hasImproved: true,
    description: "Enter the total R-value of insulation installed (BASE) or to be installed (IMPROVED) in on the crawlspace walls such as a fiberglass drape or spray foam insulation. This field is active only if you are treating the crawlspace as a conditioned space.<br><br>\n\n<strong>Note:</strong><br>\nEdit Base fields in the Details section only if you're confident of the actual value that is entered. The modeling engine utilizes utility data and input form data to determine the \"effective\" values on the Base side.<br><br>\n\nEdit Improved fields in the Details section with the details of what you recommend be installed in the house. These values are only used if the item is Recommended. Default values are supplied by the modeling engine, but can be overridden.<br><br>\n\n",
    suffix: "R Value",
    min: 0,
    max: 50,
    decimals: 2,
    type: "Numeric",
    omDirectSetBase: "BaseCrawlContInsulR",
    omDirectSetImproved: "ImpCrawlContInsulR",
    csv: "Crawlspace > Wall Insulation R Value"
  },
  {
    name: "Modeled Crawl Wall Area",
    outputColumn: "modeled_crawl_wall_area",
    description: "This field will be automatically calculated based on the data you entered in the input form for House Length and House Width. This is the total wall area along the exposed perimeter (i.e. wall area eligible for insulation improvements).<br><br>\n\nWarning: Changing the wall area will not effect the model. Wall area is only used in calculating improvement costs.",
    suffix: "ft²",
    min: 0,
    max: 1000000,
    decimals: 2,
    type: "Numeric",
    omDirectSetBase: "BaseCrawlWallArea",
    csv: "Crawlspace > Modeled Wall Area"
  },
  {
    name: "Modeled Crawl Floor Area",
    outputColumn: "modeled_crawl_floor_area",
    description: "This field will be automatically calculated based on the data you entered in the input form for Conditioned Area, Number of Stories, and Foundation Makeup.<br><br>",
    suffix: "ft²",
    min: 0,
    max: 1000000,
    decimals: 2,
    type: "Numeric",
    omDirectSetBase: "BaseCrawlArea",
    csv: "Crawlspace > Modeled Floor Area"
  },
  {
    name: "Crawlspace Type",
    outputColumn: "crawlspace_type",
    isSelect: true,
    type: "Select",
    hasImproved: true,
    description: "Choose the type of venting and conditioning in the crawlspace. Your choice will enable or disable the Wall and Floor Cavity Insulation fields in the Crawlspace Details section depending on the appropriate situation.<br><br>\n\n<strong>Unvented - Unconditioned Crawl</strong>: This unconditioned crawlspace scenario is where the building floor above the crawl space is the thermal boundary to the home. If there were insulation, it would be applied applied to the building floor (crawlspace ceiling). This crawlspace does not have direct vents to the outside air.<br><br>\n\n<strong>Vented - Year Round</strong>: This is an unconditioned crawlspace where the building floor above the crawl space is the thermal boundary to the home. If there were insulation, it would be applied to the building floor (crawlspace ceiling). This crawlspace has direct vents to the outside air, and those vents remain open all year long.<br><br>\n\n<strong>Vented - Summer Only</strong>: This is an unconditioned crawlspace where the building floor above the crawl space is the thermal boundary to the home. If there were insulation, it would be applied to the building floor (crawlspace ceiling). This crawlspace has direct vents to the outside air, and those vents remain open only during summer months.<br><br>\n\n<strong>Conditioned Crawl</strong>: This is a conditioned crawlspace where the foundation walls and ground/slab of the crawl space are the thermal boundary. If there is insulation, it would be applied to the foundation wall and rim joists. In this scenario, there is no venting to the outside and the crawlspace floor is covered with a vapor barrier on top of the dirt floor. Building code often requires adding a jump vent to the main conditioned space in the house or ducting the furnace and/or A/C into the crawlspace as well. If the crawl does not have a jump vent or supply ducts, you will likely get a slight overestimate of energy use. The model assumes that the crawl temperature is a mixture of 20% ground temp and 80% indoor temp.\n\nNote: This field also triggers the Rim Joist options for the Crawlspace. You must set this field to Conditioned Crawl to be able to specify the insulation of the Rim Joists in the Crawlspace.",
    omDirectSetBase: "BaseCrawlCondition/value",
    omDirectSetImproved: "ImpCrawlCondition/value",
    options: [
      {
        displayValue: "Unvented - Unconditioned Crawl",
        omValue: "Floor"
      },
      {
        displayValue: "Vented - Year Round",
        omValue: "Vented"
      },
      {
        displayValue: "Vented - Summer Only",
        omValue: "Summer"
      },
      {
        displayValue: "Conditioned Crawl",
        omValue: "Wall"
      }
    ],
    csv: "Crawlspace > Type"
  },
  {
    name: "Clothes Washer Type",
    label: "Type",
    outputColumn: "clothes_washer_type",
    isSelect: true,
    type: "Select",
    hasImproved: true,
    description: "Enter the type of Clothes Washer, if any, that is installed in the house.",
    omDirectSetBase: "BaseClothesWasherType/value",
    omDirectSetImproved: "ImpClothesWasherType/value",
    options: [
      {
        displayValue: "",
        omvalue: "0.64"
      },
      {
        displayValue: "Front Load",
        omValue: "1.62"
      },
      {
        displayValue: "Top Load",
        omValue: "0.64"
      },
      {
        displayValue: "No Clothes Washer",
        omValue: "0"
      }
    ],
    improvedOptions: [
      {
        displayValue: "No Improvement",
        omValue: "100"
      },
      {
        displayValue: "Front Load",
        omValue: "1.62"
      },
      {
        displayValue: "Top Load",
        omValue: "0.64"
      },
      {
        displayValue: "No Clothes Washer",
        omValue: "0"
      }
    ],
    csv: "Clothes Washer > Type"
  },
  {
    name: "Clothes Washer Energy Star",
    label: "ENERGY STAR",
    outputColumn: "clothes_washer_energy_star",
    isSelect: true,
    type: "Radio",
    hasImproved: true,
    description: "If a Clothes Washer is installed, choose if it is an ENERGY STAR model.",
    omDirectSetBase: "BaseClothesWasherEStar",
    omDirectSetImproved: "ImpClothesWasherEStar",
    csv: "Clothes Washer > ENERGY STAR",
    options: [
      {
        displayValue: "",
        omValue: ""
      },
      {
        displayValue: "Yes",
        omValue: "True"
      },
      {
        displayValue: "No",
        omValue: "False"
      }
    ]
  },
  {
    name: "Clothes Washer Manufacturer",
    label: "Manufacturer",
    outputColumn: "clothes_washer_manufacturer",
    isSelect: true,
    type: "Select",
    hasImproved: true,
    description: "Enter the Manufacturer for the Clothes Washer.",
    omDirectSetBase: "ClothesWasherBrand",
    omDirectSetImproved: "ImpClothesWasherBrand",
    options: [
      "",
      "Unknown",
      "Amana",
      "Asko",
      "Bosch",
      "Fridgidaire",
      "GE",
      "Hotpoint",
      "LG",
      "Maytag",
      "Samsung",
      "Sears",
      "Westinghouse",
      "Whirlpool",
      "Other"
    ],
    csv: "Clothes Washer > Manufacturer"
  },
  {
    name: "Clothes Washer Model",
    label: "Model #",
    outputColumn: "clothes_washer_model",
    hasImproved: true,
    description: "Enter the Model number for the Clothes Washer.",
    omDirectSetBase: "ClothesWasherModelNum",
    omDirectSetImproved: "ImpClothesWasherModelNum",
    csv: "Clothes Washer > Model"
  },
  {
    name: "Clothes Washer MEF",
    label: "Integrated Modified Energy Factor",
    outputColumn: "clothes_washer_mef",
    hasImproved: true,
    description: "Enter the Clothes Washer's Integrated Modified Energy Factor (IMEF) if available. The higher the IMEF, the more efficient the dishwasher. Search our knowledge base for \"Appliances Product Finder\" for more information. ",
    suffix: "IMEF",
    examples: "1.3,2.4",
    min: 0,
    max: 10,
    decimals: 2,
    type: "Numeric",
    omDirectSetBase: "BaseClothesWasherMEF",
    omDirectSetImproved: "ImpClothesWasherMEF",
    csv: "Clothes Washer > Modified Energy Factor"
  },
  {
    name: "Clothes Washer Energy Usage",
    label: "Energy Usage",
    outputColumn: "clothes_washer_energy_usage",
    improvedOnly: true,
    description: "As an alternative to entering the IMEF, you may enter the rated energy consumption in kWh / year. You must also enter the rated water use in gallons per year.",
    suffix: "kWh/yr",
    examples: "55, 82",
    min: 0,
    max: 1000,
    decimals: 2,
    type: "Numeric",
    omDirectSetImproved: "ImpClothesWasherkWhIN",
    csv: "Clothes Washer > Energy Usage"
  },
  {
    name: "Clothes Washer Water Usage",
    label: "Water Usage",
    outputColumn: "clothes_washer_water_usage",
    improvedOnly: true,
    description: "As an alternative to entering the IMEF, you may enter the rated water use in gallons per year. You must also enter the rated energy consumption in kWh / year above.",
    suffix: "gallons/yr",
    examples: "2212, 3733",
    min: 0,
    max: 10000,
    decimals: 2,
    type: "Numeric",
    omDirectSetImproved: "ImpClothesWasherWaterUse",
    csv: "Clothes Washer > Water Usage"
  },
  {
    name: "Dishwasher Energy Star",
    label: "ENERGY STAR",
    outputColumn: "dishwasher_energy_star",
    isSelect: true,
    type: "Radio",
    hasImproved: true,
    description: "Choose Yes if the Dishwasher is an ENERGY STAR model.",
    omA1BaseKey: "BaseDishWasherEStar",
    omDirectSetImproved: "ImpDishWasherEStar",
    csv: "Dishwasher > ENERGY STAR",
    options: [
      {
        displayValue: "",
        omValue: ""
      },
      {
        displayValue: "Yes",
        omValue: "True"
      },
      {
        displayValue: "No",
        omValue: "False"
      }
    ]
  },
  {
    name: "Dishwasher Energy Factor",
    label: "Energy Factor",
    outputColumn: "dishwasher_energy_factor",
    hasImproved: true,
    description: "Enter the Dishwasher's Energy Factor (EF) if available. The higher the EF, the more efficient the dishwasher. Search our knowledge base for \"Appliances Product Finder\" for more information. ",
    suffix: "EF",
    examples: ".64,.89,1.3",
    min: 0,
    max: 10,
    decimals: 2,
    type: "Numeric",
    omDirectSetBase: "BaseDishWasherEF",
    omDirectSetImproved: "ImpDishWasherEF",
    csv: "Dishwasher > Energy Factor"
  },
  {
    name: "% CFL or LED",
    outputColumn: "percent_cfl_or_led",
    hasImproved: true,
    description: "Use this field to override the number of CFLs or LEDs that exist in the home before the retrofit.",
    suffix: "%",
    min: 0,
    max: 999,
    decimals: 0,
    type: "Percentage",
    omDirectSetBase: "BaseCFLPct",
    omDirectSetImproved: "ImpCFLPct",
    csv: "Lighting > % CFL or LED"
  },
  {
    name: "Wind Zone",
    outputColumn: "wind_zone",
    isSelect: true,
    type: "Select",
    description: "Select the Wind Zone from the map.\n",
    defaultValue: "2",
    omDirectSetBase: "NACHZone",
    options: [
      "1",
      "2",
      "3",
      "4"
    ],
    csv: "Air Leakage > BPI Wind Zone"
  },
  {
    name: "Shielding",
    outputColumn: "shielding",
    isSelect: true,
    type: "Select",
    description: "Shielding type used to determine NACH N-factor:<br/><br/>\n<ul>\n  <li><strong>Well-Shielded</strong> - urban areas with high buildings or sheltered areas</li>\n  <li><strong>Normal</strong> - surrounded by trees or other buildings</li>\n  <li><strong>Exposed</strong> - dwelling is not surrounded by any objects</li>\n</ul>",
    defaultValue: "Normal",
    omA1BaseKey: "NACHShielding/value",
    options: [
      {
        displayValue: "Well-Shielded",
        omValue: "1"
      },
      {
        displayValue: "Normal",
        omValue: "2"
      },
      {
        displayValue: "Exposed",
        omValue: "3"
      }
    ],
    csv: "Building > Shielding"
  },
  {
    name: "N-Factor",
    outputColumn: "n_factor",
    description: "Correlation Factor developed by Lawrence Berkeley Laboratory for the calculation of NACH.",
    decimals: 2,
    type: "Numeric",
    omDirectSetBase: "NACHNFactorCell/value",
    csv: "Air Leakage > BPI N-Factor"
  },
  {
    name: "Number of Bedrooms",
    outputColumn: "number_of_bedrooms",
    description: "2005 RESNET Standards define a bedroom as: A room or space \r70 square feet or greater, with egress window and closet, used or \rintended to be used for sleeping. A \"den\", \"library\", \"home office\" \rwith a closet, egress window, and 70 square feet or greater or other \rsimilar rooms shall count as a bedroom, but living rooms and foyers shall not.",
    suffix: "#",
    examples: "2,5",
    min: 1,
    max: 100,
    decimals: 1,
    type: "Numeric",
    omA1BaseKey: "BaseBedrooms",
    csv: "Building > Bedroom Count"
  },
  {
    name: "Dishwasher Model",
    label: "Model #",
    outputColumn: "dishwasher_model",
    hasImproved: true,
    description: "Enter the Model number for the Dishwasher.",
    omDirectSetBase: "DishWasherModelNum",
    omDirectSetImproved: "ImpDishwasherModelNum",
    csv: "Dishwasher > Model"
  },
  {
    name: "Dishwasher Manufacturer",
    label: "Manufacturer",
    outputColumn: "dishwasher_manufacturer",
    isSelect: true,
    type: "Select",
    hasImproved: true,
    description: "Enter the Manufacturer of the Dishwasher.",
    omDirectSetBase: "DishWasherBrand",
    omDirectSetImproved: "ImpDishwasherBrand",
    options: [
      "",
      "Unknown",
      "Amana",
      "Asko",
      "Bosch",
      "Fridgidaire",
      "GE",
      "Hotpoint",
      "KitchenAid",
      "LG",
      "Maytag",
      "Samsung",
      "Sears",
      "Thermador",
      "Whirlpool",
      "Other"
    ],
    csv: "Dishwasher > Manufacturer"
  },
  {
    name: "Dishwasher Model Year",
    label: "Model Year",
    outputColumn: "dishwasher_model_year",
    hasImproved: true,
    description: "Enter the Model Year of the Dishwasher.",
    examples: "1998,2014",
    min: 1900,
    max: 2030,
    decimals: 0,
    type: "Year",
    omDirectSetBase: "DishWasherMfgDate",
    omDirectSetImproved: "ImpDishwasherYear",
    csv: "Dishwasher > Model Year"
  },
  {
    name: "Clothes Washer Model Year",
    label: "Model Year",
    outputColumn: "clothes_washer_model_year",
    hasImproved: true,
    description: "Enter the Model Year of the Clothes Washer.",
    examples: "1998,2015",
    min: 1900,
    max: 2030,
    decimals: 0,
    type: "Year",
    omDirectSetBase: "ClothesWasherMfgDate",
    omDirectSetImproved: "ImpClothesWasherYear",
    csv: "Clothes Washer > Model Year"
  },
  {
    name: "# of Incandescents",
    outputColumn: "number_of_incandescents",
    hasImproved: true,
    description: "This field displays the number of Incandescents that exist in the home before the retrofit. It is calculated based on the number of CFLs or LEDs and the Total # of Light Fixtures.",
    suffix: "#",
    min: 0,
    max: 999,
    decimals: 0,
    type: "PositiveInteger",
    omDirectSetBase: "BaseLights",
    omDirectSetImproved: "ImpLights",
    csv: "Lighting > Incandescent Count"
  },
  {
    name: "# of CFLs installed",
    outputColumn: "number_of_cfls_installed",
    description: "Use this field to override the number of LEDs that exist in the home before (Base) or after (Improved) the retrofit.",
    suffix: "#",
    min: 0,
    max: 999,
    decimals: 0,
    type: "PositiveInteger"
  },
  {
    name: "# of CFLs or LEDs",
    label: "# of CFLs",
    outputColumn: "number_of_cfls_or_leds",
    hasImproved: true,
    description: "Use this field to override the number of CFLs that exist in the home before (Base) or after (Improved) the retrofit.",
    suffix: "#",
    min: 0,
    max: 999,
    decimals: 0,
    type: "PositiveInteger",
    omDirectSetBase: "BaseCFL",
    omDirectSetImproved: "ImpCFL",
    csv: "Lighting > CFL Count"
  },
  {
    name: "Hot Tub",
    outputColumn: "hot_tub",
    isSelect: true,
    type: "Radio",
    description: "Does this house have an electrically heated hot tub? If yes, 2,040 kWh/yr of electricity consumption is added to the baseload.",
    omA1BaseKey: "A1BaseHotTub",
    yesNo: true,
    csv: "Hot Tub > Existing"
  },
  {
    name: "Pool",
    outputColumn: "pool",
    isSelect: true,
    type: "Radio",
    description: "Does the home have a pool?",
    omA1BaseKey: "A1BasePool",
    yesNo: true,
    csv: "Pool > Existing"
  },
  {
    name: "Pool Pump Type",
    label: "Pump Type",
    outputColumn: "pool_pump_type",
    isSelect: true,
    type: "Select",
    hasImproved: true,
    description: "Select the Pump Type from Single Speed, Two Speed, or Variable Speed (or No Improvement or None). Enter the HP (or leave blank for the default) for a Single Speed or Two Speed pump, or Turnover for a variable speed pump. Wattage of variable speed pumps depends on the speed the pump is running, and the speed will depend on the turnover, so electrical usage is determined by turnover (number of times all the water in the pool circulates through the filter in a day). The Variable Speed Pump analysis includes an optimization routine that calculates the minimal electrical usage for a variable speed pump for the selected turnover. Therefore proper setup of the pump is required to achieve these results.",
    omA1BaseKey: "BasePoolPumpType/value",
    omDirectSetImproved: "ImpPoolPumpType/value",
    options: [
      "",
      {
        displayValue: "Single Speed",
        omValue: "2"
      },
      {
        displayValue: "Two Speed",
        omValue: "3"
      },
      {
        displayValue: "Variable Speed",
        omValue: "4"
      },
      {
        displayValue: "No Pool Pump",
        omValue: "5"
      }
    ],
    csv: "Pool > Pump Type"
  },
  {
    name: "Pool Pump Horsepower",
    label: "Pump Horsepower",
    outputColumn: "pool_pump_horsepower",
    isSelect: true,
    type: "Select",
    hasImproved: true,
    description: "Select the Horsepower for this Pool Pump. Only necessary for Single-Speed or Two-Speed pumps.",
    omA1BaseKey: "BasePoolPumpHP/value",
    omDirectSetImproved: "ImpPoolPumpHP/value",
    options: [
      "",
      "0.5",
      "0.75",
      "1",
      "1.5",
      "2",
      "3"
    ],
    csv: "Pool > Pump Horsepower"
  },
  {
    name: "Basement Heating",
    outputColumn: "basement_heating",
    isSelect: true,
    type: "Select",
    hasImproved: true,
    description: "Please describe the heating situation in the basement.<br><br>\n\n<strong>Intentional:</strong><br>\n<ul>\n\t<li>Basement receives heat in the same manner as the rest of the house.</li>\n</ul>\r<strong>Intentional w/ continuous circulation:</strong><br>\r<ul>\n\t<li>Basement air is continuously exchanged with upper floors, equalizing temperatures.</li>\n</ul>\r<strong>Incidental-Desired (e.g. leaky ducts):</strong><br>\r<ul>\n\t<li>Basement is semi-conditioned by presence of HVAC equipment.</li>\n\t<li>Semi-conditioning is desired and measures will not be taken to eliminate it.</li>\r\t<li>Thermal boundary for model will be located at basement walls and floor.</li>\r</ul>\r<strong>None or Undesired Incidental:</strong><br>\r<ul>\n\t<li>Basement is not intentionally conditioned.</li>\n\t<li>Incidental conditioning is undesired and considered wasted energy.</li>\t<li>Thermal boundary for model will be the building floor above the basement.</li>\n</ul>",
    defaultValue: "Intentional",
    omA1BaseKey: "BaseBGHeating/value",
    omDirectSetImproved: "ImpBGHeating",
    options: [
      {
        displayValue: "Intentional",
        omValue: "1"
      },
      {
        displayValue: "Intentional w/ continuous circulation",
        omValue: "2"
      },
      {
        displayValue: "Incidental-Desired (e.g. leaky ducts)",
        omValue: "3"
      },
      {
        displayValue: "None or Undesired Incidental",
        omValue: "4"
      }
    ],
    csv: "Basement > Conditioning for Heating"
  },
  {
    name: "Basement Cooling",
    outputColumn: "basement_cooling",
    isSelect: true,
    type: "Select",
    hasImproved: true,
    description: "Please describe the cooling situation in the basement.<br><br>\n\n<strong>Intentional:</strong><br>\n<ul>\n\t<li>Basement receives cooling in the same manner as the rest of the house.</li>\n</ul>\r<strong>Intentional w/ continuous circulation:</strong><br>\r<ul>\n\t<li>Basement air is continuously exchanged with upper floors, equalizing temperatures.</li>\n</ul>\r<strong>Incidental-Desired (e.g. leaky ducts):</strong><br>\r<ul>\n\t<li>Basement is semi-conditioned by presence of HVAC equipment.</li>\n\t<li>Semi-conditioning is desired and measures will not be taken to eliminate it.</li>\r\t<li>Thermal boundary for model will be located at basement walls and floor.</li>\r</ul>\r<strong>None or Undesired Incidental:</strong><br>\r<ul>\n\t<li>Basement is not intentionally conditioned.</li>\n\t<li>Incidental conditioning is undesired and considered wasted energy.</li>\t<li>Thermal boundary for model will be the building floor above the basement.</li>\n</ul>\n\n<strong>Note:</strong> If you choose \"None or Undesired Incidental\", then be sure to NOT include the basement square footage in the conditioned area of the home under the Building inputs.",
    defaultValue: "Intentional",
    omA1BaseKey: "BaseBGCooling/value",
    omDirectSetImproved: "ImpBGCooling",
    options: [
      {
        displayValue: "Intentional",
        omValue: "1"
      },
      {
        displayValue: "Intentional w/ continuous circulation",
        omValue: "2"
      },
      {
        displayValue: "Incidental-Desired (e.g. leaky ducts)",
        omValue: "3"
      },
      {
        displayValue: "None or Undesired Incidental",
        omValue: "4"
      }
    ],
    csv: "Basement > Conditioning for Cooling"
  },
  {
    name: "Pool Size",
    label: "Size",
    outputColumn: "pool_size",
    description: "Pool water volume in gallons.",
    suffix: "Gallons",
    min: 100,
    max: 1000000,
    decimals: 0,
    type: "PositiveInteger",
    omDirectSetBase: "PoolSize",
    csv: "Pool > Size"
  },
  {
    name: "Pool Pump Turnover",
    label: "Variable Speed Turnover",
    outputColumn: "pool_pump_turnover",
    hasImproved: true,
    description: "Number of times all the water in the pool circulates through the filter in a day. Must be used to set variable speed pump usage. It is ignored for all other pump types.",
    suffix: "#",
    min: 0.5,
    max: 24,
    decimals: 1,
    type: "Numeric",
    omDirectSetBase: "BasePoolVariableTurnover",
    omDirectSetImproved: "ImpPoolVariableTurnover",
    csv: "Pool > Pump Turnover"
  },
  {
    name: "Pool Pump Hours",
    label: "Pump Daily Frequency",
    outputColumn: "pool_pump_hours",
    hasImproved: true,
    description: "Number of hours the pump runs per day. This is only applicable to single speed and two speed pumps. It can be ignored for all other pump types.",
    suffix: "Hours/Day",
    min: 0,
    max: 24,
    decimals: 1,
    type: "Numeric",
    omDirectSetBase: "BasePoolPumpHours",
    omDirectSetImproved: "ImpPoolPumpHours",
    csv: "Pool > Pump Hours"
  },
  {
    name: "Pool Pump Manufacturer",
    label: "Pump Manufacturer",
    outputColumn: "pool_pump_manufacturer",
    isSelect: true,
    type: "Select",
    hasImproved: true,
    description: "Enter the Manufacturer of the Pool Pump.",
    omDirectSetBase: "BasePoolPumpManufacturer",
    omDirectSetImproved: "ImpPoolPumpManufacturer",
    options: [
      "",
      "Pentair",
      "Other"
    ],
    csv: "Pool > Pump Manufacturer"
  },
  {
    name: "Pool Pump Model",
    label: "Pump Model",
    outputColumn: "pool_pump_model",
    hasImproved: true,
    description: "Enter the model number of the Pool Pump.",
    omDirectSetBase: "BasePoolPumpModel",
    omDirectSetImproved: "ImpPoolPumpModel",
    csv: "Pool > Pump Model"
  },
  {
    name: "Pool Pump Days Per Year",
    label: "Pump Annual Frequency",
    outputColumn: "pool_pump_days_per_year",
    hasImproved: true,
    description: "Number of days the pool is used per year.",
    suffix: "Days/Year",
    min: 0,
    max: 365,
    decimals: 0,
    type: "PositiveInteger",
    omDirectSetBase: "BasePoolDaysPerYear",
    omDirectSetImproved: "ImpPoolDaysPerYear",
    csv: "Pool > Pump Days Per Year"
  },
  {
    name: "Dishwasher Installed?",
    outputColumn: "dishwasher_installed",
    type: "Radio",
    isSelect: true,
    hasImproved: true,
    description: "Choose Yes if an automatic dishwasher is installed in the home.",
    omA1BaseKey: "BaseDishWasherType/value",
    omDirectSetImproved: "ImpDishWasherType/value",
    options: [
      {
        displayValue: "Yes",
        omValue: "0.43"
      },
      {
        displayValue: "No",
        omValue: "0"
      }
    ],
    improvedOptions: [
      {
        displayValue: "No Improvement",
        omValue: "100"
      },
      {
        displayValue: "Yes",
        omValue: "0.6"
      },
      {
        displayValue: "No",
        omValue: "0"
      }
    ],
    csv: "Dishwasher > Has Dishwasher"
  },
  {
    name: "Modeled Basement Floor Area",
    outputColumn: "modeled_basement_floor_area",
    description: "This field will be automatically calculated based on the data you entered in the input form for Conditioned Area, Number of Stories, and Foundation Makeup.<br><br>\n",
    suffix: "ft²",
    min: 0,
    max: 1000000,
    decimals: 2,
    type: "Numeric",
    omDirectSetBase: "BaseBGArea",
    csv: "Basement > Modeled Floor Area"
  },
  {
    name: "Modeled Basement Perimeter",
    outputColumn: "modeled_basement_perimeter",
    description: "This field will be automatically calculated based on the data you entered in the input form for House Length and House Width.<br><br>\n",
    suffix: "ft",
    min: 0,
    max: 780,
    decimals: 2,
    type: "Numeric",
    omDirectSetBase: "BaseBGPerimeter",
    csv: "Basement > Modeled Perimeter"
  },
  {
    name: "Includes Basement",
    outputColumn: "includes_basement",
    isSelect: true,
    type: "Radio",
    description: "Mark this as Yes if the conditioned area above includes the basement area.",
    omA1BaseKey: "A1IncludeBasement",
    yesNo: true,
    csv: "Building > Area Includes Basement"
  },
  {
    name: "Utility Price: Natural Gas",
    outputColumn: "utility_price_natural_gas",
    description: "Enter a your own price for Natural Gas to override the software's existing regional defaults from the EIA.",
    suffix: "$/Therm",
    examples: "0.82,1.31",
    min: 0,
    max: 5000,
    decimals: 2,
    type: "Numeric",
    omDirectSetBase: "CostGasTherm",
    csv: "Utility Price > Natural Gas"
  },
  {
    name: "Utility Price: Propane",
    outputColumn: "utility_price_propane",
    description: "Enter a your own price for Propane to override the software's existing regional defaults from the EIA.",
    suffix: "$/Gallon",
    examples: "1.54,3.65",
    min: 0,
    max: 5000,
    decimals: 2,
    type: "Numeric",
    omDirectSetBase: "CostPropaneTherm/controlvalue",
    csv: "Utility Price > Propane"
  },
  {
    name: "Utility Price: Fuel Oil",
    outputColumn: "utility_price_fuel_oil",
    description: "Enter a your own price for Fuel Oil to override the software's existing regional defaults from the EIA.",
    suffix: "$/Gallon",
    examples: "2.32,4.25",
    min: 0,
    max: 5000,
    decimals: 2,
    type: "Numeric",
    omDirectSetBase: "CostFuelOilTherm/controlvalue",
    csv: "Utility Price > Fuel Oil"
  },
  {
    name: "Utility Price: Electricity",
    outputColumn: "utility_price_electricity",
    description: "Enter a your own price for Electricity to override the software's existing regional defaults from the EIA.",
    suffix: "$/kWh",
    examples: "0.09,0.15",
    min: 0,
    max: 5000,
    decimals: 2,
    type: "Numeric",
    omDirectSetBase: "CostEleckWh",
    csv: "Utility Price > Electricity"
  },
  {
    name: "Heating Design Load",
    outputColumn: "heating_design_load",
    hasImproved: true,
    suffix: "Btu/hr",
    decimals: 0,
    type: "Integer",
    omDirectSetBase: "BaseHeatDesignLoad",
    omDirectSetImproved: "ProposedHeatDesignLoad",
    csv: "Metrics > Heating Design Load"
  },
  {
    name: "Cooling Sensible Design Load",
    outputColumn: "cooling_sensible_design_load",
    hasImproved: true,
    suffix: "Btu/hr",
    decimals: 0,
    omDirectSetBase: "BaseCoolSensibleDesignLoadNoFormat/value",
    omDirectSetImproved: "ProposedCoolSensibleDesignLoadNoFormat/value",
    csv: "Metrics > Cooling Sensible Design Load"
  },
  {
    name: "Cooling Latent Design Load",
    outputColumn: "cooling_latent_design_load",
    hasImproved: true,
    suffix: "Btu/hr",
    decimals: 0,
    omDirectSetBase: "BaseCoolLatentDesignLoadNoFormat/value",
    omDirectSetImproved: "ProposedCoolLatentDesignLoadNoFormat/value",
    csv: "Metrics > Cooling Latent Design Load"
  },
  {
    name: "Design Temp: Winter Outdoor",
    outputColumn: "design_temp_winter_outdoor",
    suffix: "ºF",
    decimals: 0,
    omDirectSetBase: "BaseHeatDesignTemp",
    csv: "Metrics > Winter Outdoor Design Temp"
  },
  {
    name: "Design Temp: Summer Outdoor",
    outputColumn: "design_temp_summer_outdoor",
    suffix: "ºF",
    decimals: 0,
    omDirectSetBase: "BaseCoolDesignTemp",
    csv: "Metrics > Summer Outdoor Design Temp"
  },
  {
    name: "Design Temp: Winter Indoor",
    outputColumn: "design_temp_winter_indoor",
    suffix: "ºF",
    decimals: 0,
    omDirectSetBase: "HeatIndoorDesignTemp",
    csv: "Metrics > Winter Indoor Design Temp"
  },
  {
    name: "Design Temp: Summer Indoor",
    outputColumn: "design_temp_summer_indoor",
    suffix: "ºF",
    decimals: 0,
    omDirectSetBase: "CoolIndoorDesignTemp",
    csv: "Metrics > Summer Indoor Design Temp"
  },
  {
    name: "Utility Price: Wood",
    outputColumn: "utility_price_wood",
    description: "Enter a your own price for wood. We do not have default costs for wood, therefore this must be filled out unless the wood supply is free.",
    suffix: "$/cord",
    examples: "0.09,0.15",
    min: 0,
    max: 5000,
    decimals: 2,
    type: "Numeric",
    omDirectSetBase: "CostWoodTherm/controlvalue",
    csv: "Utility Price > Wood"
  },
  {
    name: "Utility Price: Pellets",
    outputColumn: "utility_price_pellets",
    description: "Enter a your own price for wood pellets. We do not have default costs for wood pellets, therefore this must be filled out if pellets are chosen in the heating system fuel options.",
    suffix: "$/Ton",
    examples: "0.09,0.15",
    min: 0,
    max: 5000,
    decimals: 2,
    type: "Numeric",
    omDirectSetBase: "CostPelletsTherm/controlvalue",
    csv: "Utility Price > Pellets"
  },
  {
    name: "Number of Units",
    outputColumn: "number_of_units",
    description: "If this unit is part of a multi-family building, enter the total number of units in the building.",
    suffix: "#",
    examples: "4,25",
    min: 1,
    max: 1000,
    decimals: 1,
    type: "Numeric",
    omA1BaseKey: "BaseBuildingUnits",
    csv: "Multi-Family > Number of Units In Building"
  },
  {
    name: "# of LEDs",
    outputColumn: "number_of_leds",
    hasImproved: true,
    description: "Use this field to override the number of LEDs that exist in the home before (Base) or after (Improved) the retrofit.",
    suffix: "#",
    min: 0,
    max: 999,
    decimals: 0,
    type: "PositiveInteger",
    omDirectSetBase: "BaseLED",
    omDirectSetImproved: "ImpLED",
    csv: "Lighting > LED Count"
  },
  {
    name: "Crawlspace Rim Joist Length",
    outputColumn: "crawlspace_rim_joist_length",
    description: "This field will be automatically calculated based on the data you entered in the input form for House Length and House Width. This is the total length of the exposed perimeter of the rim joist for the crawlspace.<br><br>\n\n<strong>Note</strong>: This field is always displayed, regardless if the Rim Joist is actually insulated in the Crawlspace. In order for the Rim Joist to be counted in the modeling and be designated in the HPXML output, the Crawlspace Type must be set as Conditioned Crawl. Otherwise, the Rim Joist is counted as part of the Frame Floor (the crawlspace ceiling). ",
    suffix: "ft",
    min: 0,
    max: 1000000,
    decimals: 2,
    type: "Numeric",
    omDirectSetBase: "BaseCrawlRJLength",
    csv: "Crawlspace > Rim Joist Length"
  },
  {
    name: "Crawlspace Rim Joist Treatment",
    outputColumn: "crawlspace_rim_joist_treatment",
    isSelect: true,
    type: "Select",
    hasImproved: true,
    description: "Choose whether or not the Rim Joist is treated in the same was as the Crawlspace Wall or separately.<br><br>\n\n<strong>Note</strong>: This field is triggered by the Crawlspace Type. In order for the Rim Joist to be counted in the modeling and be designated in the HPXML output, the Crawlspace Type must be set as Conditioned Crawl. Otherwise, the Rim Joist is counted as part of the Frame Floor (the crawlspace ceiling). ",
    defaultValue: "Same as Crawl Wall",
    omDirectSetBase: "BaseCrawlRJTreat/value",
    omDirectSetImproved: "ImpCrawlRJTreat/value",
    options: [
      {
        displayValue: "Same as Crawl Wall",
        omValue: "0"
      },
      {
        displayValue: "Separately",
        omValue: "1"
      }
    ],
    csv: "Crawlspace > Rim Joist Treatment"
  },
  {
    name: "Crawlspace Rim Joist Insulation",
    outputColumn: "crawlspace_rim_joist_insulation",
    hasImproved: true,
    description: "Enter the R-value of the insulation for the Base or Improved Rim Joist in the Crawlspace.<br><br>\n\n<strong>Note</strong>: This field is triggered by the Crawlspace Type. In order for the Rim Joist to be counted in the modeling and be designated in the HPXML output, the Crawlspace Type must be set as Conditioned Crawl. Otherwise, the Rim Joist is counted as part of the Frame Floor (the crawlspace ceiling). ",
    suffix: "R Value",
    min: 0,
    max: 100,
    decimals: 0,
    type: "PositiveInteger",
    omDirectSetBase: "BaseCrawlRJInsulR",
    omDirectSetImproved: "ImpCrawlRJInsulR",
    csv: "Crawlspace > Rim Joist Insulation R Value"
  },
  {
    name: "Basement Rim Joist Length",
    outputColumn: "basement_rim_joist_length",
    description: "This field will be automatically calculated based on the data you entered in the input form for House Length and House Width. This is the total length of the exposed perimeter of the rim joist for the crawlspace.<br><br>",
    suffix: "ft",
    min: 0,
    max: 1000000,
    decimals: 2,
    type: "Numeric",
    omDirectSetBase: "BaseBsmtRJLength",
    csv: "Basement > Rim Joist Length"
  },
  {
    name: "Basement Rim Joist Treatment",
    outputColumn: "basement_rim_joist_treatment",
    isSelect: true,
    type: "Select",
    hasImproved: true,
    description: "Choose whether or not the Rim Joist is treated in the same way as the Basement Wall or separately.",
    defaultValue: "Same as Basement Wall",
    omDirectSetBase: "BaseBsmtRJTreat/value",
    omDirectSetImproved: "ImpBsmtRJTreat/value",
    options: [
      {
        displayValue: "Same as Basement Wall",
        omValue: "0"
      },
      {
        displayValue: "Separately",
        omValue: "1"
      }
    ],
    csv: "Basement > Rim Joist Treatment"
  },
  {
    name: "Basement Rim Joist Insulation",
    outputColumn: "basement_rim_joist_insulation",
    hasImproved: true,
    description: "Enter the R-value of the insulation for the Base or Improved Rim Joist in the Crawlspace.",
    suffix: "R Value",
    min: 0,
    max: 100,
    decimals: 0,
    type: "PositiveInteger",
    omDirectSetBase: "BaseBsmtRJInsulR",
    omDirectSetImproved: "ImpBsmtRJInsulR",
    csv: "Basement > Rim Joist Insulation R Value"
  },
  {
    name: "Demand kW",
    outputColumn: "demand_k_w",
    hasImproved: true,
    decimals: 3,
    type: "Numeric",
    omDirectSetBase: "BaseCADemandkW",
    omDirectSetImproved: "ImpCADemandkW",
    csv: "CA Only > Demand kW"
  },
  {
    name: "Demand kW Savings",
    outputColumn: "demand_k_w_savings",
    decimals: 3,
    omDirectSetBase: "CADemandkWSavings",
    csv: "CA Only > Demand kW Savings"
  },
  {
    name: "CAZ Max Ambient CO",
    label: "Max Ambient CO",
    outputColumn: "caz_max_ambient_co",
    description: "Ambient Carbon Monoxide in Parts Per Million. Monitored throughout assessment, not just appliance testing",
    suffix: "PPM",
    decimals: 0,
    type: "Numeric",
    hasImproved: true,
    csv: "CAZ > Max Ambient CO"
  },
  {
    name: "ASHRAE 62.2",
    label: "ASHRAE 62.2-2013 ?",
    outputColumn: "ashrae_62_2",
    isSelect: true,
    type: "Radio",
    description: "Mark this as Yes if wish to turn on controls for the ASHRAE 62.2 ventilation standard.",
    omDirectSetBase: "ImpMinVentFlowMethod/value",
    options: [
      "",
      {
        displayValue: "Yes",
        omValue: "1"
      },
      {
        displayValue: "No",
        omValue: "2"
      }
    ],
    csv: "ASHRAE > 62.2"
  },
  {
    name: "ASHRAE Kitchen Fan CFM",
    label: "Kitchen Fan",
    outputColumn: "ashrae_kitchen_fan_cfm",
    hasImproved: true,
    description: "Enter the CFM rating of the kitchen ventilation fan.",
    suffix: "CFM",
    min: 0,
    max: 999,
    decimals: 0,
    type: "PositiveInteger",
    omDirectSetBase: "BaseKitchenFanCFM",
    omDirectSetImproved: "ImpKitchenFanCFM",
    csv: "ASHRAE > Kitchen Fan CFM"
  },
  {
    name: "ASHRAE Kitchen Window",
    label: "Operable Kitchen Window?",
    outputColumn: "ashrae_kitchen_window",
    isSelect: true,
    type: "Radio",
    hasImproved: true,
    description: "If there is an operable window in the Kitchen, then choose yes.",
    omDirectSetBase: "BaseKitchenWindow",
    omDirectSetImproved: "ImpKitchenWindow",
    options: [
      {
        displayValue: "",
        omValue: "-"
      },
      "Yes",
      "No"
    ],
    csv: "ASHRAE > Kitchen Window"
  },
  {
    name: "ASHRAE Number of Bathrooms",
    outputColumn: "ashrae_number_of_bathrooms",
    description: "Enter the number of bathrooms with ventilation fans.",
    isSelect: true,
    omDirectSetBase: "BaseBathrooms",
    options: [
      "",
      "1",
      "2",
      "3",
      "4"
    ],
    csv: "ASHRAE > Number of Bathrooms"
  },
  {
    name: "ASHRAE Bathroom Fan 1 CFM",
    label: "Bathroom Fan 1",
    outputColumn: "ashrae_bathroom_fan_1_cfm",
    hasImproved: true,
    description: "Enter the CFM rating of the bathroom ventilation fan.",
    suffix: "CFM",
    min: 0,
    max: 999,
    decimals: 0,
    type: "PositiveInteger",
    omDirectSetBase: "BaseBathroomFanCFM",
    omDirectSetImproved: "ImpBathroomFanCFM",
    csv: "ASHRAE > Bathroom Fan 1 CFM"
  },
  {
    name: "ASHRAE Bathroom 1 Window",
    label: "Operable Window in Bathroom 1?",
    outputColumn: "ashrae_bathroom_1_window",
    isSelect: true,
    type: "Radio",
    hasImproved: true,
    description: "If there is an operable window in this bathroom, then choose yes.",
    omDirectSetBase: "BaseBathroomWindow",
    omDirectSetImproved: "ImpBathroomWindow",
    options: [
      {
        displayValue: "",
        omValue: "-"
      },
      "Yes",
      "No"
    ],
    csv: "ASHRAE > Bathroom 1 Window"
  },
  {
    name: "ASHRAE Bathroom Fan 2 CFM",
    label: "Bathroom Fan 2",
    outputColumn: "ashrae_bathroom_fan_2_cfm",
    hasImproved: true,
    description: "Enter the CFM rating of the bathroom ventilation fan.",
    suffix: "CFM",
    min: 0,
    max: 999,
    decimals: 0,
    type: "PositiveInteger",
    omDirectSetBase: "BaseBathroomFanCFM2",
    omDirectSetImproved: "ImpBathroomFanCFM2",
    csv: "ASHRAE > Bathroom Fan 2 CFM"
  },
  {
    name: "ASHRAE Bathroom 2 Window",
    label: "Operable Window in Bathroom 2?",
    outputColumn: "ashrae_bathroom_2_window",
    isSelect: true,
    type: "Radio",
    hasImproved: true,
    description: "If there is an operable window in this bathroom, then choose yes.",
    omDirectSetBase: "BaseBathroomWindow2",
    omDirectSetImproved: "ImpBathroomWindow2",
    options: [
      {
        displayValue: "",
        omValue: "-"
      },
      "Yes",
      "No"
    ],
    csv: "ASHRAE > Bathroom 2 Window"
  },
  {
    name: "ASHRAE Bathroom Fan 3 CFM",
    label: "Bathroom Fan 3",
    outputColumn: "ashrae_bathroom_fan_3_cfm",
    hasImproved: true,
    description: "Enter the CFM rating of the bathroom ventilation fan.",
    suffix: "CFM",
    min: 0,
    max: 999,
    decimals: 0,
    type: "PositiveInteger",
    omDirectSetBase: "BaseBathroomFanCFM3",
    omDirectSetImproved: "ImpBathroomFanCFM3",
    csv: "ASHRAE > Bathroom Fan 3 CFM"
  },
  {
    name: "ASHRAE Bathroom 3 Window",
    label: "Operable Window in Bathroom 3?",
    outputColumn: "ashrae_bathroom_3_window",
    isSelect: true,
    type: "Radio",
    hasImproved: true,
    description: "If there is an operable window in this bathroom, then choose yes.",
    omDirectSetBase: "BaseBathroomWindow3",
    omDirectSetImproved: "ImpBathroomWindow3",
    options: [
      {
        displayValue: "",
        omValue: "-"
      },
      "Yes",
      "No"
    ],
    csv: "ASHRAE > Bathroom 3 Window"
  },
  {
    name: "ASHRAE Bathroom Fan 4 CFM",
    label: "Bathroom Fan 4",
    outputColumn: "ashrae_bathroom_fan_4_cfm",
    hasImproved: true,
    description: "Enter the CFM rating of the bathroom ventilation fan.",
    suffix: "CFM",
    min: 0,
    max: 999,
    decimals: 0,
    type: "PositiveInteger",
    omDirectSetBase: "BaseBathroomFanCFM4",
    omDirectSetImproved: "ImpBathroomFanCFM4",
    csv: "ASHRAE > Bathroom Fan 4 CFM"
  },
  {
    name: "ASHRAE Bathroom 4 Window",
    label: "Operable Window in Bathroom 4?",
    outputColumn: "ashrae_bathroom_4_window",
    isSelect: true,
    type: "Radio",
    hasImproved: true,
    description: "If there is an operable window in this bathroom, then choose yes.",
    omDirectSetBase: "BaseBathroomWindow4",
    omDirectSetImproved: "ImpBathroomWindow4",
    options: [
      {
        displayValue: "",
        omValue: "-"
      },
      "Yes",
      "No"
    ],
    csv: "ASHRAE > Bathroom 4 Window"
  },
  {
    name: "ASHRAE Required Additional CFM",
    label: "ASHRAE 62.2 Required mechanical ventilation rate",
    outputColumn: "ashrae_required_additional_cfm",
    hasImproved: true,
    description: "Minimum ventilation flow rate in CFM of continuous whole house ventilation required to satisfy the ASHRAE 62.2-2013 standard. If this field shows \"N/A\", then you likely did not fill out all of the AHSHRAE fields below. You must choose Yes or No for the Operable windows and set the Fan CFM to 0 or more.",
    suffix: "CFM",
    // min: 0,
    // max: 9999,
    type: "Numeric",
    omDirectSetBase: "BaseBPIStandardCell",
    omDirectSetImproved: "ImpBPIStandardCell",
    csv: "ASHRAE > Required Additional CFM"
  },
  {
    name: "ASHRAE Minimum CFM50",
    label: "Minimum CFM50",
    outputColumn: "ashrae_minimum_cfm50",
    improvedOnly: true,
    description: "Minimum infiltration in CFM50 below which ASHRAE 62.2-2013 recommends mechanical ventilation.<br><br>N/A indicates that either the local ventilation inputs are not complete or the home was built after 2009. Homes built after 2009 are not eligible for infiltration credit towards whole house ventilation.",
    suffix: "CFM50",
    min: 0,
    max: 99999,
    type: "Numeric",
    omDirectSetImproved: "ImpMinCFM50",
    csv: "ASHRAE > Minium CFM50"
  },
  {
    name: "Blower Door Test Performed",
    outputColumn: "blower_door_test_performed",
    isSelect: true,
    type: "Radio",
    hasImproved: true,
    description: "Choose \"Tested\" if an actual blower door test was performed. Choose \"Estimate\" if the blower door reading below is an estimate.",
    omDirectSetBase: "A1BaseInfilTested",
    omDirectSetImproved: "A1ImpInfilTested",
    options: [
      {
        displayValue: "Tested",
        omValue: "True"
      },
      {
        displayValue: "Estimate",
        omValue: "False"
      }
    ],
    csv: "Air Leakage > Blower Door Test Performed"
  },
  {
    name: "Floor Cavity Insulation Type",
    outputColumn: "floor_cavity_insulation_type",
    isSelect: true,
    type: "Select",
    hasImproved: true,
    description: "Select the type of insulation that is installed in the floor cavity. If more than one type of insulation is installed, select the type that covers that largest area.",
    omA1BaseKey: "BaseFloorInsulType",
    omDirectSetImproved: "ImpFloorInsulType",
    options: [
      "",
      {
        displayValue: "Fiberglass or Rockwool Batt",
        omValue: "fiberglassBatt"
      },
      {
        displayValue: "Blown Fiberglass or Rockwool",
        omValue: "fiberglassLooseFill"
      },
      {
        displayValue: "Cellulose",
        omValue: "celluloseLooseFill"
      },
      {
        displayValue: "Open Cell Spray Foam",
        omValue: "open cellSprayFoam"
      },
      {
        displayValue: "Closed Cell Spray Foam",
        omValue: "closed cellSprayFoam"
      },
      {
        displayValue: "Other",
        omValue: "other"
      }
    ],
    csv: "Frame Floor > Cavity Insulation Type"
  },
  {
    name: "Floor Continuous Insulation Type",
    outputColumn: "floor_continuous_insulation_type",
    isSelect: true,
    type: "Select",
    hasImproved: true,
    description: "Select the type of continuous insulation that is installed in the floor. If more than one type of insulation is installed, select the type that covers that largest area.",
    omA1BaseKey: "BaseFloorContInsulType",
    omDirectSetImproved: "ImpFloorContInsulType",
    options: [
      "",
      {
        displayValue: "Fiberglass Drape",
        omValue: "fiberglassBatt"
      },
      {
        displayValue: "Rigid XPS",
        omValue: "xpsRigid"
      },
      {
        displayValue: "Rigid EPS",
        omValue: "epsRigid"
      },
      {
        displayValue: "Rigid Polyisocyanurate",
        omValue: "polyisocyanurateRigid"
      },
      {
        displayValue: "Open Cell Spray Foam",
        omValue: "open cellSprayFoam"
      },
      {
        displayValue: "Closed Cell Spray Foam",
        omValue: "closed cellSprayFoam"
      },
      {
        displayValue: "Other",
        omValue: "other"
      }
    ],
    csv: "Frame Floor > Continuous Insulation Type"
  },
  {
    name: "Crawl Cavity Insulation Type",
    outputColumn: "crawl_cavity_insulation_type",
    isSelect: true,
    type: "Select",
    hasImproved: true,
    description: "Select the type of insulation that is installed in the crawlspace ceiling cavity. If more than one type of insulation is installed, select the type that covers that largest area.",
    omA1BaseKey: "BaseCrawlInsulType",
    omDirectSetImproved: "ImpCrawlInsulType",
    options: [
      "",
      {
        displayValue: "Fiberglass or Rockwool Batt",
        omValue: "fiberglassBatt"
      },
      {
        displayValue: "Blown Fiberglass or Rockwool",
        omValue: "fiberglassLooseFill"
      },
      {
        displayValue: "Cellulose",
        omValue: "celluloseLooseFill"
      },
      {
        displayValue: "Open Cell Spray Foam",
        omValue: "open cellSprayFoam"
      },
      {
        displayValue: "Closed Cell Spray Foam",
        omValue: "closed cellSprayFoam"
      },
      {
        displayValue: "Other",
        omValue: "other"
      }
    ],
    csv: "Crawlspace > Cavity Insulation Type"
  },
  {
    name: "Crawl Wall Insulation Type",
    outputColumn: "crawl_wall_insulation_type",
    isSelect: true,
    type: "Select",
    hasImproved: true,
    description: "Select the type of continuous insulation that is installed on the crawlspace walls. If more than one type of insulation is installed, select the type that covers that largest area.",
    omA1BaseKey: "BaseCrawlContInsulType",
    omDirectSetImproved: "ImpCrawlContInsulType",
    options: [
      "",
      {
        displayValue: "Fiberglass Drape",
        omValue: "fiberglassBatt"
      },
      {
        displayValue: "Rigid XPS",
        omValue: "xpsRigid"
      },
      {
        displayValue: "Rigid EPS",
        omValue: "epsRigid"
      },
      {
        displayValue: "Rigid Polyisocyanurate",
        omValue: "polyisocyanurateRigid"
      },
      {
        displayValue: "Open Cell Spray Foam",
        omValue: "open cellSprayFoam"
      },
      {
        displayValue: "Closed Cell Spray Foam",
        omValue: "closed cellSprayFoam"
      },
      {
        displayValue: "Other",
        omValue: "other"
      }
    ],
    csv: "Crawlspace > Continuous Insulation Type"
  },
  {
    name: "Crawlspace Rim Joist Insulation Type",
    outputColumn: "crawlspace_rim_joist_insulation_type",
    isSelect: true,
    type: "Select",
    hasImproved: true,
    description: "Select the type of insulation that is installed in the crawlspace rim joist cavities. If more than one type of insulation is installed, select the type that covers that largest area.",
    omA1BaseKey: "BaseCrawlRJInsulType",
    omDirectSetImproved: "ImpCrawlRJInsulType",
    options: [
      "",
      {
        displayValue: "Fiberglass or Rockwool Batt",
        omValue: "fiberglassBatt"
      },
      {
        displayValue: "Blown Fiberglass or Rockwool",
        omValue: "fiberglassLooseFill"
      },
      {
        displayValue: "Cellulose",
        omValue: "celluloseLooseFill"
      },
      {
        displayValue: "Open Cell Spray Foam",
        omValue: "open cellSprayFoam"
      },
      {
        displayValue: "Closed Cell Spray Foam",
        omValue: "closed cellSprayFoam"
      },
      {
        displayValue: "Rigid XPS",
        omValue: "xpsRigid"
      },
      {
        displayValue: "Rigid EPS",
        omValue: "epsRigid"
      },
      {
        displayValue: "Rigid Polyisocyanurate",
        omValue: "polyisocyanurateRigid"
      },
      {
        displayValue: "Other",
        omValue: "other"
      }
    ],
    csv: "Crawlspace > Rim Joist Insulation Type"
  },
  {
    name: "Basement Cavity Insulation Type",
    outputColumn: "basement_cavity_insulation_type",
    isSelect: true,
    type: "Select",
    hasImproved: true,
    description: "Select the type of insulation that is installed in the crawlspace ceiling cavity. If more than one type of insulation is installed, select the type that covers that largest area.",
    omA1BaseKey: "BaseBGInsulType",
    omDirectSetImproved: "ImpBGInsulType",
    options: [
      "",
      {
        displayValue: "Fiberglass or Rockwool Batt",
        omValue: "fiberglassBatt"
      },
      {
        displayValue: "Blown Fiberglass or Rockwool",
        omValue: "fiberglassLooseFill"
      },
      {
        displayValue: "Cellulose",
        omValue: "celluloseLooseFill"
      },
      {
        displayValue: "Open Cell Spray Foam",
        omValue: "open cellSprayFoam"
      },
      {
        displayValue: "Closed Cell Spray Foam",
        omValue: "closed cellSprayFoam"
      },
      {
        displayValue: "Other",
        omValue: "other"
      }
    ],
    csv: "Basement > Cavity Insulation Type"
  },
  {
    name: "Basement Continuous Insulation Type",
    outputColumn: "basement_continuous_insulation_type",
    isSelect: true,
    type: "Select",
    hasImproved: true,
    description: "Select the type of continuous insulation that is installed on the basement walls. If more than one type of insulation is installed, select the type that covers that largest area.",
    omA1BaseKey: "BaseBGContInsulType",
    omDirectSetImproved: "ImpBGContInsulType",
    options: [
      "",
      {
        displayValue: "Fiberglass Drape",
        omValue: "fiberglassBatt"
      },
      {
        displayValue: "Rigid XPS",
        omValue: "xpsRigid"
      },
      {
        displayValue: "Rigid EPS",
        omValue: "epsRigid"
      },
      {
        displayValue: "Rigid Polyisocyanurate",
        omValue: "polyisocyanurateRigid"
      },
      {
        displayValue: "Open Cell Spray Foam",
        omValue: "open cellSprayFoam"
      },
      {
        displayValue: "Closed Cell Spray Foam",
        omValue: "closed cellSprayFoam"
      },
      {
        displayValue: "Other",
        omValue: "other"
      }
    ],
    csv: "Basement > Continuous Insulation Type"
  },
  {
    name: "Basement Rim Joist Insulation Type",
    outputColumn: "basement_rim_joist_insulation_type",
    isSelect: true,
    type: "Select",
    hasImproved: true,
    description: "Select the type of insulation that is installed in the basement rim joist cavities. If more than one type of insulation is installed, select the type that covers that largest area.",
    omA1BaseKey: "BaseBsmtRJInsulType",
    omDirectSetImproved: "ImpBsmtRJInsulType",
    options: [
      "",
      {
        displayValue: "Fiberglass or Rockwool Batt",
        omValue: "fiberglassBatt"
      },
      {
        displayValue: "Blown Fiberglass or Rockwool",
        omValue: "fiberglassLooseFill"
      },
      {
        displayValue: "Cellulose",
        omValue: "celluloseLooseFill"
      },
      {
        displayValue: "Open Cell Spray Foam",
        omValue: "open cellSprayFoam"
      },
      {
        displayValue: "Closed Cell Spray Foam",
        omValue: "closed cellSprayFoam"
      },
      {
        displayValue: "Rigid XPS",
        omValue: "xpsRigid"
      },
      {
        displayValue: "Rigid EPS",
        omValue: "epsRigid"
      },
      {
        displayValue: "Rigid Polyisocyanurate",
        omValue: "polyisocyanurateRigid"
      },
      {
        displayValue: "Other",
        omValue: "other"
      }
    ],
    csv: "Basement > Rim Joist Insulation Type"
  },
  {
    name: "Dishwasher Energy Usage",
    label: "Energy Usage",
    outputColumn: "dishwasher_energy_usage",
    improvedOnly: true,
    description: "As an alternative to entering the EF, you may enter the rated energy consumption in kWh / year. You must also enter the rated water use in gallons per year.",
    suffix: "kWh/yr",
    examples: "55, 82",
    min: 0,
    max: 1000,
    decimals: 2,
    type: "Numeric",
    omDirectSetImproved: "ImpDishWasherkWhIN",
    csv: "Dishwasher > Energy Usage"
  },
  {
    name: "Dishwasher Water Usage",
    label: "Water Usage",
    outputColumn: "dishwasher_water_usage",
    improvedOnly: true,
    description: "As an alternative to entering the EF, you may enter the rated water use in gallons per cycle. You must also enter the rated energy consumption in kWh / year above.",
    suffix: "gallons/cycle",
    examples: "2.7, 1.9",
    min: 0,
    max: 100,
    decimals: 2,
    type: "Numeric",
    omDirectSetImproved: "ImpDishWasherWF",
    csv: "Dishwasher > Water Usage"
  },
  {
    name: "Window Venting Used",
    outputColumn: "window_venting_used",
    isSelect: true,
    type: "Radio",
    hasImproved: true,
    description: "Do the occupants make use of operable windows to cool the home when the outdoor temperature and humidity are favorable? This can eliminate cooling loads during shoulder seasons or even year-round in temperate climates. Turning this feature on will help eliminate scenarios where you previously had negative savings for some air sealing and insulation measures.",
    omDirectSetBase: "BaseWindowVentingUsed",
    omDirectSetImproved: "ImpWindowVentingUsed",
    yesNo: true,
    csv: "Windows > Window Venting Used2"
  },

].map(obj => {
  obj.outputTable = 'v5_basedata'
  if (obj.affectsModeling !== false) {
    obj.affectsModeling = true
  }
  return obj
})
