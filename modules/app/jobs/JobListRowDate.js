import React from 'react'
import cx from 'classnames'
import moment from 'moment'

export default class JobRowDate extends React.Component {

  // TODO: trying to get jobs screen to render. Figure out date or string later
  // static propTypes = {
  //   serviceTime: React.PropTypes.instanceOf(Date)
  //   // serviceTime: React.PropTypes.string.isRequired
  // };


  render() {
    let {serviceTime} = this.props
    if (!serviceTime) {
      return (
        <div>
          {/* Cal Icon */}
          <div className="jl-date-and-time visible-xs-block" style={{height: 74}}>
          </div>
          <div className='jl-date jl-box hidden-xs' style={{height: 38}}/>
        </div>
      )
    }
    return (
      <div>
        {/* Cal Icon */}
        <div className="jl-date-and-time visible-xs-block">
          <div className="vevent" id="hcalendar-1">
            <time dateTime={moment.utc(serviceTime).format('MM-DD-YYYY')} className="dtstart">
              <div className="cal-icon">
                <div className="cal-icon__month">
                  {moment.utc(serviceTime).format('MMM')} {moment.utc(serviceTime).format('YYYY')}
                </div>
                <div className="cal-icon__month-day">
                  {moment.utc(serviceTime).format('D')}
                </div>
                <div className="cal-icon__week-day-and-time">
                  {moment.utc(serviceTime).format('ddd')} {moment.utc(serviceTime).format('h:mm a')}
                </div>
              </div>
            </time>
          </div>
        </div>

        {/* Date */}
        <div className={cx('jl-date', 'jl-box', 'hidden-xs', {
          'font-weight-700' : moment.utc().isSame(moment.utc(serviceTime), 'day')
        })}>
          {moment.utc(serviceTime).calendar()}
        </div>

        {/* Time */}
        <div className="jl-time jl-box hidden-xs">
          {moment.utc(serviceTime).format('h:mm a')}
        </div>
      </div>
    )
  }
}
