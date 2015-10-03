class StringSearch {
  //////////////////////////////////////////////////////////////////////////////

  // O(|word| * |text|) - best one can do without the Internet :)
  * find(word, text) {
    if (!word) return false
    if (!text) throw new Error('text')
    for (let i = 0; i <= (text.length - word.length); i++) {
      let found = true
      for (let j = 0; j < word.length; j++) {
        if (word[j] !== text[i + j]) {
          found = false
          break
        }
      }
      if (found) {
        yield i
      }
    }
  }

  //////////////////////////////////////////////////////////////////////////////

  // https://en.wikipedia.org/wiki/Knuth%E2%80%93Morris%E2%80%93Pratt_algorithm
  // O(|word| + |text|)
  * kmpFind(word, text) {
    if (!word) return false
    if (!text) throw new Error('text')
    const table = this._kmpTable(word)

    // search
    let j = 0 // position in string
    let k = 0 // position in substring
    while (j < text.length) {
      if (word[k] === text[j]) {
        j++
        k++
        if (k === word.length - 1) {
          yield (j - k) // found
          k = table[k]
        }
      } else {
        k = table[k]
        if (k < 0) {
          j++
          k++
        }
      }
    }
  }

  _kmpTable(word) {
    const table = [-1] // table

    // populate kmp table
    let pos = 1
    let cnd = 0
    while (pos < word.length) {
      if (word[pos] === word[cnd]) {
        table[pos] = table[cnd]
        pos++
        cnd++
      } else {
        table[pos] = cnd
        cnd = table[cnd]
        while ((cnd >= 0) && (word[pos] !== word[cnd])) {
          cnd = table[cnd]
        }
        pos++
        cnd++
      }
    }

    return table
  }

  //////////////////////////////////////////////////////////////////////////////

  // https://en.wikipedia.org/wiki/Rabin%E2%80%93Karp_algorithm
  * rkFind(word, text) {
    if (!word) return false
    if (!text) throw new Error('text')
    const wordHash = this._hashWord(word)
    let previous
    let currentHash
    for (let i = 0; i <= (text.length - word.length); i++) {
      const current = text.substring(i, i + word.length)
      currentHash = this._hash(current, previous, currentHash)
      previous = current
      if (wordHash === currentHash) {
        // check if word match
        let found = true
        for (let j = 0; j < word.length; j++) {
          if (word[j] !== text[i + j]) {
            found = false
            break
          }
        }
        if (found) {
          yield i
        }
      }
    }
  }

  _hash(current, previous, previousHash) {
    if (!previous) return this._hashWord(current)
    // sliding hash sum, remove first contribute and add last contribute
    let hash = (previousHash + this._hashMod) - this._hashWordAtIdx(previous, 0) // remove first
    hash *= this._hashBase // increase power
    hash += this._hashWordAtIdx(current, current.length - 1) // add last
    hash = hash % this._hashMod
    return hash
  }

  _hashWord(word) {
    let hash = 0
    for (let i = 0; i < word.length; i++) {
      hash += this._hashWordAtIdx(word, i)
    }
    return hash % this._hashMod
  }

  _hashWordAtIdx(word, idx) {
    // word[i] * (base ** power) % mod
    const power = word.length - idx - 1 // idx = 0 is highest
    return (word[idx].charCodeAt(0) * this._powerMod(this._hashBase, power, this._hashMod)) % this._hashMod
  }

  get _hashBase() {
    return 256
  }

  get _hashMod() {
    // https://en.wikipedia.org/wiki/Mersenne_prime 2^30 - 1
    return 1073741823 // the bigger the better
  }

  // see wiki: (a ** b) % c = ((a % c) * a) % c ... <- b times
  // avoid overflow
  _powerMod(base, power, mod) {
    let product = 1
    for (let i = 0; i < power; i++) {
      product = ((product % mod) * base) % mod
    }
    return product
  }

  //////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////
}

module.exports = StringSearch
