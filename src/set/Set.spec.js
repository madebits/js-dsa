const test = require('tape')
const Set = require('./Set')

test('Set :: same', t => {
  const s1 = new Set(['a', 'b', 'c', 'd'])
  const s2 = new Set(['d', 'c', 'b', 'a'])
  const s3 = new Set(['a', 'b', 'c', 'e'])
  t.ok(s1.same(s2))
  t.ok(!s1.same(s3))
  t.end()
})

test('Set :: venn', t => {
  const s1 = new Set(['a', 'b', 'c', 'd'])
  const s2 = new Set(['b', 'd', 'e', 'f', 'g'])

  const s1ORs2 = s1.union(s2)
  //t.comment(s1ORs2.toString())
  t.ok(s1ORs2.same(new Set(['a', 'b', 'c', 'd', 'e', 'f', 'g'])), 'union')

  const s1ANDs2 = s1.intersection(s2)
  //t.comment(s1ANDs2.toString())
  t.ok(s1ANDs2.same(new Set(['b', 'd'])), 'intersection')

  const s1Mins2 = s1.difference(s2)
  t.ok(s1Mins2.same(new Set(['a', 'c'])), 'difference')

  const s1Diffs2 = s1.symmetricDifference(s2)
  const s2Diffs1 = s2.symmetricDifference(s1)
  t.ok(s1Diffs2.same(new Set(['a', 'c', 'e', 'f', 'g'])), 'symmetric difference')
  t.ok(s1Diffs2.same(s2Diffs1))

  t.ok(s1.isSubset(new Set(['d', 'b'])), 'subset')
  t.ok(!s1.isSubset(new Set(['d', 'b', 'e'])), 'not subset')

  t.end()
})

test('Set :: cross join', t => {
  const s1 = new Set(['a', 'b', 'c'])
  const s2 = new Set(['1', '2', '3'])
  const join = s1.cartesianProduct(s2)
  const flat = new Set(join.reduce((a, _) => {
    a.push(`${_[0]}:${_[1]}`)
    return a
  }, []))
  t.ok(flat.same(new Set(['a:1', 'a:2', 'a:3', 'b:1', 'b:2', 'b:3', 'c:1', 'c:2', 'c:3'])), 'join')
  t.end()
})
