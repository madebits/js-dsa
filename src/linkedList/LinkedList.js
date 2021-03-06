// https://en.wikipedia.org/wiki/Linked_list

class LinkedListNode {
  constructor(value, next = null) {
    this.value = value
    this.next = next
  }

  visit(visitorCb) {
    if (!visitorCb) throw new Error('visitorCb')
    const hash = new Set()
    for (let node = this; node; node = node.next) {
      if (hash.has(node)) break // loop
      hash.add(node)
      if (!visitorCb(node)) break
    }
  }

  get hasNext() {
    return !!this.next
  }

  get length() {
    let length = 0
    this.visit(_ => {
      ++length
      return true
    })
    return length
  }

  // tail list, can be null
  get tail() {
    return this.next
  }

  // last node
  get tailNode() {
    let node = this.next
    while (node && node.next) {
      node = node.next
    }
    return node
  }

  * nodes() {
    for (let node = this; node; node = node.next) {
      yield node
    }
  }

  * values() {
    for (let node = this; node; node = node.next) {
      yield node.value
    }
  }

  toString() {
    return this.value
  }
}

class LinkedList {
  constructor(head = null) {
    this.head = head
    // we will not keep track of tail node
  }

  visit(visitorCb) {
    if (this.isEmpty) return
    this.head.visit(visitorCb)
  }

  get isEmpty() {
    return !this.head
  }

  reset(head = null) {
    this.head = head
  }

  // rest of list without head
  get tail() {
    return this.head ? this.head.tail : null
  }

  get length() {
    return this.head ? this.head.length : 0
  }

  isHead(node) {
    return node && this.head && this.head === node
  }

  // O(1)
  prepend(value) {
    this.head = new LinkedListNode(value, this.head)
    return this
  }

  // O(n)
  append(value) {
    const node = new LinkedListNode(value)
    if (this.isEmpty) {
      this.head = node
      return
    }
    const tailNode = this.head.tailNode
    if (tailNode) {
      tailNode.next = node
    } else {
      this.head.next = node
    }

    return this
  }

  // O(n)
  deleteNode(node) {
    if (!node) return
    if (this.isEmpty) return
    if (this.isHead(node)) {
      this.head = this.head.next
      return this
    }
    let current = this.head.next
    let parent = this.head
    while (current && (current !== node)) {
      parent = current
      current = current.next
    }
    if (current) {
      const oldNode = current
      parent.next = current.next
      oldNode.next = null
    }
    return this
  }

  // recursive
  deleteNode2(node) {
    if (!node) return
    if (this.isEmpty) return
    if (this.isHead(node)) {
      this.head = this.head.next
      return this
    }
    this.head.next = (new LinkedList(this.head.next)).deleteNode2(node).head
    return this
  }

  // deletes all node instance having value
  deleteByValue(value, equalityComparer = null) {
    if (this.isEmpty) return this
    const comparer = equalityComparer || ((a, b) => a === b)
    if (comparer(this.head.value, value)) {
      this.head = this.head.next
    }
    this.head.next = (new LinkedList(this.head.next)).deleteByValue(value, comparer).head
    return this
  }

  // returns tail node, O(n)
  deleteTailNode() {
    if (this.isEmpty) return null
    if (!this.head.next) {
      const temp = this.head
      this.head = null
      return temp
    }

    let current = this.head.next
    let parent = this.head
    while (current.next) {
      parent = current
      current = current.next
    }
    parent.next = null
    return current
  }

  // find first node having value
  find(value, equalityComparer = null) {
    const comparer = equalityComparer || ((a, b) => a === b)
    let result = null
    this.visit(node => {
      if (comparer(node.value, value)) {
        result = node
        return false
      }
      return true
    })
    return result
  }

  moveNodeToHead(node) {
    if (this.isEmpty) throw new Error('empty')
    if (node === this.head) return
    let newHead = node
    if (node.next) { // node is not the last one, O(1)
      const nodeValue = node.value
      // copy over next value to node and delete next
      newHead = node.next
      node.value = node.next.value
      node.next = node.next.next
      newHead.value = nodeValue
    } else { // node is last one O(n)
      this.deleteNode(node)
    }
    newHead.next = this.head
    this.head = newHead
  }

  fromArray(a, reset = false) {
    a = a ? Array.isArray(a) ? a : [a] : []
    if (reset) this.reset()
    for (let element of a) {
      this.append(element)
    }
    return this
  }

  toArray() {
    const result = []
    this.visit(node => {
      result.push(node.value)
      return true
    })
    return result
  }

  // stack operations LIFO

  push(value) {
    this.prepend(value)
  }

  get peek() {
    return this.isEmpty ? null : this.head.value
  }

  pop() {
    if (this.isEmpty) throw new Error('empty')
    const top = this.head
    this.deleteNode(top)
    return top.value
  }

  // queue operations FIFO

  enqueue(value) {
    this.append(value)
  }

  dequeue() {
    return this.pop()
  }

  toString(valueMapper = null) {
    valueMapper = valueMapper || (_ => _)
    return this.toArray().map(valueMapper).join(',')
  }
}

module.exports = LinkedList
