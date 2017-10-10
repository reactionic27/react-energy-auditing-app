import _ from 'lodash'
import {Map as IMap} from 'immutable'
const deviation0 = ['North', 'East', 'South', 'West'];
const deviation1 = ['NE', 'SE', 'SW', 'NW'];


export default function windowOrientationLabels(basedata: IMap): string[] {
  const front = basedata.get('front_of_building_orientation')
  return _.includes(deviation0, front)
    ? deviation0
    : deviation1
}
