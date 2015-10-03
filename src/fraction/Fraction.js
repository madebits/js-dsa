// https://en.wikipedia.org/wiki/Fraction_(mathematics)
// https://en.wikipedia.org/wiki/Euclidean_algorithm
class Fraction {
  constructor(numerator, denominator = 1, reduce = false) {
    if (denominator === 0) throw new Error('NaN')
    this.numerator = numerator
    this.denominator = denominator
    if (reduce) this.reduce()
  }

  get denominator() {
    return this._denominator
  }

  set denominator(value) {
    if (value === 0) throw new Error('NaN')
    this._denominator = value
    if (this._denominator < 0) {
      this.numerator *= -1 // normalize sign
      this._denominator *= -1
    }
  }

  // inverse
  reciprocal(reduce = false) {
    if (this.numerator === 0) throw new Error('NaN')
    const temp = this.numerator
    this.numerator = this.denominator
    this.denominator = temp
    if (reduce) this.reduce()
    return this
  }

  clone() {
    return new Fraction(this.numerator, this.denominator)
  }

  get isPositive() {
    return this.numerator >= 0
  }

  get isWholeNumber() {
    return this.denominator === 1
  }

  get isUnit() {
    return this.numerator === 1 || this.numerator === -1
  }

  get wholePart() {
    return Math.floor(this.numerator / this.denominator)
  }

  get remainderPart() {
    return Math.abs(this.numerator) % this.denominator
  }

  cloneToWholeAndRemainder() {
    const clone = this.clone().reduce()
    return [ new Fraction(clone.wholePart), new Fraction(clone.remainderPart, clone.denominator) ]
  }

  // greatest common divisor: greatest number that divides two positive numbers a and b without reminder
  // let a = 2^a2 * 3^a3 * 5^a5 * 7^a7 * ... <= prime decomposition of a
  // let b = 2^b2 * 3^b3 * 5^b5 * 7^b7 * ... <= prime decomposition of b
  // gcd(a,b) = 2^min(a2,b2) * 3^min(a3,b3) * 5^min(a5,b5) * 7^min(a7,b7) * ...
  _gcd(a, b) {
    return b === 0 ? a : this._gcd(b, a % b)
  }

  // least common multiple: smallest number that is divisible without a reminder from two positive numbers
  // lcm(a,b) = 2^max(a2,b2) * 3^max(a3,b3) * 5^max(a5,b5) * 7^max(a7,b7) * ...
  // a * b = gcd(a, b) * lcm(a, b)
  _lcm(a, b) {
    return (a * b) / this._gcd(a, b)
  }

  reduce() {
    const gcd = this._gcd(this.numerator > 0 ? this.numerator : -this.numerator, this.denominator)
    this.numerator /= gcd
    this.denominator /= gcd
    return this
  }

  simplify() {
    return this.reduce
  }

  _ok(other) {
    return other && other.denominator > 0
  }

  same(other) {
    if (!this._ok(other)) return false
    return this.numerator === other.numerator && this.denominator === other.denominator
  }

  equivalent(other) {
    if (!this._ok(other)) return false
    return this.clone().reduce().same(other.clone().reduce())
  }

  switchSign() {
    this.numerator *= -1
    return this
  }

  add(other) {
    if (!this._ok(other)) throw new Error('other')
    //this.numerator = this.numerator * other.denominator + other.numerator * this.denominator
    //this.denominator = this.denominator * other.denominator
    //this.reduce()

    //without reduce
    const lcm = this._lcm(this.denominator, other.denominator)
    this.numerator = this.numerator * (lcm / this.denominator) + other.numerator * (lcm / other.denominator)
    this.denominator = lcm
    return this
  }

  sub(other) {
    if (!this._ok(other)) throw new Error('other')
    this.add(other.clone().switchSign())
    return this
  }

  mul(other) {
    if (!this._ok(other)) throw new Error('other')
    this.numerator *= other.numerator
    this.denominator *= other.denominator
    return this
  }

  div(other) {
    if (!this._ok(other)) throw new Error('other')
    return this.mul(other.clone().reciprocal())
  }

  compare(other) {
    if (!this._ok(other)) return -1
    const lcm = this._lcm(this.denominator, other.denominator)
    const n1 = this.numerator * (lcm / this.denominator)
    const n2 = other.numerator * (lcm / other.denominator)
    return n1 === n2 ? 0 : n1 < n2 ? -1 : 1
  }

  toFloat() {
    return this.numerator / this.denominator
  }

  fromFloat(value, precision = 10) {
    if (precision < 0) precision = 0
    const temp = 10 ** precision
    this.numerator = value * temp
    this.denominator = temp
    return this
  }

  toString() {
    return `${this.numerator}/${this.denominator}`
  }
}

module.exports = Fraction
