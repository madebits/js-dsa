const test = require('tape')
const Sequences = require('./Sequences')

test('Sequences :: fibonacci', t => {
  t.same(Array.from(Sequences.fibonacci(10)), [0, 1, 1, 2, 3, 5, 8, 13, 21, 34])
  t.end()
})

test('Sequences :: range', t => {
  t.same(Array.from(Sequences.range(9, 3, 2)), [3, 5, 7])
  t.same(Array.from(Sequences.range(9, 3, -2)), [9, 7, 5])
  t.end()
})

test('Sequences :: uniform', t => {
  // not a real test, js does not have seed
  t.comment(Array.from(Sequences.uniform(10, 0, 100)))
  t.comment(Array.from(Sequences.uniformFromArray(10, [10, 10, 20, 30, 40, 50])))
  t.end()
})
