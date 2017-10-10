import React from 'react'
import _ from 'lodash'
import {Map as IMap} from 'immutable'
import {connect} from 'snugg-redux'
import {Clearfix, Row} from 'react-bootstrap'
import {CheckboxGroup, Button} from 'ui'
import {browserHistory} from 'react-router'
import {palette} from 'app/lib/global-styles'
import Color from 'color'
import Radium from 'radium'
import {dispatchEagerCreate, dispatchCollectionDelete} from '../../../data/actions/actions'
import DeleteConfirmationModal from 'app/components/overlays/modals/DeleteConfirmationModal'
import type {cazTargetsMapType, cazTargetKeyType} from 'data/flowtypes'
import {cazTargetName} from '../../../data/formatters/cazFormatters'

const poorCaseLabel = (
  <div>
    Poor Case Test<br />
    <small style={{fontWeight: 'normal'}}>(Worst Case Depressurization)</small>
  </div>
)

@connect((state, {jobId}) => ({
  collection: state.fn.cazByJobId(jobId),
}))
export default class CAZCollection extends React.Component {

  render() {
    const collectionName = 'caz'
    const {
      props: {collection, jobId}
    } = this
    return (
      <div>
        <fieldset className="job-row collection">
          <Snugg.Rec.Row field="CAZ Max Ambient CO" />
        </fieldset>
        {Snugg.mapCollection(collection, (uuid, index) => (
          <fieldset className="job-row collection">
            <Snugg.CollectionLabel collection="caz" uuid={uuid} deleteMin={0}>
              <Snugg.Input
                uuid={uuid}
                bare
                editableTitle
                collection={collectionName}
                label={`Combustion Appliance Zone ${index}`}
                field="CAZ Name"
                placeholder="Name this CAZ"
                size={9} />
            </Snugg.CollectionLabel>

            <CazCheckboxGroupContainer jobId={jobId} zoneUuid={uuid} />
            <Clearfix/>
            <Snugg.Rec.Row uuid={uuid} field="CAZ Ambient CO" />
            <Snugg.Rec.Row uuid={uuid} field="CAZ Poor Case Test" label={poorCaseLabel} size={4} />
            <Snugg.Input uuid={uuid} field="CAZ Notes" />
          </fieldset>
        ))}
        <Snugg.Buttons.CollectionAdd
          collection={collectionName}
          max={3}
          label="Add a Zone" />
      </div>
    )
  }
}

@connect((state, {zoneUuid, jobId}) => {
  const zoneSystems = state.fn.cazSystemsByCazUuid(zoneUuid)
  const availableTargets = state.fn.availableCazTargetsByJobId(jobId)
  const allTargets = state.fn.cazTargetsByJobId(jobId)
  return { allTargets, availableTargets, zoneSystems }
})
@Radium
class CazCheckboxGroupContainer extends React.Component {

  static propTypes = {
    zoneUuid: React.PropTypes.string.isRequired
  };

  state = {
    deleteConfirmation: false,
    uuid: null,
    title: null
  }

  render() {
    const {
      props: { allTargets, availableTargets, zoneSystems, zoneUuid, jobId },
    } = this
    return (
      <CheckboxGroup label="Combustion Appliances">
        {_.flatMap(allTargets, (targets: Array<IMap>, type: cazTargetKeyType) => {
          return targets.filter(availableOrInZone(availableTargets, zoneSystems, type)).map((target: IMap) => {
            return (
              <CazSystemCheckbox
                jobId={jobId}
                type={type}
                key={target.get('uuid')}
                cazTarget={target}
                zoneUuid={zoneUuid} />
            )
          })
        })}
      </CheckboxGroup>
    )
  }
}

function availableOrInZone(availableTargets: cazTargetsMapType, zoneSystems: cazTargetsMapType, type: cazTargetKeyType) {
  return (maybeTarget: IMap) => {
    return _.includes(availableTargets[type], maybeTarget) || _.some(zoneSystems[type], sys => {
      return sys.get(`${_.snakeCase(type)}_uuid`) === maybeTarget.get('uuid')
    })
  }
}

@connect((state, {jobId, type, zoneUuid, cazTarget}) => {
  const cazTargetUuid = cazTarget.get('uuid')
  const zoneSystems = state.fn.cazSystemsByCazUuid(zoneUuid)
  return {
    cazSystem: zoneSystems[type].find(sys => (
      sys.get(`${_.snakeCase(type)}_uuid`) === cazTargetUuid
    )),
    cazTargetUuid,
    title: cazTargetName(state, jobId, type, cazTargetUuid)
  }
}, {dispatchEagerCreate, dispatchCollectionDelete})
class CazSystemCheckbox extends React.Component {

