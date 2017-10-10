
exports.up = function(knex, Promise) {
  return knex.schema.raw(`
    INSERT INTO v5_totals (
      job_id,
      total_savings,
      installed_costs,
      sir,
      mirr,
      payback_years,
      total_co2_tons,
      saved_kwh,
      saved_kwh_percent,
      saved_co2_tons,
      saved_co2_percent,
      saved_mbtu,
      saved_mbtu_percent,
      yearly_energy_cost,
      annual_electric_kWh_used,
      annual_electric_dollars_spent,
      annual_fuel_therms_used,
      annual_fuel_dollars_spent,
      annual_fuel_therms_improved,
      annual_electric_kWh_improved,
      mbtu_base,
      mbtu_improved,
      annual_fuel_dollars_improved,
      annual_electric_dollars_improved,
      yearly_energy_cost_improved,
      total_co2_tons_base,
      annual_fuel_therms_saved,
      touched,
      updated_at
    ) SELECT
      job_id,
      total_savings,
      installed_costs,
      sir,
      mirr,
      payback_years,
      total_co2_tons,
      saved_kwh,
      saved_kwh_percent,
      saved_co2_tons,
      saved_co2_percent,
      saved_mbtu,
      saved_mbtu_percent,
      yearly_energy_cost,
      annual_electric_kWh_used,
      annual_electric_dollars_spent,
      annual_fuel_therms_used,
      annual_fuel_dollars_spent,
      annual_fuel_therms_improved,
      annual_electric_kWh_improved,
      mbtu_base,
      mbtu_improved,
      annual_fuel_dollars_improved,
      annual_electric_dollars_improved,
      yearly_energy_cost_improved,
      total_co2_tons_base,
      annual_fuel_therms_saved,
      touched,
      updated_at
    FROM v4_totals
    WHERE
      job_id IN (
        SELECT id from jobs WHERE version = 4
      )
    GROUP BY
      job_id
`)
};

exports.down = function(knex, Promise) {
  return knex.raw(`
    DELETE FROM v5_totals WHERE job_id IN (
      SELECT id from jobs WHERE version != 5
    )
  `)
};
