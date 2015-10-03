const test = require('tape')
const MergeSort = require('./MergeSort')

test('MergeSort :: sort', t => {
  const ms = new MergeSort()
  const a = [3, 2, 6, 5, 6, 7, 8, 1, 0, 9, 2, 3, 7, 8, 7, 4, 5, 0]
  const b = ms.sort(a)
  a.sort()
  t.comment(b)
  t.notEqual(b, a, 'clone')
  t.same(b, a, 'sort')
  t.end()
})

test('MergeSort :: corner', t => {
  const ms = new MergeSort()
  t.same(ms.sort([]), [], 'empty')
  t.same(ms.sort([3]), [3], 'one')
  t.end()
})
