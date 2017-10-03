const test = require('tape')
const Random = require('./Random')

test('Random :: uniform', t => {
  // not a real test, js does not have seed
  t.comment(Array.from(Random.uniform(10, 0, 100)))
  t.comment(Array.from(Random.uniformFromArray(10, [10, 10, 20, 30, 40, 50])))
  t.end()
})
