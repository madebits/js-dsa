// https://en.wikipedia.org/wiki/Quicksort
// best O( n log(n) ), Average: O (n log(n)), Worst: O(n2)
class QuickSort {
  sort(array, comparer = null) {
    if (!array) return null
    comparer = comparer || ((a, b) => a === b ? 0 : (a < b ? -1 : 1))
    return this._sort(array, comparer)
  }

  _sort(array, comparer) {
    if (!array.length) return []
    if (array.length === 1) return [array[0]]

    const equal = []
    const left = []
    const right = []

    const pivotIdx = Math.floor(array.length / 2)
    const pivot = array[pivotIdx]
    array.forEach(_ => {
      const res = comparer(_, pivot)
      if (res === 0) equal.push(_)
      else if (res < 0) left.push(_)
      else right.push(_)
    })

    const leftSorted = this._sort(left, comparer)
    const rightSorted = this._sort(right, comparer)

    return leftSorted.concat(equal, rightSorted)
  }
}

module.exports = QuickSort
