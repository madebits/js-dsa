// https://en.wikipedia.org/wiki/Longest_common_substring_problem
class LongestCommonSubstring {
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
}

module.exports = LongestCommonSubstring
