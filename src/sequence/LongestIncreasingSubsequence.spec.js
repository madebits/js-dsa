const test = require('tape')
const LongestIncreasingSubsequence = require('./LongestIncreasingSubsequence')

test('SequenceMatching :: lsi', t => {
  const a = [0, 8, 4, 12, 2, 10, 6, 14, 1, 9, 5, 13, 3, 11, 7, 15]
  const expected = [0, 2, 6, 9, 11, 15]
  const sm = new LongestIncreasingSubsequence()
  const res = sm.lis(a)
  t.same(res, expected)
  t.same(sm.lis2(a), expected)
  t.end()
})
