const test = require('tape')
const MultiplyWithoutMultiplication = require('./MultiplyWithoutMultiplication')

test('MultiplyWithoutMultiplication :: mul', t => {
  const m = new MultiplyWithoutMultiplication()
  t.equal(m.mul(6, 7), 6 * 7)
  t.equal(m.mul(6, -7), 6 * (-7))
  t.equal(m.mul(6, 0), 0)
  t.equal(m.mul(-6, 0), 0)
  t.end()
})

test('MultiplyWithoutMultiplication :: mul2', t => {
  const m = new MultiplyWithoutMultiplication()
  t.equal(m.mul2(6, 7), 6 * 7)
  t.equal(m.mul2(6, -7), 6 * (-7))
  t.equal(m.mul2(6, 0), 0)
  t.equal(m.mul2(-6, 0), 0)
  t.end()
})
