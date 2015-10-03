const test = require('tape')
const Fraction = require('./Fraction')

test('Fraction :: reduce', t => {
  const a = new Fraction(3, 6)
  a.reduce()
  t.equal(a.numerator, 1)
  t.equal(a.denominator, 2)

  const b = new Fraction(6, 3)
  b.reduce()
  t.equal(b.numerator, 2)
  t.equal(b.denominator, 1)

  // 7/4 = 1 and 3/4
  const c = (new Fraction(7, 4)).cloneToWholeAndRemainder()
  t.equal(c[0].numerator, 1)
  t.equal(c[0].denominator, 1)
  t.equal(c[1].numerator, 3)
  t.equal(c[1].denominator, 4)

  t.ok(new Fraction(3, 4).equivalent(new Fraction(3 * 21, 4 * 21)))
  t.end()
})

test('Fraction :: math', t => {
  t.equal(new Fraction(3, 4).compare(new Fraction(2 * 3, 4 * 3)), 1, 'bigger')
  t.equal(new Fraction(3, 4).add(new Fraction(2, 6)).toString(), '13/12')
  t.equal(new Fraction(-3, 4).reciprocal().toString(), '-4/3')
  t.equal(new Fraction(3, 4).sub(new Fraction(2, 6)).toString(), '5/12')
  t.equal(new Fraction(3, 4).mul(new Fraction(-2, 6)).toString(), '-6/24')
  t.equal(new Fraction(3, 4).div(new Fraction(-2, 6)).toString(), '-18/8')
  t.equal(new Fraction(3, 4).div(new Fraction(-2, 6)).reduce().toString(), '-9/4')
  t.ok(new Fraction(1).fromFloat(123.23456, 4).toFloat() - 123.2345 < 0.0001, 'float')
  t.end()
})
