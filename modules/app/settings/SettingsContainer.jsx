import React from 'react'
import DocumentTitle from 'react-document-title'

export default class SettingsContainer extends React.Component {

  render() {
    return (
      <DocumentTitle title='Settings | Snugg Pro'>
        <div className="content animated fadeIn">
          {this.props.children}
        </div>
      </DocumentTitle>
    )
  }

}
