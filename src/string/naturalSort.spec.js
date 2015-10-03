const test = require('tape')
const naturalSort = require('./naturalSort')

test('naturalSort :: sort', t => {
  const a = ['a1b1', 'a10', 'a2', 'a23', 'a11', 'a1b10']
  a.sort(naturalSort)
  t.same(a, ['a1b1', 'a1b10', 'a2', 'a10', 'a11', 'a23'])
  t.end()
})
