
// RecommendationCaptionRows
// ----------

export const recCaptionRowUuids = (recUuid: string) => createSelector(
  (state) => state.fn.captionRowsByRecUuid(recUuid),
  (recCaptionRows: Array<IMap>) => {
    return recCaptionRows
      .filter(row => !row.get('deleted_at'))
      .map(row => row.get('uuid'))
  }
)
