import React from 'react'
import {SectionCard} from 'ui'

export default function RecNotes({uuid}) {
  return (
    <div>
      <SectionCard.Container>
        <SectionCard.Header title="Notes to Homeowner" field="Notes to Homeowners" />
        <SectionCard.Body>
          <Snugg.Textarea
            uuid={uuid}
            field="Notes to Homeowners"
            size={12}
            bare
            rows="7"
            placeholder="Enter text ..." />
        </SectionCard.Body>
      </SectionCard.Container>
      <SectionCard.Container>
        <SectionCard.Header title="Notes to Contractors" field="Notes to Contractors" />
        <SectionCard.Body>
          <Snugg.Textarea
            uuid={uuid}
            bare
            field="Notes to Contractors"
            size={12}
            rows="7"
            placeholder="Enter text ..." />
        </SectionCard.Body>
      </SectionCard.Container>
      <SectionCard.Container>
        <SectionCard.Header title="Why it matters" field="Why it Matters"/>
        <SectionCard.Body>
          <Snugg.Textarea
            uuid={uuid}
            field="Why it Matters"
            bare
            size={12}
            rows="7"
            placeholder="Enter text ..." />
        </SectionCard.Body>
      </SectionCard.Container>
    </div>
  )
}

RecNotes.propTypes = {
  uuid: React.PropTypes.string.isRequired
}
