import React, {PropTypes} from 'react'

export default function Icon(props) {
  const {type, animation, customClass, padding, float, size, rotate, style} = props
  const animate = iconAnimation[animation] ?  iconAnimation[animation] : ''
  const classNames = iconClass[type] + " " + animate + " " + customClass
  return (
    <i
      onClick={props.onClick}
      className={classNames}
      style={{
        display:'inline-block',
        fontSize: size,
        padding: padding,
        float: float,
        transform: `rotate(${rotate}deg)`,
        ...style
      }}/>
  )
}

Icon.propTypes = {
  type: PropTypes.string.isRequired,
  animation: PropTypes.string,
  size: PropTypes.number,
  padding: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  float: PropTypes.oneOf(['left', 'right', 'none']),
  rotate: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  customClass: PropTypes.string,
}

Icon.defaultProps = {
  padding: 0,
  float: 'none',
  rotate: 0,
  style: {}
}




// Define all icons here.  Find the legend here: http://app.fontastic.me/#customize/pyFLaotCpiiNnwd2ERQ4v3
const iconClass = {

  // Icons for main app sections
  jobs: 'ico-budicon-47',
  templates: 'ico-budicon-63',
  duplicate: 'ico-budicon-63',
  input: 'ico-budicon-5',
  report: 'ico-budicon-49',
  refine: 'ico-budicon-51',
  financing: 'ico-budicon-12',
  modeling: 'ico-budicon-48',
  support: 'ico-budicon-50',
  settings: 'ico-budicon-8',
  debug: 'ico-budicon-39',


  // Support
  liveChat: 'ico-budicon-7',
  help: 'ico-budicon-55',
  phone: 'ico-budicon-57',
  mail: 'ico-budicon-58',


  // Settings types
  user: 'ico-budicon-71',
  company: 'ico-budicon-72',
  financingTemplate: 'ico-budicon-13',

  // Common actions/tasks
  export: 'ico-budicon',
  upload: 'ico-budicon-14',
  transfer: 'ico-budicon-1',
  search: 'ico-budicon-2',
  edit: 'ico-budicon-64',
  addNew: 'ico-budicon-68',
  delete: 'ico-budicon-62',
  sortUp: 'ico-budicon-66',
  sortDown: 'ico-budicon-67',
  dradUpDown: 'ico-budicon-83',
  metrics: 'ico-budicon-43',
  logout: 'ico-budicon-9',
  lock: 'ico-budicon-9',
  alerts: 'ico-budicon-27',
  activity: 'ico-budicon-79',
  attachment: 'ico-budicon-80',
  close: 'ico-budicon-17',
  context: 'ico-budicon-61',

  // report icons
  reportSettings: 'ico-budicon-39',
  print: 'ico-budicon-42',
  present: 'ico-budicon-6',
  photo: 'ico-budicon-10',

  // Statuses
  loading: 'ico-load-d',
  missing: 'ico-budicon-17',
  completed: 'ico-budicon-16',
  CAZFailed: 'ico-budicon-29',
  CAZNotTested: 'ico-budicon-31',
  CAZWarning: 'ico-budicon-69',
  warning: 'ico-budicon-78',

  // Navigation and inlays
  expand: 'ico-budicon-74',
  collapse: 'ico-budicon-75',
  hamburgerMenuThin: 'ico-budicon-11',
  hamburgerMenu: 'ico-budicon-32',
  more: 'ico-budicon-76',

  // Circular status
  circleCross: 'ico-budicon-29',
  circleCheck: 'ico-budicon-30',
  circleDash: 'ico-budicon-28',
  circlePlus: 'ico-budicon-3',
  circleNo: 'ico-budicon-31',

  // Bare directional
  up: 'ico-budicon-23',
  right: 'ico-budicon-22',
  down: 'ico-budicon-21',
  left: 'ico-budicon-24',
  squareCheck: 'ico-budicon-25',

  // Boxed directional
  squareDown: 'ico-budicon-34',
  squareUp: 'ico-budicon-35',
  squareRight: 'ico-budicon-36',
  squareLeft: 'ico-budicon-37',
  placemarker: 'ico-budicon-41',

  // Misc reusable icons
  checkMark: 'ico-budicon-16',
  plus: 'ico-budicon-18',
  dash: 'ico-budicon-19',
  heart: 'ico-budicon-20',
  calendar: 'ico-budicon-40',
  chart: 'ico-budicon-44',
  fourSquares: 'ico-budicon-33',
  grid: 'ico-budicon-38',
  mapAddress: 'ico-budicon-4',
  mapIt: 'ico-budicon-41',
  gauge: 'ico-budicon-45',
  star: 'ico-budicon-82'
}

// Define all
const iconAnimation = {
  spin: 'ico-spin'
}
