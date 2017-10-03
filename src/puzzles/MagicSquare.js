// https://en.wikipedia.org/wiki/Siamese_method

// odd square
class MagicSquare {
  // warning O(n^2) space complexity, O(n^2) computational complexity
  generate(n) {
    if (n <= 0) return null
    if (n % 2 === 0) throw new Error('only odd squares are supported')
    // n x n matrix
    const size = n * n
    const m = new Array(n).fill(null).map(_ => new Array(n).fill(0))

    let r = 0 // row index
    let c = (n - 1) / 2 // col index
    let k = 0 // value

    while (k++ < size) {
      m[r][c] = k
      if (r === 0) {
        if (c === n - 1) {
          r++
        } else {
          r = n - 1
          c++
        }
      } else {
        if (c === n - 1) {
          r--
          c = 0
        } else {
          if (m[r - 1][c + 1] === 0) {
            r--
            c++
          } else {
            r++
          }
        }
      }
    }

    return m
  }

  // https://en.wikipedia.org/wiki/1_%2B_2_%2B_3_%2B_4_%2B_%E2%8B%AF
  sum1toN(n) {
    return n * (n + 1) / 2
  }

  // sum of each row = sum of each col = sum of two main diagonals
  test(m) {
    if (!m || !m.length) return false
    const n = m.length
    const sum = this.sum1toN(n * n) / n // expected sum
    let d1Sum = 0
    let d2Sum = 0
    for (let r = 0; r < n; r++) {
      const row = m[r]
      const rowSum = row.reduce((sum, current) => sum + current, 0)
      if (rowSum !== sum) return false
      let colSum = 0
      for (let c = 0; c < n; c++) {
        colSum += m[r][c]
        if (r === c) {
          d1Sum += m[r][c]
        }
        if (c === n - r - 1) {
          d2Sum += m[r][c]
        }
      }
      if (colSum !== sum) return false
    }
    if (d1Sum !== sum) {
      return false
    }
    if (d2Sum !== sum) {
      return false
    }
    return sum
  }
}

module.exports = MagicSquare
