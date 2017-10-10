import React from 'react'
import {Icon} from 'ui'
import {Row, Col, Clearfix} from 'react-bootstrap'
import {incrementUtilDates} from 'data/actions'
import * as f from 'data/formatters'
import Radium from 'radium'
import {connect} from 'snugg-redux'

@connect(null, {incrementUtilDates})
@Radium
export default class StartDateRow extends React.Component {

  static propTypes = {
    type: React.PropTypes.oneOf(['fuel', 'electric']),
  };

  static contextTypes = {
    jobId: React.PropTypes.number.isRequired
  };

  incrementDates(e) {
    e.preventDefault()
    const {
      props: {type},
      context: {jobId}
    } = this
    this.props.incrementUtilDates(jobId, type)
  }

  render() {
    const {
      props: {type}
    } = this
    const titleType = type === 'fuel' ? 'Fuel' : 'Electric'
    const max = f.utilities.maxUtilDate(0)
    const min = f.utilities.minUtilDate
    return (
      <Row>
        <div className="form-group form-group-lg form-group-narrow">
          <label className="control-label col-xs-6" style={{letterSpacing: '-0.03em'}}>
            Start Date {titleType} Bill 1
            <small style={{display: 'block', letterSpacing: '0em'}}>Oldest bill first</small>
          </label>
          <Col xs={6}>
            <button type="button"
              onClick={(e) => this.incrementDates(e)}
              className="btn btn-brand-2 btn-block btn-md">
              <Icon type="duplicate" />  Increment dates
            </button>
          </Col>
          <Clearfix/>
          <Col xs={9} md={5}>
            <div style={styles.startDate} className="input-group-lg">
              <Snugg.DateField
                field={`Start ${titleType} Date 1`}
                bareWithHelpBlock
                validate={`minDate:${min}|maxDate:${max}`}
                min={min}
                max={max}
                className='utility-date form-control'
                label={''} />
            </div>
          </Col>
          <Col xs={3} md={2} mdOffset={5}>
            <div className="date-difference date-difference-start">
            </div>
          </Col>
          <Clearfix/>
        </div>
      </Row>
    );
  }
};

const styles = {
  startDate: {
    '@media (max-width: 767px)': {
      marginBottom: 20
    }
  }
}
