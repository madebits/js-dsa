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

  // https://en.wikipedia.org/wiki/Longest_common_substring_problem
  // returns an array of longers common substrings (if more than one with same length)
  lcs(s1, s2) {
    if (!s1 || !s2) return null
    if (!s1.length || !s2.length) return []

    // 2D matrix
    const state = Array(s1.length + 1)
      .fill(null)
      .map(() => Array(s2.length + 1).fill(0))

    let res = []
    let longest = 0
    for (let i = 0; i < s1.length; i++) {
      const rowIdx = i + 1
      for (let j = 0; j < s2.length; j++) {
        const colIdx = j + 1
        if (s1[i] === s2[j]) {
          state[rowIdx][colIdx] = state[rowIdx - 1][colIdx - 1] + 1
          if (state[rowIdx][colIdx] > longest) {
            longest = state[rowIdx][colIdx]
            res = [i] // longest so far
          } else if (state[rowIdx][colIdx] === longest) {
            res.push(i) // same length as previous
          }
        } else {
          state[rowIdx][colIdx] = 0
        }
      }
    }

    if (!longest) return ''
    return res.map(i => s1.substring(i - longest + 1, i + 1))
  }

  //////////////////////////////////////////////////////////////////////////////

  // https://en.wikipedia.org/wiki/Levenshtein_distance
  // edit distance
  levenshteinDistance(s1, s2, editCosts = null) {
    if (!s1 || !s2) return -1

    // edit cost 1,1,1 or 2,1,1, etc
    editCosts = editCosts || {}
    ;['deletion', 'insertion', 'substitution'].forEach(_ => {
      if (editCosts[_] === undefined) editCosts[_] = 1 // default cost
    })

    if (!s1.length) return s2.length * editCosts.insertion
    if (!s2.length) return s1.length * editCosts.insertion

    // 2D matrix
    const distance = Array(s1.length + 1)
      .fill(null)
      .map(() => Array(s2.length + 1).fill(0))

    // from s1 to empty string delete cost is proportional to s1 length
    for (let i = 0; i <= s1.length; i++) {
      distance[i][0] = (i * editCosts.deletion)
    }
    // from empty to s2 insert cost is proportional to s2 length
    for (let i = 0; i <= s2.length; i++) {
      distance[0][i] = (i * editCosts.insertion)
    }

    for (let i = 0; i < s1.length; i++) {
      const rowIdx = i + 1
      for (let j = 0; j < s2.length; j++) {
        const colIdx = j + 1
        distance[rowIdx][colIdx] = Math.min(
          distance[rowIdx - 1][colIdx] + editCosts.deletion,
          distance[rowIdx][colIdx - 1] + editCosts.insertion,
          distance[rowIdx - 1][colIdx - 1] + (s1[i] === s2[j] ? 0 : editCosts.substitution)
        )
      }
    }

    return distance[s1.length][s2.length]
  }

  //////////////////////////////////////////////////////////////////////////////
}

module.exports = StringSearch
