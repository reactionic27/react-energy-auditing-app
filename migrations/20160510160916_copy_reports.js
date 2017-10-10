const MIGRATE_PAGE_SORT = JSON.stringify(['page_cover', 'page_concerns', 'page_solutions', 'page_upgrade_details', 'page_health', 'page_additional_notes', 'page_rebates', 'page_financing', 'page_metrics', 'page_tech_specs', 'page_glossary']);
const MIGRATE_ELEMENT_SORT = JSON.stringify(['element_photos', 'element_homeowner_notes', 'element_contractor_notes',  'element_now_and_goal']);

exports.up = function(knex, Promise) {
  return knex.raw(`
INSERT INTO v5_reports (
  job_id,
  cover_photo_uuid,
  cover_photo_name,
  cover_photo_url,
  serviced_by_title,
  service_date_title,
  cover_text_area,
  toggled_pages,
  toggled_elements,
  concerns_sidebar,
  solutions_title,
  approximate_cost_text,
  estimated_savings_text,
  safety_overview,
  additional_notes_overview_title,
  additional_notes_overview,
  title_cover,
  title_concerns,
  title_solutions,
  title_financing,
  title_additional,
  title_rebates,
  title_tech_specs,
  title_metrics,
  title_glossary,
  page_cover,
  page_financing,
  page_concerns,
  page_solutions,
  page_upgrade_details,
  page_health,
  page_additional_notes,
  page_rebates,
  page_tech_specs,
  page_metrics,
  page_glossary,
  element_costs,
  element_savings,
  element_sir,
  element_co2,
  element_photos,
  element_homeowner_notes,
  element_contractor_notes,
  element_now_and_goal,
  element_why_it_matters,
  theme,
  updated_at,
  page_sort_order,
  element_sort_order
) SELECT
  job_id,
  cover_photo_uuid,
  cover_photo_name,
  cover_photo_url,
  serviced_by_title,
  service_date_title,
  cover_text_area,
  toggled_pages,
  toggled_elements,
  concerns_sidebar,
  solutions_title,
  approximate_cost_text,
  estimated_savings_text,
  safety_overview,
  additional_notes_overview_title,
  additional_notes_overview,
  title_cover,
  title_concerns,
  title_solutions,
  title_financing,
  title_additional,
  title_rebates,
  title_tech_specs,
  title_metrics,
  title_glossary,
  page_cover,
  page_financing,
  page_concerns,
  page_solutions,
  page_upgrade_details,
  page_health,
  page_additional_notes,
  page_rebates,
  page_tech_specs,
  page_metrics,
  page_glossary,
  element_costs,
  element_savings,
  element_sir,
  element_co2,
  element_photos,
  element_homeowner_notes,
  element_contractor_notes,
  element_now_and_goal,
  element_why_it_matters,
  theme,
  updated_at,
  '${MIGRATE_PAGE_SORT}' as page_sort_order,
  '${MIGRATE_ELEMENT_SORT}' as element_sort_order
FROM v4_reports
  WHERE job_id IN (
    SELECT id FROM jobs WHERE version = 4
  )
  GROUP BY
    job_id
`)
};

exports.down = function(knex, Promise) {
  return knex.raw(`
    DELETE FROM v5_reports WHERE job_id IN (
      SELECT id from jobs WHERE version != 5
    )
  `)
};
