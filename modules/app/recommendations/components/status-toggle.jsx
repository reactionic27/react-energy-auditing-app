import React from 'react'

const RADIO_OPTIONS = [
  [1, 'Recommend'],
  [2, 'Note'],
  [3, 'Decline']
];

export default class StatusToggle extends React.Component {

  static propTypes = {
    view: React.PropTypes.oneOf(['list', 'single'])
  };

  render() {
    return (
      <div className={this.props.className}>
        <div className="span-accept span-rec">
          <Snugg.Radio
            field='Recommendation: Status'
            uuid={this.props.uuid}
            bare
            nullable={0}
            options={RADIO_OPTIONS}
            className="status-buttons" />
        </div>
      </div>
    );
  }

};
