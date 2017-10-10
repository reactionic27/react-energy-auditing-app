import React from 'react'
import {Link} from 'react-router'
import {Grid, Row, Col} from 'react-bootstrap'


export default function HesHasNoAssessorId() {
  return (
    <Grid fluid>
      <Row>
        <Col xs={8}>
          <h2>Start offering the Home Energy Score with your audits.</h2>
          <h3>About the score</h3>
          <p>
            The U.S. Department of Energy's (DOE's) Home Energy Score (HEScore) provides
            information that helps homeowners understand their home's energy
            efficiency and how to improve it.
          </p>
          <p>
            After an in-home energy assessment by a qualified home energy
            assessor (“Assessor”), homeowners will receive a score that rates
            their home on a simple 1 to 10 scale. A score of a “1” represents
            the least energy efficient home and a “10” represents the most energy efficient home.
          </p>
          <p>
            <a href="http://energy.gov/eere/buildings/home-energy-score-frequently-asked-questions-partners#1" target="_blank">
              To learn more, visit this FAQ page for the Home Energy Score.
            </a>
          </p>

          <h3 style={{marginTop: 50}}>Getting Started</h3>
          <p>You'll first need an assessor ID from the Department of Energy to generate a Home Energy Score. Visit <a href="http://homeenergyscore.gov" target="_blank">homeenergyscore.gov</a> for more information.</p>
          <p>
            <strong>Already have a HES assessor ID?</strong> Enter it in <Link to="/settings/">your profile settings</Link>
          </p>
          <p>
            <strong>Don't have a HES assessor ID? </strong><a href="http://energy.gov/eere/buildings/home-energy-score-information-interested-assessors" target="_blank">Learn how to get one here</a>.
          </p>
        </Col>
      </Row>
    </Grid>
  )
}
