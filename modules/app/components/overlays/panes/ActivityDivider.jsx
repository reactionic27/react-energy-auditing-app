import React from 'react'
import {View} from 'ui'
import Radium from 'radium'

@Radium
export default class ActivityDivider extends React.Component {

  static propTypes = {
    label: React.PropTypes.string,
    bgColor: React.PropTypes.string
  };

  static defaultProps = {
    label: 'Missing label prop!',
    bgColor: '#fff'
  }

  getSpanStyle(props) {
    return {
      ...styles.textLabel,
      backgroundColor: props.bgColor
    }
  }

  render() {
    const {label, children} = this.props
    return (
      <View className="title-divider" style={{marginTop: 10}}>
        <span style={this.getSpanStyle(this.props)}>
          {children ? children : label }
        </span>
      </View>
    )
  }
}

const styles = {
  textLabel: {
    textTransform:'uppercase',
    color: '#000',
    fontSize: 11,
    fontWeight: 700
  }
}
