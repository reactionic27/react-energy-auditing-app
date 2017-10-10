import React from 'react'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-mixed-backend'
import SortableItem from './SortableItem'
import {is, List} from 'immutable'

@DragDropContext(HTML5Backend)
export default class SortableList extends React.Component {

  static propTypes = {
    items: React.PropTypes.instanceOf(List).isRequired
  };

  constructor(props) {
    super(...arguments)
    this.state = {
      dragging: false,
      localItems: props.items
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!is(nextProps.items, this.props.items)) {
      if (!this.state.dragging) {
        this.setState({localItems: nextProps.items})
      }
    }
  }

  moveItem = (dragIndex, hoverIndex) => {
    const {
      state: {localItems}
    } = this;
    const dragToggle = localItems.get(dragIndex);
    this.setState({
      localItems: localItems.splice(dragIndex, 1).splice(hoverIndex, 0, dragToggle)
    })
  };

  endDrag = (props, monitor) => {
    if (!is(this.state.localItems, this.props.items)) {
      this.props.save(this.state.localItems, this.props.items, {endDragIndex: monitor.getItem().index})
    }
  };

  setDragging = (dragging: bool) => {
    this.setState({dragging})
  };

  render() {
    return (
      <div>
        {this.state.localItems.map((item: string, i) => {
          return (
            <SortableItem
              {...this.props}
              key={item}
              id={item}
              index={i}
              item={item}
              moveItem={this.moveItem}
              endDrag={this.endDrag}
              setDragging={this.setDragging}
              renderItem={this.props.renderItem} />
          )
        })}
      </div>
    )
  }
}
