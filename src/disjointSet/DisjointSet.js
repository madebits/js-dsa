// https://en.wikipedia.org/wiki/Disjoint-set_data_structure
class DisjointSetTree {
  constructor(value) {
    this.value = value
    this.parent = null
    this.children = new Set()
    this.rank = 0
  }

  get isRoot() {
    return !this.parent
  }

  // root represents this set and this item
  get root() {
    let current = this
    while (!current.isRoot) {
      current = current.parent
    }
    return current
  }

  get size() {
    let size = 1
    this.children.forEach(child => {
      size += child.size
    })
    return size
  }

  addChild(tree) {
    if (tree.parent) {
      tree.parent.children.delete(tree)
    }
    tree.parent = this
    tree.rank = 0
    this.children.add(tree)
    return this
  }

  elements(res = null) {
    res = res || []
    res.push(this)
    this.children.forEach(child => {
      child.elements(res)
    })
    return res
  }
}

class DisjointSet {
  constructor() {
    this.clear()
  }

  clear() {
    this.items = new Map()
  }

  _checkValue(value) {
    if (value === undefined || value === null) throw new Error('invalid value')
  }

  hasValue(value) {
    if (value === undefined || value === null) return false
    return this.items.has(value)
  }

  makeSet(value) {
    this._checkValue(value)
    if (this.items.has(value)) return this
    const tree = new DisjointSetTree(value)
    this.items.set(value, tree)
    return this
  }

  _rootTree(value, compressPath = true) {
    if (!this.hasValue(value)) return null
    const tree = this.items.get(value)
    const root = tree.root
    if (compressPath && (tree !== root) && (tree.parent !== root)) {
      root.addChild(tree) // flatten
    }
    return root
  }

  _rootTrees(value1, value2) {
    const root1 = this._rootTree(value1)
    if (!root1) throw new Error(`${value1} not in set`)
    const root2 = this._rootTree(value2)
    if (!root2) throw new Error(`${value2} not in set`)
    return { root1, root2, sameSet: root1 === root2 }
  }

  // finds set representative root value for value
  find(value) {
    const root = this._rootTree(value, true)
    return root ? root.value : null
  }

  // return false if same set, true if merged
  union(value1, value2) {
    const {root1, root2, sameSet} = this._rootTrees(value1, value2)
    if (sameSet) return false

    const rank1 = root1.rank
    const rank2 = root2.rank

    const newRoot = rank1 < rank2 ? root2 : root1
    newRoot.addChild(newRoot === root1 ? root2 : root1)
    if (rank1 === rank2) {
      newRoot.rank++
    }
    return true
  }

  sameSet(value1, value2) {
    return this._rootTrees(value1, value2).sameSet
  }

  isRoot(value) {
    return this.hasValue(value) && this.items.get(value).isRoot
  }

  get roots() {
    return Array.from(this.items.entries()).filter(_ => _[1].isRoot).map(_ => _[0])
  }

  elements(value) {
    const root = this._rootTree(value, true)
    return root ? root.elements().map(_ => _.value) : null
  }

  size(value) {
    const root = this._rootTree(value, true)
    return root ? root.size : -1
  }

  toString() {
    let text = ''
    const roots = this.roots
    roots.forEach(root => {
      text += `${root}: {${this.elements(root).join(', ')}}; `
    })
    return text
  }
}

module.exports = DisjointSet
