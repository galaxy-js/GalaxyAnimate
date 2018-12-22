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

    this._patchElement()
  }

  _patchElement () {
    const { $element } = this
    const { parentNode } = $element
    const { onAdd, onRemove } = this.animate.resolve(this.name)

    // Patch add
    if (onAdd) {
      const { append, prepend, appendChild, insertBefore } = parentNode

      const add = (context, addFn, node) => {
        addFn.call(context, node)

        if (node === $element) {
          this.animate.animate($element, onAdd)
        }
      }

      parentNode.append = function (...nodes) {
        nodes.forEach(node => add(this, append, node))
      }

      parentNode.prepend = function (...nodes) {
        nodes.forEach(node => add(this, prepend, node))
      }

      parentNode.appendChild = function (node) {
        add(this, appendChild, node)
      }

      parentNode.insertBefore = function (newChild, refNode) {
        add(this, function (node) {
          insertBefore.call(this, node, refNode)
        }, newChild)
      }
    }

    // Patch remove
    if (onRemove) {
      const { remove } = $element
      const that = this

      $element.remove = function () {
        return that.animate
          .animate($element, onRemove)
          .then(() => { remove.call(this) })
      }

      parentNode.removeChild = function (child) {
        // Here we delegate removing to the `remove` decorated method
        // for correct handling animation
        child.remove()
      }
    }
  }
}
