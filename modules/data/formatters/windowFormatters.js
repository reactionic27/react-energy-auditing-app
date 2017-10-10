import _ from 'lodash'

export function sidesExceedingAreaPercent(win) {
  const sides = _.compact(['north', 'east', 'west', 'south'].map(function(side) {
    if (win.length === 1) {
      return win[0][`window_${side}_area_percent`] > 100 ? side : ''
    } else if (win.length === 2) {
      return parseFloat(win[0][`window_${side}_area_percent`]) + parseFloat(win[1][`window_${side}_area_percent`]) > 100 ? side : ''
    }
  }))

  return sides
}

export function getSidesString(sides) {
  if (sides.length > 1) {
    return sides.map(function(side, index) {
      if (index === sides.length - 1) {
        return side
      } else if (index === sides.length - 2) {
        return `${side} and `
      } else {
        return `${side}, `
      }
    }).join('')
  } else {
    return sides
  }
}


