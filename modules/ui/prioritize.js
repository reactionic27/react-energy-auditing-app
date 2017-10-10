import React, {PropTypes} from 'react'
import {connect} from 'snugg-redux'
import {UpDown} from 'ui'
import {swapOrder} from 'data/actions'

@connect(null, {swapOrder})
class PrioritizeButton extends React.Component {

  static contextTypes = {
    jobId: PropTypes.number.isRequired
  };

  static propTypes = {
    uuid: PropTypes.string.isRequired,
    direction: PropTypes.oneOf(['up', 'down']).isRequired,
    nextUuid: PropTypes.string,
    prevUuid: PropTypes.string,
    table: PropTypes.oneOf(['concern', 'recommendations', 'recommendationCaptionRows', 'jobFinancing']).isRequired
  };

  isDisabled = () => {
    const {direction, prevUuid, nextUuid} = this.props
    return (direction === 'up' && !prevUuid) || (direction === 'down' && !nextUuid)
  }

  moveRecommendation = (e) => {
    e.preventDefault()
    let swapWithUuid = this.props.direction === 'up'
      ? this.props.prevUuid
      : this.props.nextUuid
    if (!swapWithUuid) return
    const {
      props: {table, uuid},
      context: {jobId}
    } = this
    this.props.swapOrder({
      table,
      job_id: jobId,
      uuid_a: uuid,
      uuid_b: swapWithUuid
    })
  }

  render() {
    const {direction} = this.props
    return (
      <UpDown
        direction={direction}
        onClick={this.moveRecommendation}
        disabled={this.isDisabled()} />
    )
  }
}

export default function Prioritize(props) {
  return (
    <div style={styles.prioritizeStyles}>
      <PrioritizeButton direction='up' {...props} />
      <PrioritizeButton direction='down' {...props} />
    </div>
  )
}

const styles = {
  prioritizeStyles: {
    width: 45,
    float: 'left',
    paddingRight: 8
  }
}
