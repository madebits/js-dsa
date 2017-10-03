// https://en.wikipedia.org/wiki/Binary_search_tree

const BinaryTree = require('./BinaryTree')

class BinarySearchTree extends BinaryTree {
  constructor(value = null, comparer = null) {
    super(value, null, null)
    this._comparer = comparer || ((a, b) => a === b ? 0 : (a < b ? 1 : -1)) // min tree
    this.parent = null // we need parent for remove
  }

  _compare(other) {
    const res = this._comparer(this.value, other)
    // map to set {-1, 0, 1}
    if (res < 0) return -1 // other is smaller
    if (res > 0) return 1 // other is greater
    return res
  }

  // O(log(n)) worst: O(n)
  find(value) {
    switch (this._compare(value)) {
      case 0:
        return this
      case -1:
        return this.left.find(value)
      case 1:
        return this.right.find(value)
    }
    return null
  }

  find2(value) {
    let current = this
    while (current) {
      switch (current._compare(value)) {
        case 0:
          return current
        case -1:
          current = current.left
          break
        case 1:
          current = current.right
          break
      }
    }
    return null
  }

  contains(value) {
    return !!this.find2(value)
  }

  get min() {
    return !this.left ? this : this.left.min
  }

  get max() {
    return !this.right ? this : this.right.max
  }

  insert(value) {
    if (this.value === null) { // corner case
      this.value = value
      return this
    }
    switch (this._compare(value)) {
      case 0:
        // comment break to allow non-unique values
        break
      case -1:
        if (this.left) {
          return this.left.insert(value)
        } else {
          this.left = new BinarySearchTree(value, this.comparer)
          this.left.parent = this // for remove
          return this.left
        }
      case 1:
        if (this.right) {
          return this.right.insert(value)
        } else {
          this.right = new BinarySearchTree(value, this.comparer)
          this.right.parent = this // for remove
          return this.right
        }
    }
    return this
  }

  _replaceParentNode(node) {
    if (this.parent) {
      if (this === this.parent.left) {
        this.parent.left = node
      } else {
        this.parent.right = node
      }
    }
    if (node) {
      node.parent = this.parent
    }
  }

  remove(value) {
    switch (this._compare(value)) {
      case 0:
        if (this.left && this.right) {
          const successor = this.min
          this.value = successor.value
          successor.delete(value)
        } else if (this.left) {
          this._replaceParentNode(this.left)
        } else if (this.right) {
          this._replaceParentNode(this.right)
        } else {
          this._replaceParentNode(null)
        }
        break
      case -1:
        this.left.remove(value)
        break
      case 1:
        this.right.remove(value)
        break
    }
  }
}

module.exports = BinarySearchTree
