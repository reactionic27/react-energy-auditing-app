import bookshelf from '../init/bookshelf-init'

export default class Job extends bookshelf.Model {

  // General:

  program() {
    return this.belongsTo('program')
  }
  company() {
    return this.belongsTo('company')
  }
  account() {
    return this.belongsTo('account')
  }

  // Job Data:

  basedata() {
    return this.hasOne('basedata')
  }
  concerns() {
    return this.hasMany('concern')
  }

  attics() {
    return this.hasMany('attic')
  }
  caz() {
    return this.hasMany('caz')
  }
  dhws() {
    return this.hasMany('dhw')
  }
  doors() {
    return this.hasMany('door')
  }
  freezers() {
    return this.hasMany('freezer')
  }
  hvacs() {
    return this.hasMany('hvac')
  }
  refrigerators() {
    return this.hasMany('refrigerator')
  }
  vaults() {
    return this.hasMany('vault')
  }
  walls() {
    return this.hasMany('wall')
  }
  windows() {
    return this.hasMany('window')
  }
  clothesDryers() {
    return this.hasMany('clothes-dryer')
  }
  ranges() {
    return this.hasMany('range')
  }
  pvs() {
    return this.hasMany('pv')
  }
  ovens() {
    return this.hasMany('oven')
  }
  cazSystems() {
    return this.hasMany('caz-system')
  }

  health() {
    return this.hasOne('health')
  }
  totals() {
    return this.hasOne('totals')
  }
  report() {
    return this.hasOne('report')
  }
  recommendations() {
    return this.hasMany('recommendation')
  }
  recommendationCaptionRows() {
    return this.hasMany('recommendation-caption-row')
  }
  healthRec() {
    return this.hasOne('recommendation').where('rec_definition_id', 18)
  }
  omSubmission() {
    return this.hasOne('optimiser-submission')
  }
  financing() {
    return this.hasMany('job-financing')
  }
  utilities() {
    return this.hasOne('utilities');
  }
  hesScores() {
    return this.hasMany('hes-score')
  }
  activityFeed() {
    return this.hasMany('activity-feed')
  }
  activityTracking() {
    return this.hasMany('activity-tracking')
  }
  jobStageHistory() {
    return this.hasMany('job-stage-history')
  }
}

Job.prototype.tableName = 'jobs'

Job.prototype.hasTimestamps = true

Job.prototype.hidden = ['recommendation_order']
