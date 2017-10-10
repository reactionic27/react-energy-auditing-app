import React, { Component, PropTypes } from 'react';
import ConfirmationModal from './ConfirmationModal'
import Color from 'color'
import {palette} from 'app/lib/global-styles'

export default class DeleteConfirmationModal extends Component {

  static propTypes = {
    action: PropTypes.string,
    itemName: PropTypes.string,
    onCancel: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired
  };

  static defaultProps = {
    action: 'Are you sure you want to delete',
    itemName: 'this',
    confirmText: 'Delete',
    confirmColor: Color(palette.ALERTRED).clearer(0.2).darken(0.1).rgbString(),
    cancelText: "Cancel",
    cancelColor: 'auto'
  };

  render() {
    const {itemName, action, children} = this.props
    return (
      <ConfirmationModal {...this.props}>
        {children ?
          children
          :
          <span>{action} {itemName}?</span>
        }
      </ConfirmationModal>
    )
  }
}
