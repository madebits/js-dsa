// https://en.wikipedia.org/wiki/Combination

const Set = require('./Set')

class SetCounting {
  constructor(set) {
    this.set = set || new Set()
  }

  static create(array) {
    return new SetCounting(new Set(array))
  }

  get cardinality () {
    return this.set.cardinality
  }

  values() {
    return this.set.values()
  }

  //////////////////////////////////////////////////////////////////////////////

  permutationsCount(withRepeatedElements) {
    const card = this.cardinality
    return withRepeatedElements ? card ** card : this._factorial(card)
  }

  permutations(withRepeatedElements = false) {
    const values = this.values()
    if (values.length <= 0) {
      return []
    }

    // memoization
    this._permutationsCache = new Map()

    return withRepeatedElements
      ? this._permutationsWithRepeatedElements(values, values.length)
      : this._permutations(values, 0)
  }

  // permutation without repetition
  _permutations(values, start) {
    // dynamic programming
    if (this._permutationsCache.has(start)) {
      return this._permutationsCache.get(start)
    }

    const length = values.length - start
    // get one one length permutation
    if (length === 1) {
      return [
        [values[start]]
      ]
    }

    const result = []
    const element = values[start]
    const permutations = this._permutations(values, start + 1)
    for (let i = 0; i < permutations.length; i++) {
      this._increasePermutationWithNewElement(element, permutations[i], result)
    }

    this._permutationsCache.set(start, result)

    return result
  }

  // put new element in every place of an existing permutation
  _increasePermutationWithNewElement(element, permutation, result) {
    for (let i = 0; i <= permutation.length; i++) {
      const prefix = permutation.slice(0, i)
      const suffix = permutation.slice(i)
      result.push(prefix.concat([element], suffix))
    }
    return result
  }

  _factorial(n, start = 1) {
    let result = start
    for (let i = start + 1; i <= n; i++) {
      result *= i
    }
    return result
  }

  // a a a
  //     b
  //     c
  //   b a
  //     b
  //     c
  //   c a
  //     b
  //     c
  // b a a
  //     b
  // ...
  _permutationsWithRepeatedElements(values, length) {
    // dynamic programming
    if (this._permutationsCache.has(length)) {
      return this._permutationsCache.get(length)
    }

    // get all one length permutations
    if (length === 1) {
      return values.map(_ => [_])
    }

    const result = []
    for (let k = 0; k < values.length; k++) {
      const permutations = this._permutationsWithRepeatedElements(values, length - 1)
      const element = values[k]
      for (let i = 0; i < permutations.length; i++) {
        result.push([element].concat(permutations[i]))
      }
    }

    this._permutationsCache.set(length, result)

    return result
  }

  // https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
  randomPermutation() {
    const values = this.values()
    for (let i = (values.length - 1); i > 0; i = i - 1) {
      const randomIdx = Math.floor(Math.random() * (i + 1))
      // swap values[i] and values[randomIdx]
      ;[values[i], values[randomIdx]] = [values[randomIdx], values[i]]
    }
    return values
  }

  //////////////////////////////////////////////////////////////////////////////

  // https://en.wikipedia.org/wiki/Combination
  // https://en.wikipedia.org/wiki/Binomial_coefficient
  // https://en.wikipedia.org/wiki/Multiset#Counting_multisets
  takeCount(length, withRepeatedElements = false) {
    const n = this.cardinality
    const k = length
    if (!withRepeatedElements && (k > n)) {
      throw new Error(`length must be < ${n}`)
    }
    if (withRepeatedElements) {
      // (n + k - 1, k) = (n + k - 1)! / k!(n - 1)! = n (n + 1) ... (n + k - 1) / k!
      return this._factorial(n + k - 1, n) / this._factorial(k)
    } else {
      // (n, k) = n! / k!(n - k)! = n (n - 1) .... (n - k + 1) / k!
      return this._factorial(n, n - k + 1) / this._factorial(k)
    }
  }

  // combinations
  take(length, withRepeatedElements = false) {
    const values = this.values()
    if (!values.length) return []
    if (!withRepeatedElements && (length > values.length)) {
      throw new Error(`length must be < ${values.length}`)
    }
    this._combinationsCache = new Map()
    return this._take(values, 0, length, withRepeatedElements)
  }

  _take(values, start, length, withRepeatedElements) {
    // dynamic programming
    const key = `${start}:${length}`
    if (this._combinationsCache.has(key)) {
      return this._combinationsCache.get(key)
    }

    if (length === 1) {
      const result = []
      for (let i = start; i < values.length; i++) {
        result.push(values[i])
      }
      return result
    }
    const result = []
    for (let k = start; k < values.length; k++) {
      const element = values[k]
      const advance = withRepeatedElements ? 0 : 1
      const combinations = this._take(values,
        k + advance,
        length - 1,
        withRepeatedElements)
      for (let i = 0; i < combinations.length; i++) {
        result.push([element].concat(combinations[i]))
      }
    }

    this._combinationsCache.set(key, result)
    return result
  }

  //////////////////////////////////////////////////////////////////////////////

  // power set cardinality
  get subsetsCount() {
    return 1 << this.cardinality
    //return 2 ** this.cardinality
  }

  // 1 ... 2^n bits to index mapping works only for few elements, we clone here
  subsets() {
    const values = this.values()
    const subsets = []
    for (let i = 0; i < values.length; i++) {
      const value = values[i]
      const clone = this._clone(subsets)
      subsets.push([value])
      clone.forEach(_ => {
        _.push(value)
        subsets.push(_)
      })
    }
    subsets.push([]) // empty
    return subsets.map(_ => new Set(_))
  }

  _clone(array) {
    const res = new Array(array.length).fill(null)
    array.forEach((_, idx) => {
      res[idx] = _.slice(0)
    })
    return res
  }

  //////////////////////////////////////////////////////////////////////////////
}

module.exports = SetCounting
