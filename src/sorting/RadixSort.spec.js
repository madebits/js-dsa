const test = require('tape')
const RadixSort = require('./RadixSort')

test('RadixSort :: sort', t => {
  const rs = new RadixSort()
  const a = [115, 24, 345, 12, 788, 95, 121, 4]
  const b = rs.sort(a)
  a.sort((a, b) => a === b ? 0 : (a < b ? -1 : 1))
  t.comment(b)
  t.notEqual(b, a, 'clone')
  t.same(b, a, 'sort')
  t.end()
})