  state = {
    showDeleteConfirmation: false
  };

  static propTypes = {
    cazSystem: React.PropTypes.instanceOf(IMap),
    cazTarget: React.PropTypes.instanceOf(IMap).isRequired,
    type: React.PropTypes.oneOf(['dhw', 'hvac', 'oven', 'clothesDryer', 'range']).isRequired,
    zoneUuid: React.PropTypes.string.isRequired
  };

  editSystem = e => {
    e.preventDefault()
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
    browserHistory.push(`/job/${this.props.jobId}/cazsystem/${this.props.cazSystem.get('uuid')}`)
  };

  linkSystem = () => {
    const {
      props: {jobId: job_id, zoneUuid: caz_uuid, type, cazTargetUuid}
    } = this
    this.props.dispatchEagerCreate('cazSystem', {
      caz_uuid,
      job_id,
      [`${_.snakeCase(type)}_uuid`]: cazTargetUuid
    }, {
      info({payload: {uuid}}) {
        browserHistory.push(`/job/${job_id}/cazsystem/${uuid}`)
      }
    })
    .catch(() => {
      browserHistory.push(`/job/${job_id}`)
    })
  };

  // Confirm deletion & delete caz system entry
  unlinkSystem = () => {
    this.props.dispatchCollectionDelete('cazSystem', {
      job_id: this.props.jobId,
      uuid: this.props.cazSystem.get('uuid'),
      deleted_at: new Date()
    })
    this.setState({showDeleteConfirmation: false})
  };

  unlinkConfirmation = () => {
    this.setState({showDeleteConfirmation: true})
  };

  cancelUnlink = () => {
    this.setState({showDeleteConfirmation: false})
  }

  render() {
    const {
      props: { cazSystem, title, type }
    } = this
    if (cazSystem) {
      return (
        <div style={styles.selected} className="snugg-selected">
          <div className="snugg-select" style={{width: '15%'}} onClick={this.unlinkConfirmation}>
            <span style={styles.checkboxSelected}>&#x2713;</span>
          </div>
          <div style={styles.actionContainer}>
            <Button variant="light" isFlat customStyle={styles.action} onClick={this.editSystem}>
              <div style={styles.systemNameSelected}>
                Edit {title} <span style={styles.systemType}>({type})</span>
              </div>
            </Button>
          </div>
          <Clearfix/>
          <DeleteConfirmationModal
            show={this.state.showDeleteConfirmation}
            onCancel={this.cancelUnlink}
            onConfirm={this.unlinkSystem}
            action="Are you sure you want to unlink and delete CAZ data for "
            itemName={title} />
        </div>
      )
    }
    return (
      <div style={styles.available} onClick={this.linkSystem}>
        <div className="snugg-select" style={{width: '15%'}}>
          <span style={styles.checkbox} />
        </div>
        <div style={styles.actionContainer}>
          <div style={styles.systemName}>
            Add {title} <span style={styles.systemType}>({type})</span>
          </div>
        </div>
        <Clearfix/>
      </div>
    )
  }

}

const styles = {
  selected: {
    // border: `${Color(palette.BEIGE).darken(0.1).rgbString()} 1px solid`,
    // marginTop: -1,
    // backgroundColor: palette.BEIGE
  },
  checkboxSelected: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  systemName: {
    display: 'block',
    color: '#333',
    paddingTop: 13,
    paddingLeft: 6
  },
  systemNameSelected: {
    paddingTop: 6,
  },
  actionContainer: {
    float: 'right',
    width: '85%'
  },
  systemType: {
    textTransform: 'uppercase',
    fontWeight: '.85em',
    color: '#999'
  },
  action: {
    fontWeight: 400,
    borderRadius: 0,
    float: 'left',
    paddingBottom: 12,
    paddingLeft: 5,
    textAlign: 'left',
    backgroundColor: 'transparent',
    ':hover': {
      backgroundColor: Color(palette.ORANGE).lighten(0.15).rgbString()
    },
    ':active': {
      backgroundColor: Color(palette.ORANGE).darken(0.15).rgbString()
    },
  },
  available: {
    ':hover': {
      backgroundColor: Color(palette.YELLOW).lighten(0.3).rgbString(),
      cursor: 'pointer'
    }
  }
}
