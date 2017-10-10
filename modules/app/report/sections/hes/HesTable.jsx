import React from 'react'
import {Row, Col} from 'react-bootstrap'
import {getRecDefinition} from 'data/definition-helpers'
import FieldTable, {FieldRows, HeaderRow, HeaderCell } from '../../components/FieldTable'
import * as f from 'data/formatters'

export default class HesTable extends React.Component {
  render() {
    const {
      valuesMap,
      basedataValues,
      recs,
      scoreTypeToModel,
      baseDisabled,
      improvedDisabled
    } = this.props
    const {recByType, isDeclinedRec} = f.recs
    return (
      <Row style={{paddingTop: 10}}>
        <Col xs={12}>
          <p>
            This score and these data points cannot
            be easily changed once submitted.
           Please review the information carefully and make changes if necessary.
          </p>
          <FieldTable>
            <HeaderRow>
              <HeaderCell title="" type='label'/>
              <HeaderCell title='Building Details' />
              <HeaderCell title='' />
            </HeaderRow>
            <FieldRows
              recDef={{}}
              values={basedataValues}
            />
          </FieldTable>
          <h3>Check the values of the <u>{improvedDisabled ? 'base' : 'improved'}</u> column in the table below:</h3>
          <p>You are applying for the {scoreTypeToModel} score. This means only the values shown in the {improvedDisabled ? 'base' : 'improved'} column will be used.</p>
          <FieldTable>
            <HeaderRow>
              <HeaderCell title="" type='label'/>
              <HeaderCell title='Base' disabled={baseDisabled} />
              <HeaderCell title='Improved' disabled={improvedDisabled} />
            </HeaderRow>
            {valuesMap.entrySeq().map(([type, values]) => (
              <FieldRows
                key={type}
                recDef={getRecDefinition(type)}
                values={values}
                baseDisabled={baseDisabled}
                improvedDisabled={improvedDisabled}
                recDeclined={isDeclinedRec(recByType(recs, type))} />
              ))
            }
          </FieldTable>
        </Col>
      </Row>
    )
  }
}
