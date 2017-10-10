import _ from 'lodash'

function parseSIR(sir) {
  sir = (sir || '').trim().replace(/[^0-9\.]/g, '');
  sir = parseFloat(sir);
  return _.isNaN(sir) ? 0 : sir
}

export default function calculateRecommendations(recDefs, parsedData) {
  var SelectionTableGroup = parsedData.SelectionTableGroup;
  return recDefs.reduce((acc, recDef) => {
    var name = recDef.get('rec_name');
    if (name) {
      acc[recDef.id] = {
        status: _.get(SelectionTableGroup, [name, 'Chk']),
        cost: _.get(SelectionTableGroup, [name, 'CostUSD']),
        savings: _.get(SelectionTableGroup, [name, 'SavedUSD']),
        sir: parseSIR(_.get(SelectionTableGroup, [name, 'SIRNet']))
      }
    }
    return acc
  }, {});
}
