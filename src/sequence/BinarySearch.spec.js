const test = require('tape')
const BinarySearch = require('./BinarySearch')

test('BinarySearch :: binarySearch', t => {
  const sm = new BinarySearch()
  const a = [1, 1, 2, 4, 4, 4, 5, 6, 6, 7, 8, 9, 9]
  let idx
  idx = sm.binarySearch(7, a)
  t.equal(idx, 9)
  idx = sm.binarySearch(17, a)
  t.equal(idx, -1)
  idx = sm.binarySearch(1, a)
  t.ok(idx === 0 || idx === 1)
  idx = sm.binarySearch(2, a)
  t.ok(idx === 2)
  idx = sm.binarySearch(4, a)
  t.ok(idx >= 3 && idx <= 5)
  t.equal(sm.binarySearch(7, [7]), 0)
  t.equal(sm.binarySearch(8, [7, 8]), 1)
  t.end()
})
