// https://en.wikipedia.org/wiki/Knuth%E2%80%93Morris%E2%80%93Pratt_algorithm

class KnuthMorrisPratt {
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
}

module.exports = KnuthMorrisPratt
