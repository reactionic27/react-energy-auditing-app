import bookshelf from '../init/bookshelf-init'

export default class RecommendationCaptionRow extends bookshelf.Model {}

RecommendationCaptionRow.prototype.tableName = 'v5_recommendation_caption_rows'

RecommendationCaptionRow.prototype.idAttribute = 'uuid'

RecommendationCaptionRow.prototype.hasTimestamps = true

