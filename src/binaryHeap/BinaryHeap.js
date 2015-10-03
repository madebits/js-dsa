// binary tree stored as 0 based array
class BinaryTreeArray {
  constructor() {
    this.data = []
  }

  //////////////////////////////////////////////////////////////////////////////

  parentIdx(childIdx) {
    return Math.floor((childIdx - 1) / 2)
  }

  // left child index
  leftIdx(parentIdx) {
    return 2 * parentIdx + 1
  }

  // right child index
  rightIdx(parentIdx) {
    return 2 * parentIdx + 2
  }

  //////////////////////////////////////////////////////////////////////////////

  hasParent(childIdx) {
    const parentIdx = this.parentIdx(childIdx)
    return parentIdx >= 0 && parentIdx < this.data.length
  }

  hasLeft(parentIdx) {
    return this.leftIdx(parentIdx) < this.data.length
  }

  hasRight(parentIdx) {
    return this.rightIdx(parentIdx) < this.data.length
  }

  //////////////////////////////////////////////////////////////////////////////

  parent(childIdx) {
    return this.data[this.parentIdx(childIdx)]
  }

  left(parentIdx) {
    return this.data[this.leftIdx(parentIdx)]
  }

  right(parentIdx) {
    return this.data[this.rightIdx(parentIdx)]
  }

  //////////////////////////////////////////////////////////////////////////////

  // first item is root
  get root() {
    return this.count ? this.data[0] : null
  }

  set root(value) {
    this.data[0] = value
  }

  popLast() {
    return this.count ? this.data.pop() : null
  }

  // return index of new element
  pushLast(value) {
    this.data.push(value)
    return this.data.length - 1
  }

  get(idx) {
    return this.data[idx]
  }

  set(idx, value) {
    this.data[idx] = value
    return this
  }

  swap(idx1, idx2) {
    const temp = this.data[idx1]
    this.data[idx1] = this.data[idx2]
    this.data[idx2] = temp
    return this
  }

  get count() {
    return this.data.length
  }

  get isEmpty() {
    return !this.count
  }

  toString() {
    return this.data.join(',')
  }
}

//https://en.wikipedia.org/wiki/Heap_(data_structure)
class BinaryHeap {
  constructor(comparer = null) {
    this._tree = new BinaryTreeArray()
    this._comparer = comparer || ((a, b) => a === b ? 0 : (a > b ? 1 : -1)) // min
  }

  _smaller(a, b) {
    return this._comparer(a, b) < 0
  }

  get count() {
    return this._tree.count
  }

  get isEmpty() {
    return this._tree.isEmpty
  }

  get peek() {
    return this._tree.root
  }

  // min / max
  poll() {
    if (this.count <= 1) return this._tree.popLast()
    const item = this.peek
    // get last node to top and sift down the sieve
    this._tree.root = this._tree.popLast()
    this._siftDown(0)
    return item
  }

  // an item can be added more than once
  insert(item) {
    // add to end and sift up
    this._siftUp(this._tree.pushLast(item))
    return this
  }

  remove(item, comparer = null) {
    const toRemoveCount = this._find(item, comparer).length
    for (let i = 0; i < toRemoveCount; i++) {
      // find new index
      const toRemoveIdx = this._find(item, comparer).pop()
      if (toRemoveIdx === (this.count - 1)) {
        this._tree.popLast()
      } else {
        this._tree.set(toRemoveIdx, this._tree.popLast()) // fill in with last

        // find sift direction
        const parent = this._tree.hasParent(toRemoveIdx) ? this._tree.parent(toRemoveIdx) : null
        const leftChild = this._tree.hasLeft(toRemoveIdx) ? this._tree.left(toRemoveIdx) : null
        const siftDown = leftChild !== null && (parent !== null || this._smaller(parent, this._tree.get(toRemoveIdx)))

        if (siftDown) {
          this._siftDown(toRemoveIdx)
        } else {
          this._siftUp(toRemoveIdx)
        }
      }
    }
    return this
  }

  // move item down tree if bigger than its children
  _siftDown(startIdx) {
    //this._siftDown2(startIdx)
    //return

    let currentIdx = startIdx || 0
    let smallestChildIdx
    // in array left child is there before right one
    while (this._tree.hasLeft(currentIdx)) {
      // find smaller of left and right in nextIdx
      if (this._tree.hasRight(currentIdx) &&
        (this._smaller(this._tree.right(currentIdx),
          this._tree.left(currentIdx)))) {
        smallestChildIdx = this._tree.rightIdx(currentIdx)
      } else {
        smallestChildIdx = this._tree.leftIdx(currentIdx)
      }

      if (this._smaller(this._tree.get(currentIdx), this._tree.get(smallestChildIdx))) {
        break
      }

      // swap with child if bigger
      this._tree.swap(currentIdx, smallestChildIdx)
      currentIdx = smallestChildIdx
    }
  }

  // recursive
  _siftDown2(startIdx) {
    const currentIdx = startIdx || 0
    const smallestChildIdx = !this._tree.hasLeft(currentIdx)
      ? -1
      : this._tree.hasRight(currentIdx) && this._smaller(this._tree.right(currentIdx), this._tree.left(currentIdx))
        ? this._tree.rightIdx(currentIdx)
        : this._tree.leftIdx(currentIdx)
    if (smallestChildIdx < 0) return

    if (this._smaller(this._tree.get(currentIdx), this._tree.get(smallestChildIdx))) return
    this._tree.swap(currentIdx, smallestChildIdx)
    this._siftDown2(smallestChildIdx)
  }

  // move item up the tree if smaller than its parent
  _siftUp(startIdx) {
    //this._siftUp2(startIdx)
    //return

    let currentIdx = startIdx || this.count - 1
    while (this._tree.hasParent(currentIdx) &&
      this._smaller(this._tree.get(currentIdx),
        this._tree.parent(currentIdx))) {
      const parentIdx = this._tree.parentIdx(currentIdx)
      this._tree.swap(currentIdx, parentIdx)
      currentIdx = parentIdx
    }
  }

  // recursive
  _siftUp2(startIdx) {
    const currentIdx = startIdx || this.count - 1
    if (startIdx <= 0) return
    const parentIdx = this._tree.parentIdx(currentIdx)
    const smallerThanParent = this._tree.hasParent(currentIdx) &&
      this._smaller(this._tree.get(currentIdx),
        this._tree.parent(currentIdx))
    if (!smallerThanParent) {
      return
    }

    this._tree.swap(currentIdx, parentIdx)
    this._siftUp2(parentIdx)
  }

  // an item can be more than once in tree O(n)
  _find(item, comparer = null) {
    comparer = comparer || this._comparer
    const res = []
    this._tree.data.forEach((_, idx) => {
      if (comparer(_, item) === 0) {
        res.push(idx)
      }
    })
    return res
  }

  static sort(array, comparer = null) {
    if (!array) return null
    if (array.length <= 1) return [].concat(array)
    const heap = new BinaryHeap(comparer)
    for (let a of array) {
      heap.insert(a)
    }
    const sorted = []
    while (true) {
      const min = heap.poll()
      if (min === null) break
      sorted.push(min)
    }
    return sorted
  }

  toString() {
    return this._tree.toString()
  }
}

module.exports = BinaryHeap
