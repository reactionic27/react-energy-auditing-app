import {SCREENSIZE} from 'app/lib/global-styles'

export default {

  get windowHeight() {
    return window.innerHeight;
  },

  get windowWidth() {
    return window.innerWidth
  },

  get screenSize() {
    let size = 'sm'
    if (window.innerWidth >= SCREENSIZE.LG) {
      size = 'lg'
    }
    if (window.innerWidth >= SCREENSIZE.MD) {
      size = 'md'
    }
    if (window.innerWidth < SCREENSIZE.SM) {
      size = 'xs'
    }
    return size
  }

}
