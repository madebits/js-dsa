const test = require('tape')
const MagicSquare = require('./MagicSquare')

test('MagicSquare', t => {
  const ms = new MagicSquare()
  const res = ms.generate(3)
  t.comment(res)
  t.ok(ms.test(res))
  t.ok(ms.test(ms.generate(1)))
  t.ok(ms.test(ms.generate(5)))
  t.ok(ms.test(ms.generate(7)))
  t.end()
})
