export default class AnimateEvent extends CustomEvent {
  constructor (type, animated, animation) {
    super(type)

    this.animated = animated
    this.animation = animation
  }
}
