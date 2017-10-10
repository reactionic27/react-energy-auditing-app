export default [
  {
    name: "Modeled Vault Area",
    label: "Modeled Area",
    outputTable: "v5_vault",
    outputColumn: "vault_modeled_vault_area",
    collectionName: "vault",
    hasImproved: true,
    description: "This field will be automatically calculated based on the data you entered in the input form for Conditioned Area and Number of Stories. This is the actual surface area of the vaulted ceiling. It includes a default roof pitch of 5/12. When you override this number, be sure to include the complete sqft of the vault that's covering conditioned space.<br><br>\n\nThis field designates the interior surface area of the vaulted ceiling. On the improved side, this is the new total sqft of the vaulted ceiling. Increase this number if you're switching the attic from unconditioned to a conditioned space.<br><br>\n\nFor instance, if the original house had 1000 sqft of attic space and you converted it to a fully conditioned attic by spray foaming the roof deck and rafters, then set the base side to 1000 sqft and the improved side to 0. Then create a vaulted ceiling that is 0 on the base side and 1118 sqft on the improved side (adding 118 sqft for a 6/12 roof pitch). ",
    suffix: "ft²",
    min: 0,
    max: 1000000,
    decimals: 2,
    type: "Numeric",
    omDirectSetBase: "CeilingArea%{n}",
    omDirectSetImproved: "ImpCeilingArea%{n}",
    csv: "Vault > %{n} Modeled Area"
  },
  {
    name: "Vault Cavity Insulation",
    label: "Cavity Insulation",
    outputTable: "v5_vault",
    outputColumn: "vault_cavity_insulation",
    collectionName: "vault",
    hasImproved: true,
    description: "Enter the total R-value of insulation installed (BASE) or to be installed (IMPROVED) in this Vaulted Ceiling.<br><br>\n\n<strong>Note:</strong><br>\nEdit Base fields in the Details section only if you're confident of the actual value that is entered. The modeling engine utilizes utility data and input form data to determine the \"effective\" values on the Base side.<br><br>\n\nEdit Improved fields in the Details section with the details of what you recommend be installed in the house. These values are only used if the item is Recommended. Default values are supplied by the modeling engine, but can be overridden.<br><br>",
    suffix: "R Value",
    min: 0,
    max: 100,
    decimals: 2,
    type: "Numeric",
    omDirectSetBase: "BaseCeilingCavR%{n}",
    omDirectSetImproved: "ImpCeilingCavR%{n}",
    csv: "Vault > %{n} Cavity Insulation R Value"
  },
  {
    name: "Vault Continuous Insulation",
    label: "Continuous Insulation",
    outputTable: "v5_vault",
    outputColumn: "vault_continuous_insulation",
    collectionName: "vault",
    hasImproved: true,
    description: "Enter the total R-value of continuous insulation installed or to be installed in this Vaulted Ceiling. Continuous insulation is any insulation like spray foam or rigid foam that is continuous and consistent in R-value across studs, joists, or any framing member.<br><br>\n\n<strong>Note:</strong><br>\nEdit Base fields in the Details section only if you're confident of the actual value that is entered. The modeling engine utilizes utility data and input form data to determine the \"effective\" values on the Base side.<br><br>\n\nEdit Improved fields in the Details section with the details of what you recommend be installed in the house. These values are only used if the item is Recommended. Default values are supplied by the modeling engine, but can be overridden.<br><br>\n\n",
    suffix: "R Value",
    min: 0,
    max: 100,
    decimals: 2,
    type: "Numeric",
    omDirectSetBase: "BaseCeilingContR%{n}",
    omDirectSetImproved: "ImpCeilingContR%{n}",
    csv: "Vault > %{n} Continuous Insulation R Value"
  },
  {
    name: "Vault %{n}",
    label: "Insulated?",
    outputTable: "v5_vault",
    outputColumn: "vault",
    collectionName: "vault",
    isSelect: true,
    type: "Radio",
    description: "Is there insulation in the vaulted ceiling cavities of this home? If so, how good is it? If unsure, please leave blank.<br><br>\n\n<strong>Well</strong>: All cavities contain insulation at full or near full depth with gaps and voids not exceeding 5%.<br><br>\n<strong>Poor</strong>: Majority of cavities contain insulation, but one or more of the following is suspected: low density, low depth, poor installation.<br><br>\n<strong>Yes</strong>: You can confirm that insulation exists, but are unsure of the installation quality.<br><br>\n<strong>No</strong> - No insulation value is applied to cavities.",
    omA1BaseKey: "A1BaseVaultInsul%{n}",
    options: [
      "Well",
      "Yes",
      {
        displayValue: "Poorly",
        omValue: "Poor"
      },
      "No"
    ],
    csv: "Vault > %{n} Insulated"
  },
  {
    name: "Vault Percent",
    label: "% of Ceiling Area",
    outputTable: "v5_vault",
    outputColumn: "vault_percent",
    collectionName: "vault",
    description: "Enter the % of the total footprint that is attributed to each attic or vault area.",
    suffix: "%",
    decimals: 0,
    type: "Percentage",
    omA1BaseKey: "A1BaseVaultPct%{n}",
    csv: "Vault > %{n} % of Footprint"
  },
  {
    name: "Vault Roof Absorptance",
    label: "Roof Absorptance",
    outputTable: "v5_vault",
    outputColumn: "vault_roof_absorptance",
    collectionName: "vault",
    hasImproved: true,
    description: "Enter the Solar Absorptance of the roofing material above this vaulted ceiling. Solar Absorptance is equal to 1 - Solar Reflectance. For example, if the ENERGY STAR website gives a Initial Solar Reflectance of 0.27, enter 0.73. Default numbers will be supplied automatically, so don't change these settings unless you plan to specify a cool roof as an improvement.",
    suffix: "#",
    examples: "0.80,0.57",
    min: 0,
    max: 1,
    decimals: 2,
    type: "Numeric",
    omDirectSetBase: "BaseCeilingAbsorptance%{n}",
    omDirectSetImproved: "ImpCeilingAbsorptance%{n}",
    csv: "Vault > %{n} Roof Absorptance"
  },
  {
    name: "Vault Roof Emissivity",
    label: "Roof Emissivity",
    outputTable: "v5_vault",
    outputColumn: "vault_roof_emissivity",
    collectionName: "vault",
    hasImproved: true,
    description: "Enter the Thermal Emittance or Emissivity of the roofing material above this vaulted ceiling. Default numbers will be supplied automatically, so don't change these settings unless you plan to specify a cool roof as an improvement.",
    suffix: "#",
    examples: "0.76,0.89",
    min: 0,
    max: 1,
    decimals: 2,
    type: "Numeric",
    omDirectSetBase: "BaseCeilingEmittance%{n}",
    omDirectSetImproved: "ImpCeilingEmittance%{n}",
    csv: "Vault > %{n} Roof Emissivity"
  },
  {
    name: "Vault Cool Roof?",
    label: "Cool Roof?",
    outputTable: "v5_vault",
    outputColumn: "vault_cool_roof",
    collectionName: "vault",
    hasImproved: true,
    isSelect: true,
    type: "Radio",
    description: "Choose yes if you would like to specify characteristics of a cool roof (such as ENERGY STAR qualified roof products) for either the base or improved home. Default numbers will be supplied automatically. Most contractors will not use this option unless they are actually planning to replace a roof as part of an improvement package. ",
    yesNo: true,
    csv: "Vault > %{n} Has Cool Roof"
  },
  {
    name: "Vault Cavity Insulation Type",
    label: "Cavity Insulation Type",
    outputTable: "v5_vault",
    outputColumn: "vault_cavity_insulation_type",
    collectionName: "vault",
    isSelect: true,
    type: "Select",
    hasImproved: true,
    description: "Select the type of insulation that is installed in the vault. If more than one type of insulation is installed, select the type that covers that largest area.",
    omA1BaseKey: "BaseCeilingCavInsul%{n}Type",
    omDirectSetImproved: "ImpCeilingCavInsul%{n}Type",
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
    csv: "Vault > %{n} Cavity Insulation Type"
  },
  {
    name: "Vault Continuous Insulation Type",
    label: "Continuous Insulation Type",
    outputTable: "v5_vault",
    outputColumn: "vault_continuous_insulation_type",
    collectionName: "vault",
    isSelect: true,
    type: "Select",
    hasImproved: true,
    description: "Select the type of continuous insulation that is installed on the vault. If more than one type of insulation is installed, select the type that covers that largest area.",
    omA1BaseKey: "BaseCeilingContInsul%{n}Type",
    omDirectSetImproved: "ImpCeilingContInsul%{n}Type",
    options: [
      "",
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
    csv: "Vault > %{n} Continuous Insulation Type"
  }


].map(obj => {
  if (obj.affectsModeling !== false) {
    obj.affectsModeling = true
  }
  return obj
})
