// https://en.wikipedia.org/wiki/Set_(abstract_data_type)

class Set {
  constructor(data = null) {
    // object {} hash based
    this.clear()
    this.fromArray(data)
  }

  // does not clone values
  clone() {
    const result = new Set()
    result._data = Object.assign({}, this._data)
    return result
  }

  add(value) {
    if (this.has(value)) return false
    this._data[value] = value
    return true
  }

  addSet(other) {
    if (!other) return
    const values = other.value()
    for (let value of values) {
      this.add(value)
    }
  }

  has(value) {
    return this._data.hasOwnProperty(value)
  }

  remove(value) {
    delete this._data[value]
  }

  removeSet(other) {
    if (!other) return
    const values = other.value()
    for (let value of values) {
      this.remove(value)
    }
  }

  clear() {
    this._data = {}
  }

  get size() {
    return Object.getOwnPropertyNames(this._data).length
  }

  get cardinality() {
    return this.size
  }

  values() {
    return Object.getOwnPropertyNames(this._data).map(_ => this._data[_])
  }

  toArray() {
    return this.values()
  }

  fromArray(data) {
    if (data) {
      for (let item of data) {
        this.add(item)
      }
    }
  }

  same(other) {
    if (!other) return false
    // values order is not warranted
    const v1 = this.values()
    const v2 = other.values()
    if (v1.length !== v2.length) return false
    const checked = {}
    for (let i = 0; i < v1.length; i++) {
      if (!other.has(v1[i])) return false
      checked[v1[i]] = true
    }
    for (let i = 0; i < v2.length; i++) {
      if (checked[v2[i]]) continue
      if (!this.has(v2[i])) return false
    }
    return true
  }

  toString() {
    const values = this.values()
    return values.length ? values.join(',') : '<EMPTY>'
  }

  //////////////////////////////////////////////////////////////////////////////

  intersection(other) {
    if (!other) return null
    const thisIsSmaller = this.size < other.size
    const smaller = thisIsSmaller ? this : other
    const bigger = thisIsSmaller ? other : this
    const values = smaller.values()
    const result = new Set()
    for (let value of values) {
      if (bigger.has(value)) {
        result.add(value)
      }
    }
    return result
  }

  union(other) {
    if (!other) return null
    const result = this.clone()
    for (let value of other.values()) {
      result.add(value)
    }
    return result
  }

  difference(other) {
    if (!other) return null
    if (!other.size) return this.clone()
    const result = new Set()
    for (let value of this.values()) {
      if (!other.has(value)) {
        result.add(value)
      }
    }
    return result
  }

  symmetricDifference(other) {
    if (!other) return null
    const union = this.union(other)
    const intersection = this.intersection(other)
    return union.difference(intersection)
  }

  isSubset(other) {
    if (!other) return false
    return this.intersection(other).same(other)
  }

  // cross join A x B
  cartesianProduct(other) {
    if (!other) return null
    const v1 = this.values()
    const v2 = other.values()
    const result = new Array(v1.length * v2.length)
    let idx = -1
    for (let i = 0; i < v1.length; i++) {
      for (let j = 0; j < v2.length; j++) {
        result[++idx] = [v1[i], v2[j]]
      }
    }
    return result
  }
}

module.exports = Set
