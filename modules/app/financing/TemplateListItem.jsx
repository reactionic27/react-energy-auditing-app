import React, {PropTypes} from 'react'
import {Map as IMap} from 'immutable'
import {Link} from 'react-router'
import {formatFinancingTemplate} from 'util/formatFinancingTemplate'
import Radium from 'radium'
import {palette} from 'app/lib/global-styles'
import Color from 'color'
import {browserHistory} from 'react-router'
import {connect} from 'snugg-redux'
import {dispatchEagerCreate} from 'data/actions'

@connect(null, {dispatchEagerCreate})
@Radium
export default class TemplateListItem extends React.Component {

  static propTypes = {
    template: PropTypes.instanceOf(IMap),
    // Use these props in case you want to pass a custom list item:
    isCustom: PropTypes.bool,
    title: PropTypes.string,
    to: PropTypes.string
  };

  static contextTypes = {
    jobId: React.PropTypes.number
  };

  addFinancingProductToJob = () => {
    const {
      props: {template},
      context: {jobId}
    } = this

    // Eager create a new job financing row,
    // has its own action because we need
    // to know the order and other things.
    this.props.dispatchEagerCreate('jobFinancing', {
      ...template.toJS(),
      job_id: jobId
    })
    browserHistory.push(`/job/${jobId}/financing`)
  }

  render() {
    const {template, isCustom, title, to} = this.props

    if (isCustom) {
      return (
        <Link to={to}>
          <div style={styles.listItem}>
            <div style={styles.title}>
              {title}
            </div>
            <div style={styles.description}>
              {this.props.children}
            </div>
          </div>
        </Link>

      )
    }

    const formattedTemplate = formatFinancingTemplate(template)

    return (
      <div style={styles.listItem} onClick={this.addFinancingProductToJob}>
        <div style={styles.title}>
          {formattedTemplate.title}
        </div>
        <div style={styles.description}>
          <span>Min. FICO: {formattedTemplate.min_fico_score} • </span>
          <span>Min. Cash Down: {formattedTemplate.min_cash_down} • </span>
          <span>Rate: {formattedTemplate.rate} • </span><br/>
          <span>Term: {formattedTemplate.term} • </span>
          <span>Min: {formattedTemplate.min_purchase} • </span>
          <span>Max: {formattedTemplate.max_purchase} </span>
        </div>
      </div>
    )
  }
};

const styles = {
  listItem: {
    position: 'relative',
    padding: 10,
    borderRadius: '6px 6px 0 0',
    borderBottom: `1px solid ${Color(palette.BEIGE).darken(0.05).rgbString()}`,
    marginBottom: -1,
    display: 'block',
    color: 'inherit',
    ':hover': {
      zIndex: 1,
      cursor: 'pointer',
      // backgroundColor: palette.ORANGE,
      boxShadow: '0 0 10px rgba(0,0,0,0.3)',
    },
    ':active':{
      zIndex: 1,
      boxShadow: '0 0 20px rgba(0,0,0,0.5)',
    }
  },
  title: {
    fontSize: 15,
    fontWeight: 600,
    paddingBottom: 5,
    color: 'initial'
  },
  description: {
    fontSize: 11,
    color: '#888'
  }
}
