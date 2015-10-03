// https://en.wikipedia.org/wiki/Merge_sort
// O(n log(n)) in all cases
class MergeSort {
  sort(array, comparer = null) {
    if (!array) return null
    if (!array.length) return []
    if (array.length === 1) return [array[0]] // clone to be consistent
    comparer = comparer || ((a, b) => a === b ? 0 : (a < b ? -1 : 1))
    return this._sort(array, 0, array.length, comparer)
  }

  // array = [start, end)
  _sort(array, start, end, comparer) {
    const length = end - start
    if (length <= 0) return []
    if (length === 1) return [array[start]] // we only slice at single element level
    const middle = start + Math.floor(length / 2)
    // we do not sort in place, but we avoid js slice calls or original array here
    const left = this._sort(array, start, middle, comparer) // left
    const right = this._sort(array, middle, end, comparer) // right
    return this._merge(left, right, comparer)
  }

  _merge(left, right, comparer) {
    const sorted = []
    let l = 0
    let r = 0
    while (l < left.length && r < right.length) {
      if (comparer(left[l], right[r]) < 0) {
        sorted.push(left[l])
        l++
      } else {
        sorted.push(right[r])
        r++
      }
    }
    while (l < left.length) {
      sorted.push(left[l])
      l++
    }
    while (r < right.length) {
      sorted.push(right[r])
      r++
    }
    return sorted
  }
}

module.exports = MergeSort
