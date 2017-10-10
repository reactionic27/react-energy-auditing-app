import React from 'react'
import * as f from 'data/formatters'

const baseStyle = {
  textAlign: 'right',
  paddingLeft: 3,
  paddingRight: 10
}

const valueStyle = {
  ...baseStyle,
}
const errorStyle = {
  ...baseStyle,
  backgroundColor: '#F9E8E8'
}
const warningStyle = {
  ...baseStyle,
  backgroundColor: '#F7EFCE'
}
const disabledStyle = {
  ...baseStyle,
  backgroundColor: '#f1f1f1',
  color: '#999'
}

export const DataCell = ({field, value, type, warning, error, disabled, recDeclined}) => {
  // TODO: Temporary removal of touched warning for Adam's deliverable.
  // There are cases such as 'System Equipment Type' and 'Upgrade action' in HVAC
  // that are definitely explicitly chosen but don't show up as touched
  warning = false

  if (type === 'label') {
    return <td dangerouslySetInnerHTML={{__html: value}} />
  }
  const suffix = getSuffix(field)
  value = value ? (value + suffix) : ''
  let style
  if (disabled) {
    style = disabledStyle
  } else if (error) {
    style = errorStyle
  } else if (warning) {
    style = warningStyle
  } else {
    style = valueStyle
  }
  return (
    <td style={style}>
      {recDeclined && value ?
        <span style={{fontSize: '0.8em', color: '#888', paddingRight: 10}}>Base →</span>
        : null
      }
      {value}
    </td>
  )
}
export const HeaderCell = ({title, type, disabled}) => {
  if (type === 'label') {
    return <th>{title}</th>
  }
  return (
    <th style={{textAlign: 'right', lineHeight: '1.2em'}}>
      {title}
    </th>
  )
}

export class HeaderRow extends React.Component {
  render() {
    return (
      <thead>
        <tr>
          {this.props.children}
        </tr>
      </thead>
    )
  }
}

export const SubHeaderRow = ({label}) => (
  <tr>
    <td dangerouslySetInnerHTML={{__html: label}} colSpan={3} style={{fontWeight: 600, paddingTop: 10}}/>
  </tr>
)

export const FieldRow = ({field, label, now, goal, recDeclined, baseDisabled, improvedDisabled}) => {
  if (empty(now.value) && empty(goal.value)) {
    return null
  }
  return (
    <tr>
      <DataCell value={label} type='label' />
      <DataCell field={field} value={now.value} warning={!now.touched} error={now.required && !now.value} disabled={baseDisabled} />
      <DataCell field={field} value={recDeclined ? now.value : goal.value} warning={!goal.touched} error={goal.required && !goal.value} disabled={improvedDisabled} recDeclined={recDeclined}/>
    </tr>
  )
}

export class FieldRows extends React.Component {
  render() {
    let {values, recDeclined, baseDisabled, improvedDisabled, recDef: {category}} = this.props
    return (
      <tbody style={{border: 'none'}}>
        {category ?
          <tr style={{borderBottom: '1px solid #ccc'}}>
            <td colSpan={3} style={{fontWeight: 600, fontSize: '1.1em', paddingTop: 15}}>{category}</td>
          </tr> : null}
        {values.map(([field, [now, goal], index]) => {
          // console.log(now, goal)
          const label = (field.label || field.name).replace('%{n}', index + 1)
          if (now.type === 'collectionName') {
            return <SubHeaderRow key={now + 'sub-header' + index} label={now.value}/>
          } else {
            return (
              <FieldRow
                key={label + index}
                label={label}
                now={now}
                goal={goal}
                field={field}
                index={index}
                recDeclined={recDeclined}
                baseDisabled={baseDisabled}
                improvedDisabled={improvedDisabled}/>
            )
          }
        })}
      </tbody>
    )
  }
}

export default class FieldTable extends React.Component {

  render() {
    return (
      <table className="table table-extra-condensed notes-body" style={{paddingTop: 7}}>
        {this.props.children}
      </table>
    )
  }
}

function getSuffix(field) {
  switch (field.suffix) {
    case '#': return ''
    case '%': return '%'
    default : {
      return field.suffix ? ' ' + field.suffix : ''
    }
  }
}

function empty(val) {
  return val === undefined || val === null || val === ''
}
