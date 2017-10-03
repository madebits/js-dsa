// https://en.wikipedia.org/wiki/Binary_search_algorithm

class BinarySearch {
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
}

module.exports = BinarySearch
