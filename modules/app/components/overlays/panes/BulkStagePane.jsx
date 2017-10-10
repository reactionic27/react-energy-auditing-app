import React from 'react'
import dimensions from 'util/dimensions'
import {BaseSlidePane, BulkLineItem, PaneFooter} from 'app/components/overlays'
import {Button} from 'ui'
import {Clearfix} from 'react-bootstrap'
import {connectSelector} from 'snugg-redux'
import * as s from 'data/selectors'
import * as f from 'data/formatters'
import * as a from 'data/actions'
import dynamicResize from 'decorators/dynamicResize';
import Radium from 'radium'
import Fields from 'fields'


@connectSelector({
  selectedJobs: s.selectedJobs,
  stageOptions: () => f.stages.stageOptionGroups()
})
@Radium
@dynamicResize
export default class BulkStagePane extends React.Component {

  static defaultProps = {
    currentStageId: 2
  };

  constructor(props) {
    super(props)
    this.state = {
      stage_id: props.currentStageId
    }
  }

  submitHandler = (e) => {
    e.preventDefault()
    const {
      props: {companyId, onExit},
      state: {stage_id}
    } = this
    this.props.dispatch(a.updateJobsStages({
      company_id: companyId,
      stage_id,
      onExit
    }))
  };

  handleStageChange(stage_id) {
    this.setState({stage_id})
  }

  getListStyle() {
    let {windowHeight} = dimensions
    let dynamicHeight = windowHeight - 110
    return (
      Object.assign({},
        styles.listContainer,
        {height: dynamicHeight}
      )
    )
  }

  render() {
    const {selectedJobs, stageOptions} = this.props
    const title = selectedJobs.length > 1 ? `Move these ${selectedJobs.length} jobs` : `Move this 1 job`
    return (
      <BaseSlidePane allowClickOutside {...this.props} className="pane-export-bulk" title={title}>
        <div style={this.getListStyle()}>
          {selectedJobs.map(job => (
            <BulkLineItem key={job.get('id')} job={job.toJS()} />
          ))}
        </div>
        <PaneFooter>
          <div className="form-horizontal" style={styles.footerLeft}>
            <div className="form-group form-group-lg" style={{margin: 0}}>
              <Fields.Select
                value={this.state.stage_id}
                onChange={(e) => this.handleStageChange(e)}
                validate="required"
                bare
                options={stageOptions} />
            </div>
          </div>
          <div style={styles.footerRight}>
            <Button onClick={this.submitHandler} size="lg" customStyle={{fontWeight: 400}}>
                MOVE
            </Button>
          </div>
          <Clearfix/>
        </PaneFooter>
      </BaseSlidePane>
    )
  }
};

const styles = {
  listContainer: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 5,
    overflowY: 'auto',
    overflowX: 'scroll',
    borderTop: '1px solid #ddd',
    borderBottom: '1px solid #e3e3e3'
  },
  footerLeft:{
    width: '65%',
    float: 'left'
  },
  footerRight: {
    width: '33%',
    float:'right'
  }
}
