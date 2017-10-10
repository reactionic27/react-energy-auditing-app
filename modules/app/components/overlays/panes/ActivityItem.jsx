import React from 'react'
import {View, Badge} from 'ui'
import Radium from 'radium'
import {palette} from 'app/lib/global-styles'
import * as f from 'data/formatters'
import {connect} from 'snugg-redux'
import moment from 'moment'
import {Map as IMap} from 'immutable'
import Linkify from 'linkifyjs/react'

@Radium
@connect((state, {item}) => {
  const account_id = item.get('account_id')
  const type = f.activityFeed.activityType(item)
  const user = account_id && state.fn.accountById(account_id)
  const isProgramAdmin = f.account.isProgramAdmin(user || IMap())
  const userName = type === 'probot' ? 'Probot' : user && user.get('first_name')
  const message = item.get('message')
  const time = moment.utc(item.get('created_at')).format('hh:mm a')
  return {
    type,
    userName,
    message,
    time,
    fileName: item.get('file_name'),
    fileUrl: item.get('file_url'),
    isProgramAdmin,
  }
})
export default class ActivityItem extends React.Component {
  render() {
    const {userName, type, message, time, fileName, fileUrl, isProgramAdmin} = this.props
    const options = {ignoreTags: ['style', 'script', 'a'], nl2br: true}
    return (
      <View style={styles.base} className="animated fadeIn slow">
        <div style={styles.header}>
          {userName}
          {isProgramAdmin ?
            <Badge style={{float: 'none', marginLeft: 5}}>PROGRAM ADMIN</Badge>
            : null
          }
          <span style={styles.time}>{time}</span>
        </div>
        {type === 'file' ?
          <div style={styles.file}> Uploaded <a href={fileUrl} style={{cursor: 'pointer'}} target="_blank">{fileName}</a></div>
          :
          <div style={{...styles.message, ...styles[type]}}>
            <Linkify options={options}>
              {message}
            </Linkify>
          </div>
        }
      </View>
    )
  }
}

const styles = {
  base: {
    fontSize: 12,
    paddingBottom: 10,
    marginBottom: 10,
    fontWeight: 400
  },
  header: {
    fontWeight: 600,
    color: '#000',
    paddingBottom: 5
  },
  time: {
    color: '#9B9B9B',
    paddingLeft: 10,
    float: 'right',
    fontWeight: 400
  },
  message: {
    paddingBottom: 5
  },
  file: {
    fontStyle: 'italic',
    paddingBottom: 2,
    display: 'block'
  },
  system: {
    color: '#777',
    backgroundColor: palette.BEIGE,
    paddingTop: 4,
    paddingRight: 4,
    paddingBottom: 4,
    paddingLeft: 4,
    borderRadius: 3
  }
}
