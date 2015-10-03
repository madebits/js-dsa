const test = require('tape')
const Fibonacci = require('./Fibonacci')

test('Fibonacci :: fibonacci', t => {
  t.same(Array.from(Fibonacci.fibonacci(10)), [0, 1, 1, 2, 3, 5, 8, 13, 21, 34])
  t.end()
})
