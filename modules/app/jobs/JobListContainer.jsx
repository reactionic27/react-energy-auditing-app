import React from 'react'
import {browserHistory} from 'react-router'
import {
  CompanySelectDropdown,
  JobStageDropdown,
  JobSortDropdown
} from 'app/components/overlays'
import JobList from './JobList'
import CompanyDisabled from './CompanyDisabled'
import JobListInfoArea from './JobListInfoArea'
import JobSortSearchFilter from './JobSortSearchFilter'
import JobListActions from './JobListActions'
import {connect} from 'snugg-redux'
import {UISIZE} from 'app/lib/global-styles'
import {InlineNotification} from 'app/components/overlays'
import {Clearfix} from 'react-bootstrap'
import {Row, Col, View, Icon, LeftPushNavBtn, Button} from 'ui'
import * as s from 'data/selectors'
import {dispatchLocal, refreshStageCounts} from 'data/actions'
import * as f from 'data/formatters'
import {SORT_STRATEGIES} from 'data/constants'
import DocumentTitle from 'react-document-title'
import _ from 'lodash'
import moment from 'moment'
import {Map as IMap} from 'immutable'
import BulkStagePane from '../components/overlays/panes/BulkStagePane'
import BulkExportPane from '../components/overlays/panes/BulkExportPane'
const SNUGG_LOGO = require('../../../src/img/sp-logo-muted.png')


@connect((state, {companyId, params: {stageId}}) => {
  const userId = state.fn.loggedInUser().get('id')
  const {sortBy, sortReverse, filterString} = state.localState.get('jobList').toJS()
  const selectedJobs = s.selectedJobs(state)
  const strategy = SORT_STRATEGIES.get(sortBy)
  return {
    sortBy,
    sortReverse,
    filterString,
    companyId,
    userId,
    strategy,
    localStageId: state.localState.getIn(['jobList', 'stageId']),
    currentStageId: stageId,
    companyName: state.fn.companyById(companyId).get('name'),
    companyDisabled: state.fn.companyById(companyId).get('disabled'),
    selectedJobCount: selectedJobs.length,
    selectedJobNames: f.company.selectedJobNames(selectedJobs),
    allJobsSelected: state.localState.get('allJobsSelected'),
    filteredJobs:   jobListFilter({sortBy, sortReverse, filterString})(state, {companyId, userId, stageId})
  }
}, {dispatchLocal, refreshStageCounts})
export default class JobListContainer extends React.Component {

  static contextTypes = {
    isSnuggAdmin: React.PropTypes.bool,
    isProgramAdmin: React.PropTypes.bool
  };

  constructor() {
    super(...arguments)
    this.state = {
      showBulkStage: false,
      showBulkExport: false,
    };
  }

  handleFilterChange = (filterString) => {
    this.props.dispatchLocal('updateJobListFilterString', {filterString})
  };

  // If clicking on the same sort option, reverse it. Otherwise sort by the new
  // option without the reverse
  handleSortChange = (sortBy) => {
    this.props.dispatchLocal('updateJobListSortBy', {sortBy})
  };

  handleSelectAllJobs = (e) => {
    e.preventDefault()
    const { filteredJobs } = this.props
    const selectedJobs = filteredJobs.reduce((jobs, job) => {
      return jobs.concat(Array.isArray(job) ? job[1] : job)
    }, [])
    this.props.dispatchLocal('toggleAllJobsSelect', selectedJobs)
  };

