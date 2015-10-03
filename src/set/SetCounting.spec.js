const test = require('tape')
const SetCounting = require('./SetCounting')

test('SetCounting :: permutations', t => {
  const s = SetCounting.create(['a', 'b', 'c', 'd', 'e'])
  const pp = s.permutations()
  const pph = {}
  for (let p of pp) {
    //t.comment(p.join(','))
    pph[p.join(',')] = 1
  }
  t.equals(pp.length, s.permutationsCount(), 'permutation without repetition')
  t.equals(Object.keys(pph).length, s.permutationsCount(), 'permutation without repetition 2')

  const pr = s.permutations(true)
  const prh = {}
  for (let p of pr) {
    //t.comment(p.join(','))
    prh[p.join(',')] = 1
  }
  t.equals(pr.length, s.permutationsCount(true), 'permutation with repetition')
  t.equals(Object.keys(prh).length, s.permutationsCount(true), 'permutation with repetition 2')

  t.end()
})

test('SetCounting :: subsets', t => {
  const s = SetCounting.create(['a', 'b', 'c', 'd', 'e', 'f'])
  const ss = s.subsets()
  // for (let p of ss) {
  //   t.comment(p.toString())
  // }
  t.equals(ss.length, s.subsetsCount, 'subsets')
  t.end()
})

test('SetCounting :: random permutation', t => {
  const s = SetCounting.create(['a', 'b', 'c', 'd', 'e'])
  const r1 = s.randomPermutation()
  const r2 = s.randomPermutation()
  t.comment(r1.join(','))
  t.notSame(r1, r2)
  t.end()
})

test('SetCounting :: combinations', t => {
  const s = SetCounting.create(['a', 'b', 'c', 'd', 'e', 'f'])
  let cc = s.take(3)
  // for (let p of cc) {
  //   t.comment(p.toString())
  // }
  t.equals(cc.length, s.takeCount(3), 'combinations')

  cc = s.take(3, true)
  // for (let p of cc) {
  //   t.comment(p.toString())
  // }
  t.equals(cc.length, s.takeCount(3, true), 'combinations (multiset)')

  t.end()
})
