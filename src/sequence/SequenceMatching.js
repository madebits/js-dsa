const MergeSort = require('../sorting/MergeSort')

class SequenceMatching {
  //////////////////////////////////////////////////////////////////////////////

  // https://en.wikipedia.org/wiki/Binary_search_algorithm
  // assume seq is sorted, O(log(n))
  binarySearch(value, seq, comparer = null) {
    if (!seq || !seq.length) return -1
    comparer = comparer || ((a, b) => (a === b ? 0 : a < b ? -1 : 1))
    let start = 0

    let end = seq.length
    while (start < end) {
      const middle = start + Math.floor((end - start) / 2)
      const r = comparer(seq[middle], value)
      if (r === 0) {
        return middle
      } else if (r < 0) {
        start = middle + 1
      } else {
        end = middle
      }
    }
    return -1
  }

  //////////////////////////////////////////////////////////////////////////////

  // https://en.wikipedia.org/wiki/Longest_increasing_subsequence
  lis(seq) {
    if (!seq || !seq.length) return []
    const p = new Array(seq.length) // predecessor
    const m = new Array(seq.length + 1) // see wiki
    m[0] = -1
    let length = 0
    for (let i = 0; i < seq.length; i++) {
      // binary search for largest positive number j < l, such that seq[m[j]] < seq[i]
      let lo = 1
      let hi = length
      while (lo <= hi) {
        const middle = Math.floor((lo + hi) / 2)
        if (seq[m[middle]] < seq[i]) {
          lo = middle + 1
        } else {
          hi = middle - 1
        }
      }
      // lo is 1 greater than longest prefix of seq[i]
      const newLength = lo
      // predecessor of seq[i] is the last index of sub-sequence of length newLength - 1
      p[i] = m[newLength - 1]
      m[newLength] = i

      // update length
      if (newLength > length) {
        length = newLength
      }
    }

    if (length <= 0) return []

    // longest increasing sequence
    const s = new Array(length)
    let k = m[length]
    for (let i = length - 1; i >= 0; i--) {
      s[i] = seq[k]
      k = p[k]
    }

    return s
  }

  lis2(seq) {
    if (!seq || !seq.length) return []
    const sorted = (new MergeSort().sort(seq))
    return this.lcs(seq, sorted).result
  }

  //////////////////////////////////////////////////////////////////////////////

  //https://en.wikipedia.org/wiki/Longest_common_subsequence_problem
  lcs(s1, s2) {
    if (!s1 || !s2) return null
    if (!s1.length || !s2.length) return {}

    // 2D matrix
    const state = Array(s1.length + 1)
      .fill(null)
      .map(() => Array(s2.length + 1).fill(0))

    //state zero first row and column are left (set to) zeros, rest are build from s1, s2 values

    // iterate over indexes
    for (let i = 0; i < s1.length; i++) {
      const rowIdx = i + 1
      for (let j = 0; j < s2.length; j++) {
        const colIdx = j + 1
        if (s1[i] === s2[j]) {
          state[rowIdx][colIdx] = state[rowIdx - 1][colIdx - 1] + 1
        } else {
          state[rowIdx][colIdx] = Math.max(
            state[rowIdx - 1][colIdx],
            state[rowIdx][colIdx - 1]
          )
        }
      }
    }

    if (!state[s1.length][s2.length]) {
      return {}
    }

    //const m = '\n' + this._dumpMatrix(state, s1, s2)
    //console.debug(m)

    // backtrack
    const result = []
    const diff = []
    let rowIdx = s1.length
    let colIdx = s2.length
    while (colIdx > 0 || rowIdx > 0) {
      if (s1[rowIdx - 1] === s2[colIdx - 1]) {
        result.unshift(s1[rowIdx - 1])
        diff.unshift({ op: '=', el: s1[rowIdx - 1] })
        rowIdx -= 1
        colIdx -= 1
      } else if (state[rowIdx][colIdx - 1] >= state[rowIdx - 1][colIdx]) {
        diff.unshift({ op: '+', el: s2[colIdx - 1] })
        colIdx -= 1
      } else {
        diff.unshift({ op: '-', el: s1[rowIdx - 1] })
        rowIdx -= 1
      }
    }

    return { result, diff }
  }

  // _dumpMatrix(m, s1, s2) {
  //   return '*,-,' +s2 + '\n' + m.map((col, rowIdx) => (rowIdx === 0 ? '-' : s1[rowIdx - 1]) + ',' + col.join(',')).join('\n')
  // }

  //////////////////////////////////////////////////////////////////////////////
}

module.exports = SequenceMatching