  componentDidMount() {
    const {localStageId, companyId} = this.props
    if (localStageId) {
      browserHistory.push(`/joblist/${companyId}/stage/${localStageId}`)
    }
    this.props.refreshStageCounts(this.props.companyId)
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.companyId !== this.props.companyId) {
      this.props.refreshStageCounts(nextProps.companyId)
    }
  }

  togglePane = (pane: 'BulkStage' | 'BulkExport') => {
    this.setState({
      [`show${pane}`]: !this.state[`show${pane}`]
    })
  };

  render() {
    const {
      props: {
        sortBy, sortReverse,
        strategy,
        companyId,
        companyName, companyDisabled,
        currentStageId, allJobsSelected,
        selectedJobCount, selectedJobNames,
        filteredJobs, filterString
      },
      state: {
        showBulkExport, showBulkStage
      },
      context: {
        isSnuggAdmin, isProgramAdmin
      }
    } = this

    const canViewDisabledCompany = isProgramAdmin || isSnuggAdmin
    return (
      <DocumentTitle title={`Snugg Pro: ${companyName}`}>
        <View className="content jobs-view">
          <Row>
            <section className="content-header">
              <Col xs={8} sm={2} noGutter={['alRight']} smHidden>
                <LeftPushNavBtn />
                <div className="app-logo">
                  <img src={SNUGG_LOGO} width="93" height="20" />
                </div>
                <div className="clearfix visible-xs-block"></div>
              </Col>
              <Col xs={4} sm={2} smPush={10} mdPush={8}>
                <Row>
                  <Button to={`/create-job/${companyId}`} variant="yellow" borderRadius="0px" isFlat customStyle={{paddingTop: 12, height: UISIZE.header, fontWeight: 400, fontSize: 15}} disabled={isProgramAdmin}>
                    <Icon type="addNew" padding="0 15px 0 0"/> New
                  </Button>
                </Row>
              </Col>
              <Clearfix visibleXsBlock />
              <Col sm={10} smPull={2} md={8} mdPull={2}>
                <Row>
                  <Col sm={4}>
                    <CompanySelectDropdown companyId={companyId} />
                    <Clearfix/>
                  </Col>
                  <Col sm={4}>
                    <JobStageDropdown currentStageId={currentStageId} companyId={companyId} />
                    <Clearfix />
                  </Col>
                  <Col sm={4}>
                    <JobSortDropdown sortBy={sortBy} sortReverse={sortReverse} onSortChange={this.handleSortChange} />
                    <Clearfix />
                  </Col>
                </Row>
              </Col>
            </section>
            <JobListActions
              companyId={companyId}
              selectedJobNames={selectedJobNames}
              selectedJobCount={selectedJobCount}
              filteredJobCount={filteredJobs.length}
              togglePane={this.togglePane} />
          </Row>
          <JobListInfoArea companyId={companyId}/>
          <br/>
          <Row>
            <Col sm={5} smPush={7} md={4} mdPush={8} lg={3} lgPush={9}>
              {!companyDisabled || canViewDisabledCompany ?
                <JobSortSearchFilter
                filterString={filterString}
                filterChange={this.handleFilterChange} />
                :
                null
              }
            </Col>
            <Col sm={7} smPull={5} md={8} mdPull={4} lg={9} lgPull={3}>
              {!companyDisabled || canViewDisabledCompany ? <a href="#" style={{padding: "10px 10px 10px 0", display: 'inline-block'}} onClick={this.handleSelectAllJobs}>
                {allJobsSelected ? 'Deselect all jobs' : 'Select all jobs'}
              </a> : null}
            </Col>
          </Row>
          <Row>
            <Col sm={12}>
              {companyDisabled && canViewDisabledCompany ?
                <InlineNotification theme="error" title="This company is inactive." message="Only program admins and Snugg Home admins can see this company's jobs."/>
                :
                null
              }
              {!companyDisabled || canViewDisabledCompany ?
                <JobList
                companyId={companyId}
                jobs={filteredJobs}
                currentStageId={currentStageId}
                filterString={filterString}
                strategy={strategy}
              />
                :
                <CompanyDisabled companyName={companyName} />
              }
            </Col>
          </Row>
          <BulkStagePane companyId={companyId} show={showBulkStage} onExit={() => this.setState({showBulkStage: false})} />
          <BulkExportPane show={showBulkExport} onExit={() => this.setState({showBulkExport: false})} />
        </View>
      </DocumentTitle>
    )
  }

};

const filterKeys = [
  'first_name', 'last_name',
  'address_1', 'address_2', 'city', 'email',
  'home_phone', 'state', 'zip',
  'id', 'program_id', 'account_id'
]

