import React from 'react'
import {connect} from 'snugg-redux'

@connect((state, {uuid}) => {
  const rec = state.fn.recByUuid(uuid)
  return {
    hasWhyItMatters: Boolean((rec.get('why_it_matters') || '').trim())
  }
})
export default class AdditionalNotesReportSidebar extends React.Component {

  static contextTypes = {
    printing: React.PropTypes.bool.isRequired
  };

  render() {
    const {
      context: {printing},
      props: {uuid, hasWhyItMatters}
    } = this
    const showWhyItMatters = !printing || hasWhyItMatters
    return (
      <div>
        <div className="recommendation-category-label">
          Additional Notes
        </div>
        <h3 className="editable-container">
          <Snugg.Input field="Report: Additional Notes Overview Title" editable bare/>
        </h3>
        <Snugg.Textarea
          field="Report: Additional Notes Overview"
          editable={!printing}
          printing={printing}
          bare />
        <div>
          {showWhyItMatters && <h3>Why it matters</h3>}
          {showWhyItMatters && (
            <div className="report-why-it-matters">
              <Snugg.Textarea
                field="Why it Matters"
                uuid={uuid}
                bare
                editable={!printing}
                printing={printing}
                placeholder="Click to Edit"
                rows="4" />
            </div>
          )}
        </div>
      </div>
    );
  }
}
