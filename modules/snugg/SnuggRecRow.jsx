import _ from 'lodash'
import ReactDOM from 'react-dom'
import React, {PropTypes} from 'react'
import {FormGroup, Row, Col, Clearfix} from 'react-bootstrap'
import {connectSelector} from 'snugg-redux'
import Label from 'fields/Label'
import {fieldByName} from 'data/definition-helpers'
import dynamicResize from '../decorators/dynamicResize'


@connectSelector({
  fieldDef: (state, props) => props.field ? fieldByName(props.field) : {}
})
@dynamicResize
export default class SnuggRecRow extends React.Component {

  static propTypes = {
    uuid: PropTypes.string,
  };

  constructor(props) {
    super(props)
    this.state = {
      hasRow1: true,
      hasRow2: true
    };
    this.setRefOne = this.setRefOne.bind(this)
    this.setRefTwo = this.setRefTwo.bind(this)
  }

  conditionallyShow = () => {
    const {
      state: {hasRow1, hasRow2}
    } = this
    const one = ReactDOM.findDOMNode(this.refOne)
    const two = ReactDOM.findDOMNode(this.refTwo)
    const hasOne = _.get(one, 'children[0].nodeName') === 'DIV'
    const hasTwo = _.get(two, 'children[0].nodeName') === 'DIV'
    if ((hasOne !== hasRow1) || (hasTwo !== hasRow2)) {
      this.setState({
        hasRow1: hasOne,
        hasRow2: hasTwo
      })
    }
  }

  componentWillMount() {
    this.updateBaseImproved(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.field !== this.props.field ||
      nextProps.fieldDef !== this.props.fieldDef
    ) {
      this.updateBaseImproved(nextProps)
    }
  }

  updateBaseImproved(props) {
    let fieldProps = {
      ...props,
      subscribeOnUpdate: this.conditionallyShow
    }

    if (!props.improvedOnly) {
      this.base = <Snugg.Input {...fieldProps} bare />
    }
    this.improved = (<Snugg.Input {...fieldProps}
                      lockMessage={fieldProps.improvedLockMessage}
                      bare
                      improved />)
  }

  componentWillUnmount() {
    this.base = null
    this.improved = null
    this.refOne = null
    this.refTwo = null
  }

  componentDidMount() {
    this.conditionallyShow(this)
  }

  componentDidUpdate() {
    this.conditionallyShow(this)
  }

  getStyles() {
    const {state: {hasRow1, hasRow2}} = this
    let style
    let rowOneStyle = {}
    let rowTwoStyle = {}
    const formStyle = (hasRow1 || hasRow2) ? {position: 'relative'} : {display: 'none'}
    rowOneStyle = hasRow1 ? {display: 'block'} : {display: 'none'}
    rowTwoStyle = hasRow2 ? {display: 'block'} : {display: 'none'}

    return {
      ...style,
      formStyle,
      rowOneStyle,
      rowTwoStyle
    }
  }

  setRefOne(ref) {
    this.refOne = ref
  }
  setRefTwo(ref) {
    this.refTwo = ref
  }
  render() {
    const {
      props: {label, fieldDef: {label: fieldLabel, name: fieldName}},
    } = this
    const style = this.getStyles()
    const displayLabel = label || fieldLabel || fieldName

    return (
      <FormGroup bsSize="lg" style={style.formStyle}>
        <Label field={fieldName}>
          {displayLabel}
        </Label>
        <Clearfix/>
        <Row>
          <Col md={6} style={styles.col}>
            <div style={style.rowOneStyle}>
              <Label field={fieldName} style={styles.subLabel}>
                Base
                <Clearfix />
              </Label>
              <div ref={this.setRefOne} style={styles.fieldContainer}>{this.base}</div>
            </div>
          </Col>
          <Col md={6} style={styles.col}>
            <div style={style.rowTwoStyle}>
              <Label field={fieldName} style={styles.subLabel}>
                Improved
              </Label>
            </div>
            <div ref={this.setRefTwo} style={styles.fieldContainer}>{this.improved}</div>
          </Col>
        </Row>
        <Clearfix/>
      </FormGroup>
    )
  }
}

const styles = {
  subLabel: {
    marginBottom: '5px',
    color: "#777",
    fontSize: '.85em',
    textTransform: 'uppercase',
    display: 'block'
  },
  fieldContainer: {
    position: 'relative'
  }
}
