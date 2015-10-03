// https://en.wikipedia.org/wiki/Binary_tree

class BinaryTree {
  constructor(value = null, left = null, right = null) {
    this.left = left
    this.right = right
    this.value = value
  }

  //////////////////////////////////////////////////////////////////////////////

  get leftHeight() {
    if (!this.left) return 0
    return this.left.height + 1
  }

  get rightHeight() {
    if (!this.right) return 0
    return this.right.height + 1
  }

  // height starts from 0
  get height() {
    return Math.max(this.leftHeight, this.rightHeight)
  }

  //////////////////////////////////////////////////////////////////////////////

  inOrderTraversal(visitorCb, stopCb = null) {
    if (stopCb && stopCb()) return
    if (!visitorCb) throw new Error('visitorCb')
    if (this.left) this.left.inOrderTraversal(visitorCb)
    visitorCb(this.value, this)
    if (this.right) this.right.inOrderTraversal(visitorCb)
  }

  preOrderTraversal(visitorCb, stopCb = null) {
    if (stopCb && stopCb()) return
    if (!visitorCb) throw new Error('visitorCb')
    visitorCb = visitorCb || this._defaultVisitorCb
    visitorCb(this.value, this)
    if (this.left) this.left.preOrderTraversal(visitorCb)
    if (this.right) this.right.preOrderTraversal(visitorCb)
  }

  postOrderTraversal(visitorCb, stopCb = null) {
    if (stopCb && stopCb()) return
    if (!visitorCb) throw new Error('visitorCb')
    visitorCb = visitorCb || this._defaultVisitorCb
    if (this.left) this.left.postOrderTraversal(visitorCb)
    if (this.right) this.right.postOrderTraversal(visitorCb)
    visitorCb(this.value, this)
  }

  // O(n)
  find(value, comparer = null) {
    comparer = comparer || ((a, b) => a > b ? -1 : (a < b ? 1 : 0))
    let foundNode = null
    this.inOrderTraversal((_, node) => {
      if (comparer(_, value) === 0) {
        foundNode = node
      }
    }, () => !!foundNode)
    return foundNode
  }

  //////////////////////////////////////////////////////////////////////////////

  get isFull() {
    if (!this.left && !this.right) return true
    if (!this.left || !this.right) return false
    return this.left.isFull && this.right.isFull
  }

  //////////////////////////////////////////////////////////////////////////////

  // not ordered here
  get ordered() {
    const all = []
    this.inOrderTraversal(_ => all.push(_))
    return all
  }

  get isLeaf() {
    return !this.left && !this.right
  }

  dump() {
    return `{ ${this.value.toString()} ${this.left
      ? this.left.dump() : '{ * }'} ${this.right
      ? this.right.dump() : '{ * }'} }`
  }

  toString() {
    return this.ordered.join(',')
  }

  //////////////////////////////////////////////////////////////////////////////
}

module.exports = BinaryTree
