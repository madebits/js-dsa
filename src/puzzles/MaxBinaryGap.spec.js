const test = require('tape')
const MaxBinaryGap = require('./MaxBinaryGap')

test('MaxBinaryGap', t => {
  t.equals(MaxBinaryGap.binaryGap(9), 2)
  t.equals(MaxBinaryGap.binaryGap(15), 0)
  t.equals(MaxBinaryGap.binaryGap(32), 0)
  t.end()
})
