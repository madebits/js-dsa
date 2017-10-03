// https://en.wikipedia.org/wiki/Fibonacci_number

class Fibonacci {
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
}

module.exports = Fibonacci
