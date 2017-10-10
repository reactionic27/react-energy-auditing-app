import React from 'react'
import BaseAlert from './BaseAlert'

// All of the following use Bootstrap Alerts.
// Notifications are not technically overlays, they are static, inline content.
// But they stll use the underlying Bootstrap Alert component.

// These are thin messages across the top of the screen. No actions associated with them.
export const BannerNotification = (props) => (
  <BaseAlert
    type="banner"
    showCloseButton={false}
    message={props.message}
    {...props} />
)

// These are contextual, static messages within the app. No actions associated with them.
export const InlineNotification = (props) => (
  <BaseAlert
    theme="warning"
    type="inline"
    showCloseButton={false}
    message={props.message}
    title={props.title}
    {...props} />
)

// These are contextual, static messages within the app. No actions associated with them.
export const FieldAlert = (props) => (
  <BaseAlert
    theme="warning"
    type="field"
    showCloseButton={false}
    message={props.message}
    title={props.title}
    {...props} />
)

// These are dynamic alerts or warnings  that show up based on current state of the app.
// These are usually dismissable and have dispatchers and actions.
export const DynamicAlert = (props) => (
  <BaseAlert
    theme="warning"
    type="alert"
    showCloseButton
    message={props.message}
    title={props.title}
    {...props} />
)

// For internal Snugg use only.
// These are not meant to show up on production,
// only in development
export const DevNote = (props) => {
  if (IS_PRODUCTION) {
    return null
  }
  return (
    <BaseAlert
      theme="internal"
      type="inline"
      showCloseButton={false}
      message={props.message}
      title={props.title}
      {...props} />
  )
}
