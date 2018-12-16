const replaceWith = Element.prototype.replaceWith
const replaceChild = Node.prototype.replaceChild

Comment.prototype.replaceWith =
Element.prototype.replaceWith = function (newChild) {
  handleSwitch(this.parentNode, this, newChild)
}

Node.prototype.replaceChild = (newChild, oldChild) => {
  handleSwitch(oldChild.parentNode, oldChild, newChild)
}

function handleSwitch (parentNode, oldChild, newChild) {
  const refNode = oldChild.nextSibling
  const ret = oldChild.remove()

  if (ret instanceof Promise) {
    return ret.then(() => {
      parentNode.insertBefore(newChild, refNode)
    })
  }

  parentNode.insertBefore(newChild, refNode)
}
