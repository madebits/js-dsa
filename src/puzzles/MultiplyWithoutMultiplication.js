// https://www.geeksforgeeks.org/multiply-two-numbers-without-using-multiply-division-bitwise-operators-and-no-loops/

class MultiplyWithoutMultiplication {
  // O(min(a, b))
  mul(a, b) {
    if (b > a) [b, a] = [a, b] // swap
    if (b === 0) return 0
    return b > 0 ? a + this.mul(a, b - 1) : -this.mul(a, -b)
  }

  // binary count O(log(min(a,b)))
  mul2(a, b) {
    if (b > a) [b, a] = [a, b] // swap, b is smaller
    if (b === 0) return 0
    else if (b === 1) return a
    else if (b < 0) return -this.mul2(a, -b)

    const half = b >> 1
    const halfProduct = this.mul2(a, half)
    if (b % 2 === 0) { // even
      return halfProduct + halfProduct
    }
    // odd
    return halfProduct + halfProduct + a
  }
}

module.exports = MultiplyWithoutMultiplication
