import React, {PropTypes} from 'react'
import {Link} from 'react-router'
import {connect} from 'snugg-redux'
import {isEmpty} from 'lodash'
import {Icon, Col, DeleteButton} from 'ui'
import {dispatchSave} from 'data/actions'

@connect(null, {dispatchSave})
export default class FinancingCard extends React.Component {

  static propTypes = {
    editable: PropTypes.bool,
    template: PropTypes.object,
  };

  handleDelete = (e) => {
    e.preventDefault()
    const {props: {template}} = this
    this.props.dispatchSave('financingTemplates', {
      id: template.get('id'),
      deleted_at: new Date()
    })
  }

  getHeader = (formattedTemplate, editable) => {
    return (
      <div className="card-header">
        {formattedTemplate.title || 'Untitled'}
        {editable && <Icon type="edit" size={13} />}
      </div>
    )
  };

  getBody = (formattedTemplate) => {
    return (
      <ul>
        <li>Min. FICO score:
          <span className="value">{formattedTemplate.min_fico_score}</span>
        </li>
        <li>Cash down:
          <span className="value">{formattedTemplate.min_cash_down}</span>
        </li>
        <li>Rate:
          <span className="value">{formattedTemplate.rate}</span>
        </li>
        <li>Closing cost:
          <span className="value">{formattedTemplate.closing_cost}</span>
        </li>
        <li>Min amount:
          <span className="value">{formattedTemplate.min_purchase}</span>
        </li>
        <li>Max amount:
          <span className="value">{formattedTemplate.max_purchase}</span>
        </li>
      </ul>
    )
  }

  // TODO: hook up delete button to database.
  getFooter = (formattedTemplate) => {
    if (formattedTemplate.type === 'program') {
      return null
    }

    return null
    // return (
    //   <div className="card-footer">
    //     <DeleteButton
    //       className="card-delete float-right"
    //       onClick={this.handleDelete} />
    //   </div>
    // )
  };

  render() {
    const {template, editable} = this.props
    const formattedTemplate = template.toJS()

    if (isEmpty(formattedTemplate)) {
      return null
    }
    if (editable) {
      return (
        <Col sm={6} md={4} lg={3}>
          <Link className="card card-fluid"
            to={`/settings/financing/edit/${formattedTemplate.id}`}
            title={`Edit ${formattedTemplate.title || 'Untitled'}`}>
            {this.getHeader(formattedTemplate, editable)}
            {this.getBody(formattedTemplate)}
            {this.getFooter(formattedTemplate, editable)}
          </Link>
        </Col>
      )
    }
    return (
      <Col sm={6} md={4} lg={3}>
        <div className="card card-fluid card-readonly">
          {this.getHeader(formattedTemplate)}
          {this.getBody(formattedTemplate)}
          {this.getFooter(formattedTemplate)}
        </div>
      </Col>
    )
  }
};
