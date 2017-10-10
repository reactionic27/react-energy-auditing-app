import React from 'react'
import ContextPaneSection from './ContextPaneSection'
import {PaneH1, PaneH4, PaneH3, PaneBody, BlankText} from 'ui'
import {Clearfix} from 'react-bootstrap'
import {connect} from 'snugg-redux'
import {fieldByName, fieldType} from 'data/definition-helpers'
import * as f from 'data/formatters'

function EmptyState() {
  return (
    <ContextPaneSection>
      <hr style={{marginTop: 5}}/>
      <PaneH1>Selected Field</PaneH1>
      <Clearfix/>
      <BlankText>Click or tap on a field to see its description.</BlankText>
    </ContextPaneSection>
  )
}

@connect((state) => {
  const lastFocusedField = state.localState.getIn(['contextState', 'lastFocusedField'])
  const definition = lastFocusedField ? fieldByName(lastFocusedField) : {}
  const dataType = fieldType(definition.type)
  return {
    lastFocusedField,
    definition,
    dataType,
  }
})
export default class ContextFieldDefinition extends React.Component {
  render() {
    const {lastFocusedField, definition: {description, min, max, examples, csv}, dataType} = this.props
    if (!lastFocusedField) return <EmptyState />
    return (
      <ContextPaneSection>
        <hr style={{marginTop: 5}}/>
        <PaneH1>Selected Field</PaneH1>
        <Clearfix/>
        <PaneH3><span style={{maxWidth: '78%'}}>{lastFocusedField}</span></PaneH3>
        <PaneBody>
          {description ?
            <div dangerouslySetInnerHTML={{__html: description}} />
            : <BlankText>No description available</BlankText>
          }
        </PaneBody>
        {dataType ?
          <div>
            <PaneH4>Data Type:</PaneH4>
            <PaneBody>{dataType}</PaneBody>
          </div>
          : null
        }

        {examples ?
          <div>
            <PaneH4>Examples:</PaneH4>
            <PaneBody>{examples}</PaneBody>
          </div>
        : null}

        {f.type.isEmpty(min) && f.type.isEmpty(max) ? null : <PaneH4>Validations:</PaneH4>}
        {f.type.isEmpty(min) ? null : <PaneBody>Min: {min}</PaneBody>}
        {f.type.isEmpty(max) ? null : <PaneBody>Max: {max}</PaneBody>}

        {csv ?
          <div>
            <PaneH4>CSV Field Name:</PaneH4>
            <PaneBody>{csv}</PaneBody>
          </div>
          : null
        }

      </ContextPaneSection>
    )
  }
}
