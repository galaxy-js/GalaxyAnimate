import { GalaxyPlugin } from 'https://cdn.jsdelivr.net/gh/LosMaquios/GalaxyJS/dist/galaxy.esm.js'

// Patch elements
import './monkey-patcher.js'

import AnimateDirective from './AnimateDirective.js'
import GalaxyAnimate from './GalaxyAnimate.js'

/**
 * Export main classes
 */
export { AnimateDirective, GalaxyAnimate }

/**
 * Export plugin
 */
export default class GalaxyAnimatePlugin extends GalaxyPlugin {
  static init ({ directives }) {
    this.$animate = new GalaxyAnimate(this.$options)

    // Install directive
    directives.push(AnimateDirective)
  }

  static install (GalaxyElement) {
    GalaxyElement.prototype.$animate = this.$animate
  }
}
