/* eslint-env mocha */
import expect from 'expect'
import {Map as IMap} from 'immutable'
import {program} from 'data/formatters'

const {eucIncentives, xcelIncentives} = program

// jobId: 41589
const metrics = {
  "annual_fuel_therms_used":1997,
  "annual_fuel_therms_improved":501,
  "annual_fuel_therms_used_saved":1496,
  "annual_electric_kWh_used":4681,
  "annual_electric_kWh_improved":2495,
  "annual_electric_kWh_used_saved":2186,
  "mbtu_base":216,
  "mbtu_improved":59,
  "mbtu_base_saved":157,
  "annual_fuel_dollars_spent":1796,
  "annual_fuel_dollars_improved":450,
  "annual_fuel_dollars_spent_saved":1346,
  "annual_electric_dollars_spent":692,
  "annual_electric_dollars_improved":369,
  "annual_electric_dollars_spent_saved":323,
  "yearly_energy_cost":2488,
  "yearly_energy_cost_improved":819,
  "yearly_energy_cost_saved":1669,
  "total_co2_tons_base":13.4,
  "total_co2_tons":4.2,
  "total_co2_tons_base_saved":9.2,
  "payback_years":12,
  "saved_mbtu_percent":73,
  "saved_co2_percent":69,
  "sir":1.2,
  "mirr":6
}

const job = {
  programId: 12,
  metrics: metrics,
  cost: 24980.59,
  costDisplayType: 'exact',
}


describe('program', () => {

  describe('eucIncentives', () => {

    const incentives = {
      "percentIncentive":4000,
      "kwhIncentive":1639.5,
      "thermIncentive":2992,
      "totalIncentive":8631.5,
      "netCost":16349.09,
      "formattedPercentIncentive":"$ 4,000",
      "formattedNetCost":"$ 16,349",
      "formattedElectricIncentive":"$ 1,640",
      "formattedThermIncentive":"$ 2,992",
      "formattedTotalIncentive":"$ 8,632",
      "incentivesDescription": "",
      "showElectricIncentive": true,
      "showThermIncentive": true
    }

    it('PG&E (12) should use reduced percent incentive and no negative kwh & therms', () => {
      // high (72%) savings, so it's above the 45% threshold
      expect(eucIncentives(
        job.programId,
        job.metrics,
        job.cost,
        job.costDisplayType
      )).toEqual(incentives)

      // mid (32%) savings, so it's subject to rounding down to the nearest 5%
      expect(eucIncentives(
        job.programId,
        {...job.metrics, saved_mbtu_percent: 32},
        job.cost,
        job.costDisplayType
      )).toEqual({
        ...incentives,
        netCost: 17849.09,
        formattedNetCost: '$ 17,849',
        percentIncentive: 2500,
        formattedPercentIncentive: '$ 2,500',
        totalIncentive: 7131.5,
        formattedTotalIncentive: '$ 7,132',
      })

      // low (9%) savings, so it's below the 10% threshold to get an incentive based on percent
      expect(eucIncentives(
        job.programId,
        {...job.metrics, saved_mbtu_percent: 9},
        job.cost,
        job.costDisplayType
      )).toEqual({
        ...incentives,
        netCost: 24980.59,
        formattedNetCost: '$ 24,981',
        percentIncentive: 0,
        formattedPercentIncentive: '$ 0',
        kwhIncentive: 0,
        formattedElectricIncentive: '$ 0',
        thermIncentive: 0,
        formattedThermIncentive: '$ 0',
        totalIncentive: 0,
        formattedTotalIncentive: '$ 0'
      })
    })




  })

})
