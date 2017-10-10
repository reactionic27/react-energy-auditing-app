import React from 'react'
import _ from 'lodash'
import marked from 'marked'
import DraftEditor from 'app/components/DraftEditor'
import pure from 'pure-render-decorator'

/* TODO
 * Pass in sanitizeHtml fn as a prop
 * make activeActions isActive a mixin when publishing?
 * Is there a more DRY way so I don't have to pass in h3, bold, .. to isActive?
   I could make a component, but this is nice b/c it's just html markup, which needs to be customizable
 */
@pure
export default class ContentEditable extends React.Component {

  state = {
    actions: []
  };

  static contextTypes = {
    printing: React.PropTypes.bool
  };

  setActiveActions(actions) {
    this.setState({actions: actions})
  }

  isActive(action) {
    return _.includes(this.state.actions, action) ? ' active' : ''
  }

  renderPrint() {
    return <div dangerouslySetInnerHTML={{__html: marked(this.props.value || '')}} />
  }

  render() {
    let {value, className} = this.props
    if (this.props.printing) {
      return this.renderPrint()
    }
    return (
      <DraftEditor
        className={`inline-editable ${className || ''}`}
        onChange={this.props.onChange}
        value={value}
        placeholder="Insert text here..."
        spellCheck />
    )
  }
}
