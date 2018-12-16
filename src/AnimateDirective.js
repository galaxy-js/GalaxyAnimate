import { GalaxyDirective } from 'https://cdn.jsdelivr.net/gh/LosMaquios/GalaxyJS/dist/galaxy.esm.js'

export default class AnimateDirective extends GalaxyDirective {
  static get options () {
    return {
      $plain: true,
      $render: false
    }
  }

  static get is () {
    return '*animate'
  }

  init () {
    this.animate = this.$scope.$animate
    this.name = this.$value // <- animation name

    this._decorateElement()
  }

  _decorateElement () {
    const { $element } = this
    const { parentNode } = $element
    const { onAdd, onRemove } = this.animate.resolve(this.name)

    // TODO: handle `this` context
    console.log(this.$element.replaceWith)

    // Decorate add
    if (onAdd) {
      const append = parentNode.append.bind(parentNode)
      const prepend = parentNode.prepend.bind(parentNode)
      const appendChild = parentNode.appendChild.bind(parentNode)
      const insertBefore = parentNode.insertBefore.bind(parentNode)

      const add = (addFn, node) => {
        addFn(node)

        if (node === $element) {
          this.animate.animate($element, onAdd)
        }
      }

      parentNode.appendChild = node => {
        add(appendChild, node)
      }

      parentNode.append = (...nodes) => {
        nodes.forEach(node => add(append, node))
      }

      parentNode.prepend = (...nodes) => {
        nodes.forEach(node => add(prepend, node))
      }

      parentNode.insertBefore = (newChild, refNode) => {
        add(node => insertBefore(node, refNode), newChild)
      }
    }

    // Decorate remove
    if (onRemove) {
      const remove = $element.remove.bind($element)
      const removeChild = parentNode.removeChild.bind(parentNode)

      const animateRemove = remove => {
        return this.animate.animate($element, onRemove).then(remove)
      }

      $element.remove = () => {
        return animateRemove(remove)
      }

      parentNode.removeChild = child => {
        if (child === $element) {
          animateRemove(remove)
        } else {
          removeChild(child)
        }
      }
    }
  }
}
