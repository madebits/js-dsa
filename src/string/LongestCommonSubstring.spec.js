const test = require('tape')
const LongestCommonSubstring = require('./LongestCommonSubstring')

test('LongestCommonSubstring :: lcs', t => {
  t.same((new LongestCommonSubstring()).lcs('ABAB', 'BABA'), ['ABA', 'BAB'], 'longestCommonSubstring')
  t.end()
})
