const BinaryHeap = require('../binaryHeap/BinaryHeap')

class PriorityQueueNode {
  constructor(value, priority) {
    this.value = value
    this.priority = priority || 0
  }

  toString() {
    return `${this.value}:${this.priority}`
  }
}

class PriorityQueue {
  constructor() {
    this.data = new BinaryHeap(this._comparePriority.bind(this))
  }

  _comparePriority(a, b) {
    return this._compare(a.priority, b.priority)
  }

  _compareValue(a, b) {
    return this._compare(a.value, b.value)
  }

  _compare(a, b) {
    return a === b ? 0 : (a < b ? -1 : 1)
  }

  get peek () {
    const item = this.data.peek
    return item ? item.value : null
  }

  dequeue() {
    return this.data.poll().value
  }

  enqueue(value, priority) {
    this.data.insert(new PriorityQueueNode(value, priority))
  }

  removeByPriority(priority) {
    const dummy = { __dummy__: 1 }
    this.data.remove(dummy, (a, b) => {
      const item = a.__dummy__ ? b : a
      return item.priority === priority ? 0 : -1
    })
  }

  removeByValue(value, valueComparer) {
    this.data.remove(new PriorityQueueNode(value, 0), valueComparer || this._compareValue.bind(this))
  }

  get count() {
    return this.data.count
  }

  get empty() {
    return !this.count
  }

  toString() {
    return this.data.toString()
  }
}

module.exports = PriorityQueue
