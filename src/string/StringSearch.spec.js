const test = require('tape')
const StringSearch = require('./StringSearch')

test('StringSearch :: kmp', t => {
  //                                                      01234567890123456789012345678900123
  t.same(Array.from((new StringSearch()).find('ABCDABD', 'ABCDABDderfABCDABDghABCDABDkABCDABD')), [0, 11, 20, 28], 'find')
  t.end()
})

test('StringSearch :: kmp', t => {
  //                                                         01234567890123456789012345678900123
  t.same(Array.from((new StringSearch()).kmpFind('ABCDABD', 'ABCDABDderfABCDABDghABCDABDkABCDABD')), [0, 11, 20, 28], 'Knuth-Morris-Pratt')
  t.end()
})

test('StringSearch :: rk', t => {
  //                                                        01234567890123456789012345678900123
  t.same(Array.from((new StringSearch()).rkFind('ABCDABD', 'ABCDABDderfABCDABDghABCDABDkABCDABD')), [0, 11, 20, 28], 'Rabin-Karp')
  t.end()
})

test('StringSearch :: lcs', t => {
  t.same((new StringSearch()).lcs('ABAB', 'BABA'), ['ABA', 'BAB'], 'longestCommonSubstring')
  t.end()
})

test('StringSearch :: editDistance', t => {
  t.equal((new StringSearch()).levenshteinDistance('kitten', 'sitting'), 3, 'levenshteinDistance')
  t.end()
})
