class Range {
  static * range(start, end, step = 1) {
    if (!step) throw new Error('step')
    const increasing = step > 0
    if (increasing && (start > end)) {
      [start, end] = [end, start]
    }
    if (!increasing && (start < end)) {
      [start, end] = [end, start]
    }
    if (increasing) {
      for (let i = start; i < end; i += step) {
        yield i
      }
    } else {
      for (let i = start; i > end; i += step) {
        yield i
      }
    }
  }
}

module.exports = Range
