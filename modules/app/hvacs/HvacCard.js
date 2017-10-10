import React, {PropTypes} from 'react'
import Radium from 'radium'
import {connect} from 'snugg-redux'
import {ANIMATION} from 'app/lib/global-styles'
import dynamicResize from 'decorators/dynamicResize'
import {DeleteButton, Card} from 'ui'
import DeleteConfirmationModal from 'app/components/overlays/modals/DeleteConfirmationModal'
import * as f from 'data/formatters'
import {dispatchCollectionDelete, dispatchLocal} from 'data/actions'
import HvacEditSystem from './HvacEditSystem'
import { scroller, Element } from 'react-scroll'


@connect((state, {uuid}) => {
  return {
    hvac: state.fn.hvacByUuid(uuid),
    newHvacUuid: state.localState.get('newHvacUuid')
  }
}, {dispatchCollectionDelete, dispatchLocal})
@Radium
@dynamicResize
export default class HvacCard extends React.Component {

  state = {
    showDeleteModal: false,
    editingHvac: false
  };

  static propTypes = {
    type: PropTypes.oneOf(['heating', 'cooling']),
    uuid: PropTypes.string.isRequired,
    jobId: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired
  };

  componentDidMount() {
    const {uuid, newHvacUuid} = this.props
    // console.log(uuid, newHvacUuid)

    if (uuid === newHvacUuid) {
      scroller.scrollTo(`hvac-card-${uuid}`, {smooth: true, duration: 200, offset: -84})
    }
  }

  // componentWillReceiveProps(nextProps) {
  //   console.log(nextProps)
  // }

  setHvacEdit = () => {
    this.setState({
      editingHvac: true
    })
  };
  clearHvacEdit = () => {
    this.setState({
      editingHvac: false
    })
    this.props.dispatchLocal('setNewHvacUuid', {uuid: null})
    scroller.scrollTo(`hvac-card-${this.props.uuid}`, {smooth: true, duration: 200, offset: -84})
  }
  closeDeleteModal = () => {
    this.setState({
      showDeleteModal: false
    })
  };

  openDeleteModal = (e) => {
    e.preventDefault()
    e.stopPropagation()
    this.setState({
      showDeleteModal: true
    })
  };

  confirmDelete = () => {
    this.closeDeleteModal()
    this.props.dispatchCollectionDelete('hvac', {
      job_id: this.props.jobId,
      uuid: this.props.uuid,
      deleted_at: new Date()
    })
  };

  render() {
    const {
      clearHvacEdit,
      setHvacEdit,
      props: { index, hvac, jobId, uuid, newHvacUuid },
      state: {editingHvac}
    } = this

    const info = f.hvac.getSimpleInfo(hvac.toJS(), index)
    const edit = editingHvac || (uuid === newHvacUuid)
    return (
      <Element name={`hvac-card-${uuid}`}>
        <div>
          {edit ?
            <div><HvacEditSystem jobId={jobId} uuid={uuid} clearHvacEdit={clearHvacEdit} /></div>
            :
            <HvacCardItem info={info} setHvacEdit={setHvacEdit} openDeleteModal={this.openDeleteModal} />
          }

          <DeleteConfirmationModal
            show={this.state.showDeleteModal}
            onCancel={this.closeDeleteModal}
            onConfirm={this.confirmDelete}
            itemName={info.title} />
        </div>
      </Element>
    );
  }
}

function HvacCardItem({info, setHvacEdit, openDeleteModal}) {
  const {name, title, equipment, action, energySource, formattedLoads} = info
  return (
    <Card.Container
      onClick={setHvacEdit}
      className="animated fadeIn slow"
      style={{marginTop: 15}}>
      <Card.Header title={name || title}>
        <div style={{float:'right'}}>
          <DeleteButton
            onClick={openDeleteModal} />
        </div>
      </Card.Header>
      <Card.Body style={styles.xsCardBody}>
        <Card.NameValue name="Type" value={equipment}/>
        <Card.NameValue name="Heating Energy" value={energySource} />
        <Card.NameValue name="Load" value={formattedLoads} />
        <Card.NameValue name="Upgrade Action" value={action} />
      </Card.Body>
    </Card.Container>
  )
}

const styles = {
  card: {
    cursor: 'pointer',
    transition: ANIMATION,
    ':hover': {
      boxShadow: '1px 1px 20px rgba(0,0,0,0.3)'
    },
    ':active': {
      boxShadow: '1px 1px 5px rgba(0,0,0,0.4)',
      transition: 'none',
    }
  },
  // For small screens only:
  xsCardBody:{
    paddingLeft: 30,
    paddingRight: 30
  }
}
