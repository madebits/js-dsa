const test = require('tape')
const KnuthMorrisPratt = require('./KnuthMorrisPratt')

test('StringSearch :: simple', t => {
  //                                                      01234567890123456789012345678900123
  t.same(Array.from((new KnuthMorrisPratt()).find('ABCDABD', 'ABCDABDderfABCDABDghABCDABDkABCDABD')), [0, 11, 20, 28], 'find')
  t.end()
})

test('StringSearch :: kmp', t => {
  //                                                         01234567890123456789012345678900123
  t.same(Array.from((new KnuthMorrisPratt()).kmpFind('ABCDABD', 'ABCDABDderfABCDABDghABCDABDkABCDABD')), [0, 11, 20, 28], 'Knuth-Morris-Pratt')
  t.end()
})
