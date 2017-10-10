import React from 'react'
import {RRow, RCol} from 'ui'
import {connect} from 'snugg-redux'
import invariant from 'fbjs/lib/invariant'
import FieldTable, {FieldRows, HeaderRow, HeaderCell } from './FieldTable'
import {getNowAndGoalFn, getRecDefinition} from 'data/definition-helpers'

@connect((state, {jobId, recDefId}) => {
  const nowAndGoal = getNowAndGoalFn(recDefId)
  return {
    recDef: getRecDefinition(recDefId),
    values: nowAndGoal(state, jobId)
  }
})
export default class NowAndGoal extends React.Component {

  static contextTypes = {
    printing: React.PropTypes.bool
  };

  render() {
    let {
      props: {values, content, hideHeader, recDef},
      context: {printing}
    } = this
    invariant(
      !printing || content,
      'The "content", a string of html must be specified when printing'
    )

    if (!printing && values.length === 0) return null;
    if (printing && content.length === 0) return null;
    return (
      <RRow style={{paddingTop: 10}}>
        <RCol span={2}>
          {!hideHeader && <h2>Now & Goal</h2>}
        </RCol>
        <RCol span={7}>
          <FieldTable>
            <HeaderRow>
              <HeaderCell title='Details' type='label' />
              <HeaderCell title='Now' />
              <HeaderCell title='Goal' />
            </HeaderRow>
            <FieldRows recDef={recDef} values={printing ? content : values} />
          </FieldTable>
        </RCol>
      </RRow>
    )
  }

}

