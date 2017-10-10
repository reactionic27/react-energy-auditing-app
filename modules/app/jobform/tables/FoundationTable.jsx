import React from 'react'
import {connect} from 'snugg-redux'
import listensToClickOutside from 'react-onclickoutside/decorator'
import {Row, Col, Clearfix} from 'react-bootstrap'
import {InlineNotification} from 'app/components/overlays'
import {dispatchSave} from 'data/actions'

function castNumber(num) {
  return isNaN(+num) ? 0 : +num
}

@connect((state, {jobId}) => {
  const basedata = state.fn.basedataByJobId(jobId)
  const foundationBasement = castNumber(basedata.get('foundation_basement'))
  const foundationCrawlspace = castNumber(basedata.get('foundation_crawlspace'))
  const foundationSlab = castNumber(basedata.get('foundation_slab'))
  return {
    foundationValues: [foundationBasement, foundationCrawlspace, foundationSlab],
    totals: foundationBasement + foundationCrawlspace + foundationSlab,
    percentOfFloorsShared: basedata.get('percent_of_floors_shared')
  }
}, {dispatchSave})
@listensToClickOutside()
export default class FoundationTable extends React.Component {
  state = {
    isSliderOpen: false
  }
  showSlider = () => {
    this.setState({
      isSliderOpen: true
    })
  }
  handleClickOutside = (event) => {
    this.setState({
      isSliderOpen: false
    })
  }
  limit(val) {
    return Math.min(Math.max(val, 0), 100)
  }
  adjustValues = (values, index, extra) => {
    let newValues = []
    newValues[index] = this.limit(values[index])
    for (let i = index + 1; i < values.length; i++) {
      newValues[i] = this.limit(values[i] - extra)
      extra = this.limit(extra - values[i])
    }
    for (let i = 0; i < index; i++) {
      newValues[i] = this.limit(values[i] - extra)
      extra = this.limit(extra - values[i])
    }
    return newValues
  }
  componentWillReceiveProps(nextProps) {
    const {foundationValues, totals} = nextProps
    if (totals <= 100) {
      return
    }
    const changeIndex = foundationValues.findIndex((val, i) => {
      return val > this.props.foundationValues[i]
    })
    const newFoundationValues = this.adjustValues(foundationValues, changeIndex, totals - 100)

    this.saveFoundationValues(newFoundationValues)
  }
  saveFoundationValues = (values) => {
    const { jobId } = this.props
    this.props.dispatchSave('basedata', {
      job_id: jobId,
      foundation_basement: values[0],
      foundation_crawlspace: values[1],
      foundation_slab: values[2]
    })
  }
  render() {
    const {totals, percentOfFloorsShared} = this.props

    return (
      <Row>
        <div className="form-group form-group-lg form-group-narrow">
          <Col sm={12}>
            <label className="control-label">Foundation Makeup</label>
            <table className="table" style={{marginBottom: 0}}>
              <thead>
                <tr>
                  <th>Basement</th>
                  <th>Crawl</th>
                  <th>Slab</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <Snugg.Percentage bare field="Foundation: Basement" />
                  </td>
                  <td>
                    <Snugg.Input bare field="Foundation: Crawlspace" />
                  </td>
                  <td>
                    <Snugg.Input bare field="Foundation: Slab" />
                  </td>
                </tr>
              </tbody>
            </table>
            <Clearfix/>
            {percentOfFloorsShared < 100  && totals < 100 ?
              <InlineNotification theme="error">
                Foundation makeup must add up to 100%.
                {totals ? <strong> Current Total: {totals}%</strong> : null}
              </InlineNotification>
              : null
            }
          </Col>
        </div>
      </Row>

    )
  }

}
