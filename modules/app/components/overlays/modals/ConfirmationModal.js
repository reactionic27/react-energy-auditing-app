import React, { Component, PropTypes } from 'react';
import {Modal} from 'react-bootstrap'
import {Row, Col, Button} from 'ui'
import Color from 'color'
import {palette} from 'app/lib/global-styles'

export default class ConfirmationModal extends Component {

  static propTypes = {
    title: PropTypes.string,
    cancelText: PropTypes.string,
    confirmText: PropTypes.string,
    onCancel: PropTypes.func,
    onConfirm: PropTypes.func,
    hideActionButtons: PropTypes.bool
  };

  static defaultProps = {
    cancelText: 'Cancel',
    confirmText: 'Confirm',
    confirmColor: 'auto',
    cancelColor: Color(palette.ALERTRED).clearer(0.2).darken(0.1).rgbString(),
    hideActionButtons: false
  };

  render() {
    const {
      props: {
        title, children, show,
        onCancel, onConfirm,
        cancelText, confirmText,
        confirmColor, cancelColor,
        hideActionButtons
      }
    } = this
    return (
      <Modal show={show} bsClass="confirmation modal">
        {title &&
          <Modal.Header>
            {title}
          </Modal.Header>
        }
        <Modal.Body style={{fontSize: '0.9em'}}>
          {children}
        </Modal.Body>
        {hideActionButtons ? null : <Modal.Footer style={{padding: 0}}>
          <Row>
            {onCancel ? <Col xs={onConfirm ? 6 : 12} noGutter={onConfirm ? ['alRight'] : []}>
              <Button
                onClick={onCancel}
                borderRadius="0px"
                variant="light"
                customStyle={{
                  fontWeight: 400,
                  color: cancelColor,
                  borderRight: '1px solid #ccc'
                }}
                label={cancelText}
                size="lg"
                isFlat />
            </Col> : null}
            {onConfirm ? <Col xs={onCancel ? 6 : 12} noGutter={onCancel ? ['alLeft'] : []}>
              <Button
                onClick={onConfirm}
                variant="light" borderRadius="0px"
                customStyle={{
                  fontWeight: 400,
                  color: confirmColor,
                }}
                label={confirmText}
                size="lg"
                isFlat />
            </Col> : null}
          </Row>
        </Modal.Footer>}
      </Modal>
    );
  }
}

