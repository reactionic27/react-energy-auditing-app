import type {validHPXMLStageType, hesTransactionTypeTypes} from '../flowtypes/flowtypes'


type stageInsertionType = {
  transaction_type: hesTransactionTypeTypes,
  stage1: validHPXMLStageType,
  stage2: validHPXMLStageType
};

// When setting stage, need to set building position:
// first building: [0]
// second building: [1]
export default function stageInsertions(options: stageInsertionType) {
  return [
    {
      xpath: 'XMLTransactionHeaderInformation/Transaction',
      value: options.transaction_type
    },
    {
      xpath: 'Building[0]/ProjectStatus/EventType',
      value: options.stage1
    },
    {
      xpath: 'Building[1]/ProjectStatus/EventType',
      value: options.stage2
    },
    {
      xpath: 'Project/ProjectDetails/ProjectStatus/EventType',
      value: options.stage2
    }
  ]
}
