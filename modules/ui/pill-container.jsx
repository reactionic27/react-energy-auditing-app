import React, {Component, PropTypes} from 'react'
import {Row, Col} from 'react-bootstrap'

// DESCRIPTION: Unlike tabs (in settings for instance) which usually changes
// an entire screen/route, this component is used for the kind of pills
// that typically toggle elements within the same screepill.
export default class PillContainer extends Component {

  static propTypes = {
    children: PropTypes.any
  };

  constructor() {
    super(...arguments)
    this.state = {
      activeTab: 0
    }
  }

  // Set the active tab on click:
  toggleTab(index) {
    return (e) => {
      e.preventDefault()
      this.setState({activeTab: index})
    }
  }

  // Show everything for each pill:
  render() {
    const validPills = filteredTabs(this.props.children)
    const pillContent = validPills[this.state.activeTab].props.children

    // Size each pill button as a percentage of the width available:
    var pillSize = (100 / validPills.length) + "%";

    if (validPills.length === 1) return pillContent

    return (
      <div>
        <Row>
          <Col sm={12} {...this.props}>
            <div className="pills">
              {validPills.map((value, index) => {
                return React.cloneElement(value, {
                  key: index,
                  active: index === this.state.activeTab,
                  onClick: this.toggleTab(index),
                  style: {width: pillSize}
                })
              })}
            </div>
          </Col>
        </Row>
        <div className="pills-content">
          {pillContent}
        </div>
      </div>
    )
  }
};

function filteredTabs(tabs) {
  if (!Array.isArray(tabs)) {
    return tabs ? [tabs] : []
  }
  return tabs.filter((tab) => !!tab)
}
