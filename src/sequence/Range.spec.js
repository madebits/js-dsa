const test = require('tape')
const Range = require('./Range')

test('Range :: range', t => {
  t.same(Array.from(Range.range(9, 3, 2)), [3, 5, 7])
  t.same(Array.from(Range.range(9, 3, -2)), [9, 7, 5])
  t.end()
})
