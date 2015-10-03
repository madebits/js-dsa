// https://en.wikipedia.org/wiki/Fibonacci_number
class Sequences {
  static * fibonacci(count) {
    if (count < 0) count = 1
    if (count === 1) return 0
    else yield 0
    let current = 1
    let previous = 0

    yield current
    for (let i = 2; i < count; i++) {
      current += previous
      yield current
      previous = current - previous
    }
  }

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

  static * uniform(count, a = 0, b = 1) {
    if (count < 0) count = 0
    a = Math.ceil(a)
    b = Math.floor(b)
    if (a === b) throw new Error('a must be != b')
    if (a > b) [a, b] = [b, a]
    const delta = b - a
    for (let i = 0; i < count; i++) {
      yield (a + Math.floor(delta * Math.random()))
    }
  }

  static * uniformFromArray(count, array) {
    if (!array || !array.length) throw new Error('array')
    if (count < 0) count = 0
    for (let i of Sequences.uniform(count, 0, array.length)) {
      yield array[i]
    }
  }
}

module.exports = Sequences
