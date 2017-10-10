import React from 'react'
import {View} from 'ui'
import Radium from 'radium'
import {palette} from 'app/lib/global-styles'

@Radium
export class PaneFooter extends React.Component {

  render() {
    return (
      <View style={styles.footer}>
        {this.props.children}
      </View>
    )
  }
}

const styles = {
  footer:{
    padding: '5px 5px 5px',
    backgroundColor: palette.BEIGE,
    position: 'absolute',
    bottom: 0,
    left:0,
    right: 0,
    borderTop: '1px solid #e3e3e3'
  }
}
