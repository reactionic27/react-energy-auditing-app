import _ from 'lodash'
import fieldDefinitions from '../../constants/field-definitions'
import optimiserHvac from '../data/optimiser/optimiserHvac'
import expect from 'expect'
import {mockPayload, hvacDefaults} from '../__mocks__/mocks'

const groupedDefinitions = _.groupBy(_.filter(fieldDefinitions, row => {
  return row.omA1BaseKey || row.omDirectSetBase || row.omDirectSetImproved
}), row => row.outputTable.replace('v5_', ''))

/* eslint-env mocha */
describe('optimiser hvac tests', () => {

  function omHvac(systems: Array) {
    return optimiserHvac(context, systems, groupedDefinitions.hvac)
  }

  let context
  beforeEach(() => {
    context = {
      payload: mockPayload,
      values: {},
      returning: [],
      returningInto: {},
      errors: [],
      sections: {}
    }
  })

  function makeHvac(values) {
    return {...hvacDefaults, ...values}
  }
  function replace(values) {
    return {...values, hvac_upgrade_action: 'Replace with a newer model'}
  }
  function keep(values) {
    return {...values, hvac_upgrade_action: 'Keep an existing system as is'}
  }
  function remove(values) {
    return {...values, hvac_upgrade_action: 'Remove a system permanently'}
  }
  function install(values) {
    return {...values, hvac_upgrade_action: 'Install a new non-existing system'}
  }

  /* eslint-disable */
  const FURNACE = {
    keep: keep({

    }),
    replace: replace({
      "hvac_upgrade_action": "Replace with a newer model",
      "hvac_system_equipment_type": "Furnace with standalone ducts",
      "hvac_heating_energy_source_improved": "Natural Gas",
      "hvac_heating_energy_source": "Natural Gas",
    }),
    remove: remove({

    }),
    install: install({

    })
  }
  const BOILER = {
    keep: keep({
      "hvac_system_equipment_type":"Boiler",
      "hvac_heating_energy_source":"Propane",
      "hvac_heating_energy_source_improved":"Propane"
    }),
    replace: replace({
      "hvac_system_equipment_type":"Boiler",
      "hvac_heating_energy_source":"Propane",
      "hvac_heating_energy_source_improved":"Propane"
    }),
    remove: remove({

    }),
    install: install({

    })
  }
  const ELECTRIC_RESISTANCE = {
    keep: keep({

    }),
    replace: replace({

    }),
    remove: remove({

    }),
    install: install({

    })
  }
  const DIRECT_HEATER = {
    keep: keep({

    }),
    replace: replace({

    }),
    remove: remove({

    }),
    install: install({

    })
  }
  const STOVE_OR_INSERT = {
    keep: keep({

    }),
    replace: replace({

    }),
    remove: remove({

    }),
    install: install({

    })
  }
  const SOLAR = {
    keep: keep({
      hvac_system_equipment_type: 'Solar Thermal'
    }),
    replace: replace({

    }),
    remove: remove({

    }),
    install: install({

    })
  }
  const CENTRAL_AC = {
    keep: keep({

    }),
    replace: replace({

    }),
    remove: remove({

    }),
    install: install({

    })
  }
  const ROOM_AC = {
    keep: keep({

    }),
    replace: replace({

    }),
    remove: remove({

    }),
    install: install({

    })
  }
  const EVAPORATIVE_COOLER_DIRECT = {
    keep: keep({

    }),
    replace: replace({

    }),
    remove: remove({

    }),
    install: install({

    })
  }
  const EVAPORATIVE_COOLER_DUCTED = {
    keep: keep({

    }),
    replace: replace({

    }),
    remove: remove({

    }),
    install: install({

    })
  }
  const DUCTLESS_HEAT_PUMP = {
    keep: keep({
      hvac_system_equipment_type: 'Ductless Heat Pump'
    }),
    replace: replace({
      hvac_system_equipment_type: 'Ductless Heat Pump'
    }),
    remove: remove({
      hvac_system_equipment_type: 'Ductless Heat Pump'
    }),
    install: install({
      hvac_system_equipment_type: 'Ductless Heat Pump'
    })
  }
  const CENTRAL_HEAT_PUMP = {
    keep: keep({

    }),
    replace: replace({

    }),
    remove: remove({

    }),
    install: install({

    })
  }
  const FURNACE_AC = {
    keep: keep({
      hvac_system_equipment_type: 'Furnace / Central AC (shared ducts)'
    }),
    replace: replace({

    }),
    remove: remove({

    }),
    install: install({

    })
  }
  /* eslint-enable */

  it('fails with empty systems', () => {
    const {errors} = omHvac([])
    expect(errors).toEqual([{ message: 'NO_HVAC_SYSTEMS', section: 'hvac' }])
  })

  describe('boiler', () => {

    it('handles keep', () => {
      const {values, errors} = omHvac([makeHvac(BOILER.keep)])
      expect(values).toEqual({
        A1BaseHeatFuel1: 'Propane',
        BaseHeatType1: 'Boiler',
        ImpHeatType1: 'Boiler',
        ImpHeatSystem1: '180799999999'
      })
      expect(errors).toEqual([])
    })

    it('handles replace', () => {
      const {values, returning, errors} = omHvac([makeHvac(BOILER.replace)])
      expect(values).toEqual({
        A1BaseHeatFuel1: 'Propane',
        BaseHeatType1: 'Boiler',
        ImpHeatFuel1: 'Propane',
        ImpHeatType1: 'Boiler'
      })
      expect(returning).toEqual([
        'BaseHeatEff1/controlvalue',
        'BaseHeatInverter1',
        'BaseHeatSize1',
        'HeaterBrand',
        'HeaterMfgDate',
        'HeaterModelNum',
        'ImpHeatEff1/controlvalue',
        'ImpHeatFuel1',
        'ImpHeatInverter1',
        'ImpHeatPct1',
        'ImpHeatSize1',
        'ImpHeaterBrand1',
        'ImpHeaterModelNum1',
        'ImpHeaterYear1'
      ])
      expect(errors).toEqual([])
    })
  })

  describe('furnace', () => {

  })

  describe('electric resistance', () => {

  })

  describe('direct heater', () => {

  })

  describe('stove or insert', () => {

  })

  describe('solar', () => {
    it('handles keep', () => {
      const {values, returning, errors} = omHvac([makeHvac(SOLAR.keep)])
      expect(values).toEqual({
        A1BaseHeatFuel1: 'Solar',
        ImpHeatFuel1: 'Solar',
        ImpHeatSystem1: '180799999999'
      })
      expect(returning).toEqual([
        'BaseHeatEff1/controlvalue',
        'BaseHeatInverter1',
        'BaseHeatSize1',
        'HeaterBrand',
        'HeaterMfgDate',
        'HeaterModelNum',
        'ImpHeatEff1/controlvalue',
        'ImpHeatFuel1',
        'ImpHeatInverter1',
        'ImpHeatPct1',
        'ImpHeatSize1',
        'ImpHeaterBrand1',
        'ImpHeaterModelNum1',
        'ImpHeaterYear1'
      ])
    })
  })

  describe('central ac', () => {

  })

  describe('room ac', () => {

  })

  describe('evaporative cooler - direct', () => {

  })

  describe('evaporative cooler - ducted', () => {

  })

  describe('ductless heat pump', () => {
    it('handles keep', () => {
      const {values, returning, errors} = omHvac([makeHvac(DUCTLESS_HEAT_PUMP.keep)])
      expect(values).toEqual({
        BaseHeatType1: 'Room Heat Pump',
        ImpHeatType1: 'Room Heat Pump',
        BaseCoolingType1: 'Room Heat Pump',
        ImpCoolingType1: 'Room Heat Pump',
        A1BaseHeatFuel1: 'Elec',
        ImpHeatFuel1: 'Elec',
        ImpHeatSystem1: '180799999999',
      })

      expect(returning).toEqual([
        'ACCondBrand',
        'ACCondMfgDate',
        'ACCondModelNum',
        'BaseCoolingEff1/controlvalue',
        'BaseCoolingPct1',
        'BaseCoolingSize1',
        'BaseHeatEff1/controlvalue',
        'BaseHeatInverter1',
        'BaseHeatSize1',
        'HeaterBrand',
        'HeaterMfgDate',
        'HeaterModelNum',
        'ImpACCondBrand1',
        'ImpACCondModelNum1',
        'ImpACCondYear1',
        'ImpCoolingEff1/controlvalue',
        'ImpCoolingPct1',
        'ImpCoolingSize1',
        'ImpHeatEff1/controlvalue',
        'ImpHeatFuel1',
        'ImpHeatInverter1',
        'ImpHeatPct1',
        'ImpHeatSize1',
        'ImpHeaterBrand1',
        'ImpHeaterModelNum1',
        'ImpHeaterYear1',
      ])
      expect(errors).toEqual([])
    })
    it('handles replace', () => {
      const {values, returning, errors} = omHvac([makeHvac(DUCTLESS_HEAT_PUMP.replace)])
      expect(values).toEqual({
        BaseHeatType1: 'Room Heat Pump',
        BaseCoolingType1: 'Room Heat Pump',
        ImpCoolingType1: 'Room Heat Pump',
        A1BaseHeatFuel1: 'Elec',
        ImpHeatFuel1: 'Elec',
        ImpHeatType1: 'Room Heat Pump'
      })
      expect(returning).toEqual([
        'ACCondBrand',
        'ACCondMfgDate',
        'ACCondModelNum',
        'BaseCoolingEff1/controlvalue',
        'BaseCoolingPct1',
        'BaseCoolingSize1',
        'BaseHeatEff1/controlvalue',
        'BaseHeatInverter1',
        'BaseHeatSize1',
        'HeaterBrand',
        'HeaterMfgDate',
        'HeaterModelNum',
        'ImpACCondBrand1',
        'ImpACCondModelNum1',
        'ImpACCondYear1',
        'ImpCoolingEff1/controlvalue',
        'ImpCoolingPct1',
        'ImpCoolingSize1',
        'ImpHeatEff1/controlvalue',
        'ImpHeatFuel1',
        'ImpHeatInverter1',
        'ImpHeatPct1',
        'ImpHeatSize1',
        'ImpHeaterBrand1',
        'ImpHeaterModelNum1',
        'ImpHeaterYear1'
      ])
      expect(errors).toEqual([])
    })

    it('handles remove', () => {
      const {values, returning, errors} = omHvac([makeHvac(DUCTLESS_HEAT_PUMP.remove)])
      expect(values).toEqual({
        ImpHeatPct1: '0',
        ImpCoolingPct1: '0',
        BaseCoolingType1: 'Room Heat Pump',
        BaseHeatType1: 'Room Heat Pump',
        A1BaseHeatFuel1: 'Elec'
      })
      expect(returning).toEqual([
        'ACCondBrand',
        'ACCondMfgDate',
        'ACCondModelNum',
        'BaseCoolingEff1/controlvalue',
        'BaseCoolingPct1',
        'BaseCoolingSize1',
        'BaseHeatEff1/controlvalue',
        'BaseHeatInverter1',
        'BaseHeatSize1',
        'HeaterBrand',
        'HeaterMfgDate',
        'HeaterModelNum'
      ])
    })
    it('handles install', () => {
      const {values, returning, errors} = omHvac([makeHvac(DUCTLESS_HEAT_PUMP.install)])
      expect(values).toEqual({
        A1BaseHeatPct1: '0',
        ImpCoolingType1: 'Room Heat Pump',
        ImpHeatFuel1: 'Elec',
        ImpHeatType1: 'Room Heat Pump',
        BaseCoolingPct1: '0',
      })
      expect(returning).toEqual([
        'ImpACCondBrand1',
        'ImpACCondModelNum1',
        'ImpACCondYear1',
        'ImpCoolingEff1/controlvalue',
        'ImpCoolingPct1',
        'ImpCoolingSize1',
        'ImpHeatEff1/controlvalue',
        'ImpHeatFuel1',
        'ImpHeatInverter1',
        'ImpHeatPct1',
        'ImpHeatSize1',
        'ImpHeaterBrand1',
        'ImpHeaterModelNum1',
        'ImpHeaterYear1'
      ])
    })
  })

  describe('central heat pump', () => {

  })

  describe('furnace / central ac (shared ducts)', () => {
    it('handles keep', () => {
      const {values, returning, errors} = omHvac([makeHvac(FURNACE_AC.keep)])
      expect(values).toEqual({
        BaseCoolingType1: 'Central Air Conditioner',
        ImpCoolingType1: 'Central Air Conditioner',
        ImpCoolingDuctLink1: '1',
        BaseHeatType1: 'Furnace',
        ImpHeatType1: 'Furnace',
        ImpHeatSystem1: '180799999999',
        ImpCoolingSystem1: '187299999999',
        BaseCoolingDuctLink1: '1',
      })
      expect(returning).toEqual([
        'ACCondBrand',
        'ACCondMfgDate',
        'ACCondModelNum',
        'BaseCoolingEff1/controlvalue',
        'BaseCoolingPct1',
        'BaseCoolingSize1',
        'BaseDuctEff1',
        'BaseHeatDelivery1/value',
        'BaseHeatDuctInsul1/value',
        'BaseHeatDuctInsulR1',
        'BaseHeatDuctLeakage1',
        'BaseHeatDuctSealing1/value',
        'BaseHeatEff1/controlvalue',
        'BaseHeatInverter1',
        'BaseHeatSize1',
        'HeaterBrand',
        'HeaterMfgDate',
        'HeaterModelNum',
        'ImpACCondBrand1',
        'ImpACCondModelNum1',
        'ImpACCondYear1',
        'ImpCoolingEff1/controlvalue',
        'ImpCoolingPct1',
        'ImpCoolingSize1',
        'ImpDuctEff1',
        'ImpHeatDelivery1/value',
        'ImpHeatDuctInsul1/controlvalue',
        'ImpHeatDuctInsulR1',
        'ImpHeatDuctLeakage1',
        'ImpHeatDuctSealing1/controlvalue',
        'ImpHeatEff1/controlvalue',
        'ImpHeatFuel1',
        'ImpHeatInverter1',
        'ImpHeatPct1',
        'ImpHeatSize1',
        'ImpHeaterBrand1',
        'ImpHeaterModelNum1',
        'ImpHeaterYear1'
      ])
      expect(errors).toEqual([])
    })
  })

  function yearFor(year) {
    return (new Date().getFullYear() - year) + ''
  }

  it('complex-hvac-41808', () => {
    var json = require('./complex-hvac-41808.json')
    const {values} = omHvac(_.values(json))
    const outputValues = {
      // Basement Central
      A1BaseHeatAge1: yearFor(1962),
      A1BaseHeatFuel1: 'Elec',
      A1BaseHeatPct1: '25',
      BaseCoolingDuctLink1: '1',
      BaseCoolingPct1: '25',
      BaseCoolingSize1: '24000',
      BaseCoolingType1: 'Central Heat Pump, Ducted',
      BaseHeatDelivery1: '3',
      BaseHeatDuctInsul1: '195999999999',
      BaseHeatDuctInsulR1: '2',
      BaseHeatDuctLeakage1: '211',
      BaseHeatDuctSealing1: 'Measured',
      BaseHeatInverter1: 'False',
      BaseHeatSize1: '36000',
      BaseHeatType1: 'Central Heat Pump, Ducted',
      HeaterBrand: 'American Standard',
      HeaterMfgDate: '1962',
      HeaterModelNum: '5bac',

      // New Ductless
      'ImpCoolingEff1/controlvalue':'31',
      ImpCoolingPct1: '80',
      ImpCoolingSize1: '32000',
      ImpCoolingType1: 'Room Heat Pump',
      'ImpHeatEff1/controlvalue':'13',
      ImpHeatFuel1: 'Elec',
      ImpHeatInverter1: 'True',
      ImpHeatPct1: '55',
      ImpHeatSize1: '48000',
      ImpHeatType1: 'Room Heat Pump',
      ImpHeaterBrand1: 'Mitsubishi',
      ImpHeaterModelNum1: 'ABC1234',
      ImpHeaterYear1: '2016',

      // Room AC
      A1BaseCoolingYear2: yearFor(1986),
      ACCondBrand2: 'AirEase',
      ACCondMfgDate2: '1986',
      ACCondModelNum2: 'abgaa',
      BaseCoolingPct2: '20',
      BaseCoolingSize2: '36000',
      BaseCoolingType2: 'Room Air Conditioner',
      ImpCoolingPct2: '20',
      ImpCoolingSystem2: '187499999999',
      ImpCoolingType2: 'Room Air Conditioner',

      // Install Furnace
      ImpHeatDelivery1: undefined,
      ImpHeatDuctInsul1: undefined,
      ImpHeatDuctInsulR1: undefined,
      ImpHeatDelivery2: '3',
      'ImpHeatDuctInsul2/controlvalue': 'Other',
      ImpHeatDuctInsulR2: '2',
      'ImpHeatDuctSealing2/controlvalue':'Seal to 6% Leakage',
      'ImpHeatEff2/controlvalue':'98',
      ImpHeatFuel2: 'Gas',
      ImpHeatPct2: '50',
      ImpHeatSize2: '48000',
      ImpHeatType2: 'Furnace',
      ImpHeaterBrand2: 'Goodman',
      ImpHeaterModelNum2: 'abc123',
      ImpHeaterYear2: '2016',

      // System 5
      A1BaseHeatAge2: yearFor(1960),
      A1BaseHeatFuel2: 'Elec',
      A1BaseHeatPct2: '75',
      BaseHeatSize2: '48000',
      BaseHeatType2: 'Electric Baseboard',
      HeaterBrand2: 'Carrier',
      HeaterMfgDate2: '1960',
      HeaterModelNum2: 'adfadf',
    }

    _.forEach(outputValues, (val, key) => {
      expect(values[key]).toEqual(val === undefined ? val : `${val}`, `Testing ${key}, expected ${val} saw ${values[key]}`)
    })
  })

  it('complex-hvac-bug-559', () => {
    var json = require('./complex-hvac-bug-559.json')
    const {values} = omHvac(_.values(json))
    const outputValues = {
      // System 1: Heat Pump, Removed
      A1BaseHeatFuel1: 'Elec',
      A1BaseHeatPct1: 35,
      BaseCoolingPct1: 50,
      BaseCoolingType1: 'Room Heat Pump',
      BaseHeatInverter1: 'False',
      BaseHeatType1: 'Room Heat Pump',

      // System 2:  Heat Pump, Removed
      A1BaseHeatFuel2: 'Elec',
      A1BaseHeatPct2: 35,
      BaseCoolingPct2: 50,
      BaseCoolingType2: 'Room Heat Pump',
      BaseHeatInverter2: 'False',
      BaseHeatType2: 'Room Heat Pump',

      // System 3:  Heat Pump, Removed
      ImpCoolingDuctLink1: 1,
      ImpCoolingPct1: 100,
      ImpCoolingType1: 'Central Air Conditioner',
      'ImpHeatDuctSealing1/controlvalue': 'No Improvement',
      ImpHeatFuel1: 'Gas',
      ImpHeatPct1: 50,
      ImpHeatType1: 'Furnace',

      // System 4:  Electric Baseboard, No Improvement
      A1BaseHeatFuel3: 'Elec',
      A1BaseHeatPct3: 30,
      BaseHeatType3: 'Electric Baseboard',
      ImpHeatFuel3: 'Elec',
      ImpHeatPct3: 10,
      ImpHeatSystem3: 180799999999,
      ImpHeatType3: 'Electric Baseboard',

      // System 5: Boiler, Add
      ImpHeatFuel2: 'Gas',
      ImpHeatPct2: 40,
      ImpHeatType2: 'Boiler',

      // Fill in...
      ImpCoolingPct2: 0
    }

    _.forEach(outputValues, (val, key) => {
      expect(values[key]).toEqual(val === undefined ? val : `${val}`, `Testing ${key}, expected ${val} saw ${values[key]}`)
    })
  })

  it('complex-hvac-bug-604', () => {
    var json = require('./complex-hvac-bug-604.json')
    const {values} = omHvac(_.values(json))
    const outputValues = {

      // System 1: Add Heat Pump
      ImpCoolingPct1: 100,
      ImpCoolingSize1: 36000,
      ImpCoolingType1: 'Room Heat Pump',
      ImpHeatFuel1: 'Elec',
      ImpHeatInverter1: 'True',
      ImpHeatPct1: 50,
      ImpHeatSize1: 36000,
      ImpHeatType1: 'Room Heat Pump',
      ImpHeaterBrand1: 'Unknown',
      ImpHeaterYear1: 2016,

      // System 2: Upgrade Furnace
      A1BaseHeatAge2: 66,
      A1BaseHeatFuel2: 'Gas',
      A1BaseHeatPct2: 100,
      BaseHeatDelivery2: 6,
      BaseHeatDuctInsul2: 195999999999,
      BaseHeatDuctSealing2: 15,
      BaseHeatSize2: 60000,
      BaseHeatType2: 'Furnace',
      HeaterBrand2: 'Unknown',
      HeaterMfgDate2: 1950,
      ImpHeatDelivery2: 2,
      'ImpHeatDuctInsul2/controlvalue': 'R-6 Duct Insulation',
      'ImpHeatDuctSealing2/controlvalue': 'Seal to 6% Leakage',
      ImpHeatFuel2: 'Gas',
      ImpHeatPct2: 50,
      ImpHeatSize2: 100000,
      ImpHeatType2: 'Furnace',
      ImpHeaterBrand2: 'Unknown',
      ImpHeaterYear2: 2016,

      // System 3: Remove Central AC
      A1BaseCoolingYear1: 36,
      ACCondBrand: 'Unknown',
      ACCondMfgDate: 1980,
      BaseCoolingPct1: 20,
      BaseCoolingSize1: 36000,
      BaseCoolingType1: 'Room Air Conditioner',
    }

    _.forEach(outputValues, (val, key) => {
      expect(values[key]).toEqual(val === undefined ? val : `${val}`, `Testing ${key}, expected ${val} saw ${values[key]}`)
    })
  })



})
