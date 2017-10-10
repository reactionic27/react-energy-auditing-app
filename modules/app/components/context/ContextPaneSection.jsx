import React from 'react'

export default class ContextPaneSection extends React.Component {

  render() {
    return (
      <div style={contextPaneStyle}>
        {this.props.children}
      </div>
    )
  }
}

const contextPaneStyle = {
  paddingTop: 5,
  paddingBottom: 15,
}
