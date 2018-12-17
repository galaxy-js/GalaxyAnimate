import GalaxyAnimateError from './GalaxyAnimateError.js'
import AnimateEvent from './AnimateEvent.js'

export default class GalaxyAnimate {
  constructor (animations) {
    this.animations = animations
  }

  animate ($element, animationHook) {
    const animationEffect = $element.animate(
      animationHook.keyframes,
      animationHook.duration || animationHook.options
    )

    return new Promise(resolve => {
      $element.dispatchEvent(new AnimateEvent('animatestart', $element, animationEffect))

      animationEffect.addEventListener('finish', () => {
        $element.dispatchEvent(new AnimateEvent('animateend', $element, animationEffect))
        resolve()
      })
    })
  }

  resolve (animation) {
    if (!(animation in this.animations)) {
      throw new GalaxyAnimateError(`Unknown animation name '${animation}'`)
    }

    let { onRemove, onAdd } = this.animations[animation]

    if (onRemove && typeof onRemove === 'string') {
      onRemove = this.resolve(onRemove).onRemove
    }

    if (onAdd && typeof onAdd === 'string') {
      onAdd = this.resolve(onAdd).onAdd
    }

    return { onRemove, onAdd }
  }
}
