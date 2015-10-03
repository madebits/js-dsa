const test = require('tape')
const LongestCommonSubsequence = require('./LongestCommonSubsequence')

test('LongestCommonSubsequence :: lsc', t => {
  const sm = new LongestCommonSubsequence()
  const {
    result,
    diff
  } = sm.lcs(Array.from('GAC'), Array.from('AGCAT'))
  t.comment(diff.map(_ => Object.values(_).join('')).join(','))
  t.equal(result.join(''), 'AC')
  t.end()
})
