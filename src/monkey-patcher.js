const replaceWith = Element.prototype.replaceWith
const replaceChild = Node.prototype.replaceChild

Comment.prototype.replaceWith =
Element.prototype.replaceWith = function (newChild) {
  handleSwitch(this.parentNode, this, newChild)
}

Node.prototype.replaceChild = function (newChild, oldChild) {
  handleSwitch(this, oldChild, newChild)
}

function handleSwitch (parentNode, oldChild, newChild) {
  const refNode = oldChild.nextSibling

  oldChild.remove()

  if (oldChild.__galaxyRemoveAnimated__) {
    return oldChild.addEventListener('animateend', _ => {
      parentNode.insertBefore(newChild, refNode)
    })
  }

  parentNode.insertBefore(newChild, refNode)
}
