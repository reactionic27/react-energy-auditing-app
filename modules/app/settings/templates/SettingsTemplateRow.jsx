import React from 'react'
import {Link} from 'react-router';
import {Map as IMap} from 'immutable'
import DeleteConfirmationModal from '../../components/overlays/modals/DeleteConfirmationModal'
import {connect} from 'snugg-redux'
import {DeleteButton} from 'ui'
import {dispatchSave} from '../../../data/actions'
@connect(null, {dispatchSave})
export default class SettingsTemplateRow extends React.Component {

  static propTypes = {
    template: React.PropTypes.instanceOf(IMap).isRequired
  };
  state = {
    showDeleteModal: false,
  };


  deleteTemplate = (e) => {
    e.preventDefault()
    this.props.dispatchSave('jobs', {id: this.props.template.toJS().id, deleted_at: new Date()})
  };

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

  render() {
    let {first_name, last_name, id} = this.props.template.toJS()
    let showDelete = this.props.showDelete;
    return (
      <div className="jl jl-single-line">
        <Link to={`/job/${id}`}>
          <div className="col-xs-8 col-no-right-gutter">
            <div className="col-sm-4 col-no-left-gutter">
              <h3 style={boxStyle}>{first_name}</h3>
            </div>
            <div className="col-sm-8 col-no-left-gutter">
              <div className="jl-discreet" style={boxStyle}>{last_name}</div>
            </div>
          </div>
          <div className="col-xs-2 col-no-left-gutter">
            <div className="pull-right" style={boxStyle}>
              {`#${id}`}
            </div>
          </div>
        </Link>
        { showDelete ?
          <div className="col-xs-2">
            <DeleteButton float="right" value={id} id={id} onClick={this.openDeleteModal} />
          </div>
          :
          <div className="col-xs-2"></div>
        }
        <DeleteConfirmationModal
          show={this.state.showDeleteModal}
          onCancel={this.closeDeleteModal}
          onConfirm={this.deleteTemplate}
          >
          Are you sure you want to delete the template named <strong>{first_name}</strong>? <br/>This will not affect any jobs that were created from the template.
        </DeleteConfirmationModal>
      </div>
    )
  }
}

const boxStyle = {
  paddingTop: 10
}
