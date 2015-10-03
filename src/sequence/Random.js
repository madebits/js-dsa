// https://en.wikipedia.org/wiki/Discrete_uniform_distribution
class Random {
  static * uniform(count, a = 0, b = 1) {
    if (count < 0) count = 0
    a = Math.ceil(a)
    b = Math.floor(b)
    if (a === b) throw new Error('a must be != b')
    if (a > b) [a, b] = [b, a]
    const delta = b - a
    for (let i = 0; i < count; i++) {
      yield (a + Math.floor(delta * Math.random()))
    }
  }

  static * uniformFromArray(count, array) {
    if (!array || !array.length) throw new Error('array')
    if (count < 0) count = 0
    for (let i of Random.uniform(count, 0, array.length)) {
      yield array[i]
    }
  }
}

module.exports = Random
