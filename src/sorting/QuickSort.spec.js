const test = require('tape')
const QuickSort = require('./QuickSort')

test('QuickSort :: sort', t => {
  const qs = new QuickSort()
  const a = [3, 2, 6, 5, 6, 7, 8, 1, 0, 9, 2, 3, 7, 8, 7, 4, 5, 0]
  const b = qs.sort(a)
  a.sort()
  t.comment(b)
  t.notEqual(b, a, 'clone')
  t.same(b, a, 'sort')
  t.end()
})
