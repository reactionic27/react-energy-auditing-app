import React from 'react'
import {ContextPaneSection, ContextFieldDefinition} from 'app/components/context'
import {ContextButton, BlankText, PaneH1, PaneH2, PaneH3} from 'ui'
import {Clearfix} from 'react-bootstrap'
import {JOBFORM_SECTIONS} from 'data/constants'
import RecLink from './RecLink'
export default class JobContextPane extends React.Component {

  render() {
    const {activeSection, jobId} = this.props
    if (!activeSection) {return null}

    const {helpLinks, recLinks} = JOBFORM_SECTIONS.find(section => section.label === activeSection)
    return (
      <div>
        <PaneH1>Active Section</PaneH1>
        <Clearfix/>
        <PaneH3>
          {activeSection}
        </PaneH3>
        <ContextPaneSection>
          <PaneH2>
          RELATED MEASURES
          </PaneH2>
          {recLinks.length ?
              recLinks.map((recLink, index) => {
                return <RecLink key={index} recLink={recLink} jobId={jobId} />
              })
            :
            <BlankText>No related measures</BlankText>
        }
        </ContextPaneSection>
        <ContextPaneSection>
          <PaneH2>
            KNOWLEDGE BASE FOR {activeSection}
          </PaneH2>
          {helpLinks.length ?
            helpLinks.map((helpLink, index) => {
              return (
                <ContextButton
                  href={helpLink.url}
                  target="_blank"
                  variant="link"
                  key={index}
                  label={helpLink.title}/>
              )
            })
          : <BlankText>No knowledge base articles</BlankText>
          }
        </ContextPaneSection>
        <ContextFieldDefinition />

      </div>
    )
  }
}
