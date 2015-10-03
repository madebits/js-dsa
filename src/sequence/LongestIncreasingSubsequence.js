// https://en.wikipedia.org/wiki/Longest_increasing_subsequence

const MergeSort = require('../sorting/MergeSort')
const LongestCommonSubsequence = require('./LongestCommonSubsequence')

class LongestIncreasingSubsequence {
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

  //////////////////////////////////////////////////////////////////////////////

  lis2(seq) {
    if (!seq || !seq.length) return []
    const sorted = (new MergeSort().sort(seq))
    return (new LongestCommonSubsequence()).lcs(seq, sorted).result
  }

  //////////////////////////////////////////////////////////////////////////////
}

module.exports = LongestIncreasingSubsequence