const identity = f => f

// TODO: This seems overly complicated. Seems like we could have better performance by
// just concatting a string with the attributes we want to search, and associated that
// with a job id. That concated string could be memoized up higher.
// Or, crossfilter2 is very performant.
function jobListFilter(opts: Object) {
  return (state, {companyId, userId, stageId}) => {
    const jobs = currentCompanyJobs(state, { companyId, userId, stageId })
    const strategy = SORT_STRATEGIES.get(opts.sortBy)
    const filteredJobs = jobs.filter(searchFilter(opts.filterString, state))
    if (filteredJobs.length === 0) {
      return filteredJobs
    }
    const sorter = strategy === 'group'
      ? groupedSort
      : strategy === 'sortDate' ? dateSort : standardSort
    let filteredAndSorted = sorter(filteredJobs, opts.sortBy)(state)
    if (strategy === 'group') {
      filteredAndSorted = _.sortBy(_.toPairs(filteredAndSorted))
    }
    filteredAndSorted = opts.sortReverse ? filteredAndSorted.reverse() : filteredAndSorted

    // Always show no program group first
    if (opts.sortBy === 'program_id') {
      const noProgramIndex = filteredAndSorted.findIndex((group) => group[0] === 'None')
      if (noProgramIndex !== -1) {
        const noProgramGroup = filteredAndSorted.splice(noProgramIndex, 1)
        noProgramGroup[0][0] = 'No Program'
        filteredAndSorted = noProgramGroup.concat(filteredAndSorted)
      }
    }

    // Sort by stage_id, but display name
    if (opts.sortBy === 'stage_id') {
      filteredAndSorted = filteredAndSorted.map((group) => {
        const stageId = parseInt(group[0], 10)
        const stageName = f.stages.currentStageName(stageId)
        return [stageName, group[1]]
      })
    }

    return filteredAndSorted
  }
}

function dateSort(filteredJobs, sortBy) {
  return state => _.sortBy(filteredJobs, (job) => {
    var m = moment(job.get(sortBy))
    return m.isValid() ? m.valueOf() : null
  })
}

function standardSort(filteredJobs, sortBy) {
  return state => _.sortBy(filteredJobs, job => job.get(sortBy))
}

function groupedSort(filteredJobs, groupBy) {
  return state => _.groupBy(filteredJobs, job => {
    switch (groupBy) {
      case 'account_id': {
        const account = state.fn.accountById(job.get(groupBy));
        return account.get('first_name') + ' '  + account.get('last_name');
      }
      case 'program_id': return f.program.programById(job.get(groupBy)).get('name')
      case 'stage_id': return job.get(groupBy) || 8  // If stage_id of job is null, mark it as uncategorized
      default: {
        console.error(new Error(`Missing groupBy for ${groupBy}`))
      }
    }
  })
}

const searchFilter = (search, state) => {
  if (!search) return identity
  return job => filterKeys.some(key => {
    if (key === 'program_id') {
      key = (f.program.programById(job.get('program_id')) || IMap()).get('name')
    } else if (key === 'account_id') {
      const account = (state.fn.accountById(job.get('account_id')) || IMap())
      key = ['first_name', 'last_name'].map(str => account.get(str) || '').join('');
    } else if (key === 'id') {
      key = String(job.get(key))
    } else {
      key = job.get(key)
    }
    return (key || '').toLowerCase().replace(/\s+/g, '').indexOf(search) !== -1
  })
}

type currentCompanyJobsType = {
  userId: number,
  companyId: number,
  stageId: ?number
};

export const currentCompanyJobs = (state, props: currentCompanyJobsType) => {
  const {companyId, stageId} = props
  const filteredJobs = state.fn.jobsByCompanyId(companyId)
  return filteredJobs
    .filter(job => {
      const jobStageId = job.get('stage_id');
      return stageId ? (jobStageId === stageId) : (jobStageId !== 9) && (jobStageId !== 10)
    })
}
