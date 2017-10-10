import React from 'react';
import {Button} from 'ui'
import {post} from '../../util/network'

export default class RemoveMigratedV5Job extends React.Component {

  static contextTypes = {
    jobId: React.PropTypes.number.isRequired
  };

  handleClick = (e) => {
    e.preventDefault()
    if (confirm('Are you sure you want to refresh any remnants of this v5 converted job?')) {
      post('/snuggadmin/remove-v5-job/' + this.context.jobId)
        .then(() => {
          window.location.href = '/job/' + this.context.jobId
        })
        .catch(e => {
          alert(e.message)
        })
    }
  };

  render() {
    return (
      <div>
        <Button onClick={this.handleClick}>
          Delete the current v5 conversion of this job.
        </Button>
      </div>
    );
  }
}
