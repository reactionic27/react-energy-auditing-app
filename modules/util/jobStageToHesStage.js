

// TODO: These depend on previous scores. May need to pass in latestHesScore.
// Question: how do we show previous scores? We don't want them switching stages
// just to show an older certificate do we?
export function jobStageToHesStage(jobStage: number): ?string {
  switch (jobStage) {
    case 2: return 'initial'
    case 3: return 'alternative'
    case 4: return 'alternative'
    case 5: return 'alternative'
    case 6: return 'final'
    case 7: return 'final'
    default: return undefined
  }
}
