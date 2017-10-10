import React from 'react'
import {Clearfix} from 'react-bootstrap'
import {SectionH2} from 'ui'
import Radium from 'radium'

@Radium
export default class CollectionLabel extends React.Component {
  render() {
    const {collection, uuid, deleteMin} = this.props
    return (
      <div>
        <div style={{float: 'left', display: 'inline-block', width: '75%'}}>
          <SectionH2>
            {this.props.children}
          </SectionH2>
        </div>
        <Snugg.Buttons.CollectionDelete float="right" collection={collection} uuid={uuid} min={deleteMin} />
        <Clearfix/>
      </div>
    )
  }
}
