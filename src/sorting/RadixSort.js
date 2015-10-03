// https://en.wikipedia.org/wiki/Radix_sort
// sort base=10 numbers, non-comparison sort
// O(n * k) k num or digits on max
class RadixSort {
  sort(array, base = 10) {
    if (!array) return null
    if (array.length <= 1) return [].concat(array) // clone
    const max = array.reduce((a, b) => a > b ? a : b)
    const maxDigits = Math.ceil(Math.log(max) / Math.log(base))
    let current = array
    // group from lowest digit to biggest
    for (let digit = 0; digit < maxDigits; digit++) {
      const power = base ** digit
      const buckets = (new Array(base)).fill(null).map(_ => [])
      for (let item of current) {
        const idx = Math.floor(item / power) % base
        buckets[idx].push(item)
      }
      // here data are sorted by all digits in positions <= digit
      current = buckets.reduce((a, b) => {
        a.push(...b)
        return a
      }, [])
    }
    return current
  }
}

module.exports = RadixSort
