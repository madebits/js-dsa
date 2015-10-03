// https://en.wikipedia.org/wiki/Stack_(abstract_data_type)

// sample Stack not using Array.{pop, push}
class Stack {
  constructor(initialSize = 32) {
    this.data = new Array(this._nextPowerOfTwo(initialSize))
    this.index = -1
  }

  get capacity() {
    return this.data.length
  }

  _nextPowerOfTwo(x) {
    if (x < 1) return 2
    let power = 2
    x--
    while ((x >>= 1)) power <<= 1
    return power < x ? x : power
  }

  _ensureSize() {
    if (this.index >= this.data.length) {
      // copy over
      this.data = this.data.concat(new Array(this.data.length)) //x2
    }
  }

  _checkEmpty() {
    if (this.isEmpty) throw new Error('stack is empty')
  }

  push(value) {
    this.index++
    this._ensureSize()
    this.data[this.index] = value
  }

  pop() {
    this._checkEmpty()
    return this.data[this.index--]
  }

  get peek() {
    this._checkEmpty()
    return this.data[this.index]
  }

  get count() {
    return this.index + 1
  }

  get isEmpty() {
    return this.index < 0
  }

  toArray() {
    if (this.isEmpty) return []
    return this.data.slice(0, this.index + 1).reverse()
  }

  fromArray(a) {
    if (!a || !a.length) return
    // can be optimized to pre-allocate this.data as needed
    for (let e of a) {
      this.push(e)
    }
  }
}

module.exports = Stack
