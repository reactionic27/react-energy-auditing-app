import bookshelf from '../init/bookshelf-init'

export default class Recommendation extends bookshelf.Model {

  captionRows() {
    return this.hasMany('recommendation-caption-row', 'recommendation_uuid')
  }

  definition() {
    return this.belongsTo('rec-definition', 'rec_definition_id')
  }

}

Recommendation.prototype.tableName = 'v5_recommendations'

Recommendation.prototype.idAttribute = 'uuid'

Recommendation.prototype.hasTimestamps = true
