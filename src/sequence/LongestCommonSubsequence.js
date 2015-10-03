// https://en.wikipedia.org/wiki/Longest_common_subsequence_problem
class LongestCommonSubsequence {
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
}

module.exports = LongestCommonSubsequence
