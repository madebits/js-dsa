const test = require('tape')
const RabinKarp = require('./RabinKarp')

test('RabinKarp :: find', t => {
  //                                                        01234567890123456789012345678900123
  t.same(Array.from((new RabinKarp()).find('ABCDABD', 'ABCDABDderfABCDABDghABCDABDkABCDABD')), [0, 11, 20, 28], 'Rabin-Karp')
  t.end()
})
