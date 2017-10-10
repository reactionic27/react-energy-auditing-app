import React, {PropTypes} from 'react'
import invariant from 'fbjs/lib/invariant'
import {RRow, RCol} from 'ui'
import pure from 'pure-render-decorator'

@pure
export default class ReportNotes extends React.Component {

  static contextTypes = {
    printing: PropTypes.bool
  };

  static propTypes = {
    uuid: PropTypes.string.isRequired
  };

  render() {
    const {
      props: {uuid, field, prefixed, content, printing, hideHeader},
    } = this
    invariant(
      !printing || content,
      'The "content", a string of html must be specified when printing'
    )
    const rowStyle = !printing || prefixed ? styles.prefixed : null
    const headerStyle = printing ? styles.notesHeader : null
    return (
      <RRow style={rowStyle}>
        <RCol span={2}>
          <h2 className="notes-header" style={headerStyle}>
            {!hideHeader && field}
          </h2>
        </RCol>
        <RCol offset={2}>
          <div className="editable-container">
            {printing
              ? <div dangerouslySetInnerHTML={{__html: content}} />
              : <Snugg.Textarea bare editable field={field} uuid={uuid} />
            }
          </div>
        </RCol>
      </RRow>
    );
  }
}

const styles = {
  prefixed: {
    paddingTop: 7,
    minHeight: 80
  },
  notesHeader: {
    width: 142
  }
}
