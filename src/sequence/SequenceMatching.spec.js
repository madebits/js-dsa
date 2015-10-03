const test = require('tape')
const SequenceMatching = require('./SequenceMatching')

test('SequenceMatching :: binarySearch', t => {
  const sm = new SequenceMatching()
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

test('SequenceMatching :: lsi', t => {
  const a = [0, 8, 4, 12, 2, 10, 6, 14, 1, 9, 5, 13, 3, 11, 7, 15]
  const expected = [0, 2, 6, 9, 11, 15]
  const sm = new SequenceMatching()
  const res = sm.lis(a)
  t.same(res, expected)
  t.same(sm.lis2(a), expected)
  t.end()
})

test('SequenceMatching :: lsc', t => {
  const sm = new SequenceMatching()
  const {
    result,
    diff
  } = sm.lcs(Array.from('GAC'), Array.from('AGCAT'))
  t.comment(diff.map(_ => Object.values(_).join('')).join(','))
  t.equal(result.join(''), 'AC')
  t.end()
})
