import React from 'react'
import cx from 'classnames'
import {connect} from 'snugg-redux'
import {Row, Col, Clearfix} from 'react-bootstrap'
import * as f from 'data/formatters'
import Radium from 'radium'

const DateDifference = (props) => (
  <div className={cx(
    'label date-difference',
    {'label-error': props.diff.messageType === 'warning'},
    {'date-difference-end': props.num === 12})}
    >
    {props.diff.message}
  </div>
)

@connect((state, {jobId, type}) => {
  const utils = state.fn.utilitiesByJobId(jobId)
  return {
    utilities: utils,
    suffix: f.utilities.suffixByType(utils, type),
  }
})
@Radium
export default class UtilityRow extends React.Component {

  static propTypes = {
    num: React.PropTypes.number.isRequired,
    type: React.PropTypes.oneOf(['electric', 'fuel']).isRequired
  };

  dateField() {
    const {num, type} = this.props
    return type === 'fuel' ? `End Fuel Date ${num}` : `End Electric Date ${num}`
  }

  valueField() {
    const {num, type} = this.props
    return type === 'fuel' ? `End Fuel Bill ${num}` : `End Electric Bill ${num}`
  }

  render() {
    const {type, num, utilities, suffix} = this.props
    const titleType = type === 'fuel' ? 'Fuel' : 'Electric'
    const dateDiffs = f.utilities.dateDiffMessage(utilities, type)
    const max = f.utilities.maxUtilDate(num)
    const min = f.utilities.minUtilDate
    return (
      <Row>
        <div className="form-group form-group-lg form-group-narrow form-group-utility-date">
          <label className="control-label col-xs-9">
            End {titleType} Bill {num}
          </label>
          <Clearfix/>
          <Col xs={9} md={5}>
            <div style={styles.fieldContainer} key="radium-util-date-container">
              <Snugg.DateField
                field={this.dateField()}
                validate={`minDate:${min}|maxDate:${max}`}
                min={min}
                max={max}
                bareWithHelpBlock />
            </div>
          </Col>
          {' '}
          <Col xs={9} md={5}>
            <div style={styles.fieldContainer} key="radium-util-unit-container">
              <Snugg.Input
                bareWithHelpBlock
                validate='decimals:2|gte:0|lte:99999999'
                suffix={suffix}
                field={this.valueField()} />
            </div>
          </Col>
          <Col xs={3} md={2}>
            <DateDifference diff={dateDiffs[num]} num={num}/>
          </Col>
          <Clearfix/>
        </div>
      </Row>
    )
  }

};

const styles = {
  fieldContainer: {
    '@media (max-width: 979px)': {
      marginBottom: 20,
    }
  }
}
