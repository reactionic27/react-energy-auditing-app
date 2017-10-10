import React from 'react'
var Debug;

export default class DebugContainer extends React.Component {

  static contextTypes = {
    jobId: React.PropTypes.number
  };

  state = {
    ready: false
  };

  componentWillMount() {
    if (!Debug) {
      System.import('./debug').then(module => {
        Debug = module.default
        this.setState({ready: true})
      })
    } else {
      this.setState({ready: true})
    }
  }

  showDebug() {
    return <Debug {...this.props} {...this.context} />
  }

  render() {
    if (!this.state.ready) {
      return null
    }
    return (
      <div>
        {Debug ? this.showDebug() : null}
      </div>
    )
  }

};
