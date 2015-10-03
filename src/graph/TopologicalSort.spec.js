const test = require('tape')
const TopologicalSort = require('./TopologicalSort')

test('TopologicalSort :: resolver', t => {
  const localDependencies = [{
    value: 'a',
    before: ['b'], // b needs to be run before a
    after: ['c', 'd'] // c and d need to run after a
  },
  {
    value: 'b',
    after: ['e', 'f']
  },
  {
    value: 'f',
    before: ['d'],
    after: ['c']
  },
  ]

  /*
   --- a ----> b ----> e
  |    |       |
  |    \/      \/
  |    d ----> f
  |            |
   ---> c <-----

  b | a or e | d | f | c

  */

  const tps = new TopologicalSort()
  const result = tps.sort(localDependencies)
  const sorted = result.map(_ => _.value)
  t.comment(sorted.join(' <= '))
  let ok = true
  ok = ok && sorted[0] === 'b'
  ok = ok && (
    (sorted[1] === 'a' && sorted[2] === 'e') ||
    (sorted[1] === 'e' && sorted[2] === 'a'))
  ok = ok && sorted[3] === 'd'
  ok = ok && sorted[4] === 'f'
  ok = ok && sorted[5] === 'c'
  t.ok(ok, 'sorted')
  t.end()
})

test('TopologicalSort :: cycles', t => {
  const localDependencies = [{
    value: 'a',
    after: ['c', 'b']
  },
  {
    value: 'b',
    after: ['e', 'f']
  },
  {
    value: 'f',
    before: ['d'],
    after: ['a']
  },
  ]
  const tps = new TopologicalSort()
  t.throws(() => tps.sort(localDependencies), 'cycle')
  t.end()
})
