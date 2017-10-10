import bookshelf from '../init/bookshelf-init'

export default function calculatedJobReader(job_id: number) {
  return bookshelf.model('job').where('id', job_id).fetch({
    require: true,
    withRelated: [
      'basedata',
      'utilities',
      'totals',
      'jobStageHistory', {
        recommendations: notDeleted,
        recommendationCaptionRows: notDeleted,
        concerns: notDeleted,
        attics: notDeleted,
        caz: notDeleted,
        dhws: notDeleted,
        doors: notDeleted,
        freezers: notDeleted,
        hvacs: notDeleted,
        refrigerators: notDeleted,
        vaults: notDeleted,
        walls: notDeleted,
        windows: notDeleted,
        hesScores: notDeleted,
        pvs: notDeleted
      }

    ]
  });
}

function notDeleted(qb) {
  return qb.where('deleted_at', null)
}
