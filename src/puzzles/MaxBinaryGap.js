// https://app.codility.com/programmers/lessons/1-iterations/binary_gap/

// find max zero gap within a number
class MaxBinaryGap {
  static binaryGap(n) {
    if (n <= 0) return 0
    let gap = -1 // -1 means none found after first 1
    for (let i = -1; n > 0; n = n >> 1) {
      if (n % 2) {
        if (i > gap) {
          gap = i
        }
        i = 0
      } else {
        if (i >= 0) i++
      }
    }
    return gap < 0 ? 0 : gap
  }
}

module.exports = MaxBinaryGap
