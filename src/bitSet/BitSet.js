// https://en.wikipedia.org/wiki/Bitwise_operation
// https://stackoverflow.com/questions/7861778/how-to-implement-a-bit-vector-bitset-in-java
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators
class BitSet {
  // n bits
  constructor(n, allSet = false) {
    this._init(n, allSet)
  }

  _init(n, allSet = false) {
    if (n <= 0) throw new Error('n > 0')
    // we will use array of 8 bits elements, 8 = 2^3, a full 1s byte is 0xFF
    this._data = new Array(((n - 1) >> 3) + 1).fill(allSet ? 0xFF : 0)
    this._n = n // remember
    if (allSet) { // set zeros for unused part, to ease comparing later
      const remainder = (this.capacity << 3) - this.length
      if (remainder > 0) {
        this._data[this._data.length - 1] &= (0xFF >> remainder)
      }
    }
  }

  get length() {
    return this._n
  }

  get capacity() {
    return this._data.length
  }

  set capacity(n) {
    const oldData = this._data
    this._init(n)
    const min = oldData.length < this._data.length ? oldData.length : this._data.length
    for (let i = 0; i < min; i++) {
      this._data[i] = oldData[i]
    }
  }

  get isCapacityPowerOfTwo() {
    const n = this.capacity
    return (n & (n - 1)) === 0
  }

  _check(n) {
    if (n < 0) throw new Error('n >= 0')
    if (n >= this._n) throw new Error('n too big')
  }

  _location(n) {
    this._check(n)
    // n % 2^i = n & (2^i - 1), when n >= 0
    // 2 ^ 3 = (1 << 3) - 1 = 8 - 1 = 7 = 0x07 = 0b111
    return {
      idx: n >> 3,
      bitIdx: n & 0x07
    }
  }

  set(n) {
    const {
      idx,
      bitIdx
    } = this._location(n)
    // OR | => 0 if both 0, 1 otherwise
    this._data[idx] = this._data[idx] | (1 << bitIdx)
  }

  unset(n) {
    const {
      idx,
      bitIdx
    } = this._location(n)
    // NOT ~ => 0 becomes 1, and 1 become 0
    // Example: given ~n = -n - 1, then -n = ~n + 1 <= switch sign
    const mask = ~(1 << bitIdx)
    // AND & => 1 if both 1, 0 otherwise
    this._data[idx] = this._data[idx] & mask
  }

  update(n, value) {
    // unset(n), set(n)
    const {
      idx,
      bitIdx
    } = this._location(n)
    value = value ? 1 : 0
    const mask = ~(1 << bitIdx)
    this._data[idx] = (this._data[idx] & mask) | (value << bitIdx)
  }

  isSet(n) {
    const {
      idx,
      bitIdx
    } = this._location(n)
    return (this._data[idx] & (1 << bitIdx)) !== 0
  }

  same(other) {
    if (!other || (this.length !== other.length)) return false
    for (let i = 0; i < this._data.length; i++) {
      if (this._data[i] !== other._data[i]) return false
    }
    return true
  }

  complement() {
    const result = new BitSet(this.length)
    for (let i = 0; i < this._data.length; i++) {
      result._data[i] = -(~this._data[i])
      if (result._data[i] === 256) result._data[i] = 0
    }
    return result
  }

  union(other) {
    if (!other || (this.length !== other.length)) {
      throw new Error('other must have same length')
    }
    const result = new BitSet(this.length)
    for (let i = 0; i < this._data.length; i++) {
      result._data[i] = this._data[i] | other._data[i]
    }
    return result
  }

  intersection(other) {
    if (!other || (this.length !== other.length)) {
      throw new Error('other must have same length')
    }
    const result = new BitSet(this.length)
    for (let i = 0; i < this._data.length; i++) {
      result._data[i] = this._data[i] & other._data[i]
    }
    return result
  }

  xor(other) {
    if (!other || (this.length !== other.length)) {
      throw new Error('other must have same length')
    }
    const result = new BitSet(this.length)
    for (let i = 0; i < this._data.length; i++) {
      // XOR ^ => 1 if bits differ and 0 if same
      result._data[i] = this._data[i] ^ other._data[i]
    }
    return result
  }

  clear() {
    for (let i = 0; i < this._data.length; i++) {
      this._data[i] = 0
    }
  }

  get empty() {
    return !this._data.some(_ => _ !== 0)
  }

  flip(n) {
    this.update(n, !this.isSet(n))
  }

  // [start, end)
  * bits(start = 0, end = -1) {
    end = end < 0 ? this.length : end
    if (end < start) { // swap
      start = start ^ end
      end = start ^ end
      start = start ^ end
    }
    start = start < 0 ? 0 : start
    end = end > this.length ? this.length : end

    while (start < end) {
      yield this.isSet(start++) ? 1 : 0
    }
  }

  fromArray(array, start = 0) {
    if (!array || !array.length) return this
    let end = start + array.length
    if (end > this.length) end = this.length
    for (let i = start; i < end; i++) {
      this.update(i, array[i - start])
    }
    return this
  }

  // https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes
  setPrimes() {
    this._init(this.length, true)
    this.unset(0) // not prime
    this.unset(1) // not prime
    let prime = 2 // first prime
    const end = Math.floor(Math.sqrt(this.length - 1))
    while (prime <= end) {
      // unset every multiple of prime from prime * prime to length
      // values smaller than prime * prime have been already unset
      for (let i = prime * prime; i < this.length; i += prime) {
        this.unset(i)
      }

      do {
        prime++
      }
      while (prime <= end && !this.isSet(prime))
    }
  }

  // toString() {
  //   return this._data.map(_ => (_ >= 0
  //     ? _.toString(2)
  //     : (~_).toString(2))).join(' ')
  // }

  toString() {
    return this._data.map(_ => {
      return this._toString(_).join('')
    }).join(' ').substr(0, this.capacity + this.length - 1) // cut
  }

  _toString(n) {
    n = n >= 0 ? n : ~n
    const result = []
    for (let i = 0; i < 8; i++) {
      result.push(n & 1)
      n >>= 1
    }
    return result // this is in reverse here, but give we store bits in reverse this looks ok
  }
}

module.exports = BitSet
