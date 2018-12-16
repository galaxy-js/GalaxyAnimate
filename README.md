# GalaxyAnimate

  Experimental native web animations for GalaxyJS

## Installation and usage

```js
import { setup, html, GalaxyElement } from 'https://cdn.jsdelivr.net/gh/LosMaquios/GalaxyJS/dist/galaxy.esm.js'
import { AnimateDirective, GalaxyAnimate } from '<animate-cdn>'

class AnimatedElement extends GalaxyElement {
  static get template () {
    return html`
      <h1 *animate="fade" *if="show">Hi or bye?</h1>
      <button @click="show = !show">Toggle</button>
    `
  }

  constructor () {
    super()

    this.state = {
      show: true
    }
  }
}

setup({
  root: AnimatedElement,
  directives: [
    AnimateDirective
  ],
  plugins: {

    // Plugin name should be `$animate`
    $animate: new GalaxyAnimate({
      fadeIn: {
        onAdd: {
          keyframes: [
            { opacity: 0 },
            { opacity: 1 }
          ],
          duration: 300
        }
      },
      fadeOut: {
        onRemove: {
          keyframes: [
            { opacity: 1 },
            { opacity: 0 }
          ],
          duration: 300
        }
      },
      fade: {
        onAdd: 'fadeIn',
        onRemove: 'fadeOut'
      }
    })
  }
})
```

## Animation support

  Web Animations API is [well-supported](https://caniuse.com/#feat=web-animation) in Firefox and Chrome.
  In other browsers like Edge or Safari can be [polyfilled](https://github.com/web-animations/web-animations-js)
