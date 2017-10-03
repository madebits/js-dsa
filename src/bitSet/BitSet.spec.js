const test = require('tape')
const BitSet = require('./BitSet')

test('BitSet :: basic', t => {
  const bs = new BitSet(75)
  t.comment(bs.toString())
  let ok = true
  for (let i = 0; i < bs.length; i++) {
    ok = ok && !bs.isSet(i)
  }
  t.ok(ok, 'is clean')

  ok = true
  for (let i = 0; i < bs.length; i++) {
    bs.set(i)
    ok = ok && bs.isSet(i)
  }
  t.ok(ok, 'is set')

  bs.update(3, 0)
  t.ok(!bs.isSet(3), 'update')

  bs.unset(1)
  t.ok(!bs.isSet(1), 'unset')

  const bs1 = new BitSet(32, true)
  bs1.unset(1)
  bs1.unset(8)
  bs1.unset(31)
  t.comment(bs1.toString())
  t.equals(bs1.toString(), '10111111 01111111 11111111 11111110', 'string')

  t.end()
})

test('BitSet :: string', t => {
  t.equals((new BitSet(1)).toString(), '0')
  t.equals((new BitSet(8)).toString(), '0'.repeat(8))
  t.equals((new BitSet(9)).toString(), '00000000 0')
  t.equals((new BitSet(16)).toString(), '00000000 00000000')
  t.equals((new BitSet(17)).toString(), '00000000 00000000 0')
  t.end()
})

test('BitSet :: clones', t => {
  const bs = new BitSet(32, true)
  bs.unset(1)
  bs.unset(8)
  bs.unset(31)

  const bs1 = bs.complement()
  t.comment(bs.toString())
  t.comment(bs1.toString())
  t.equals(bs1.toString(), '01111111 11111111 00000000 00000001', 'complement')

  const bs2 = bs.union(bs1)
  t.comment(bs2.toString())
  t.equals(bs2.toString(), '11111111 11111111 11111111 11111111', 'union')

  const bs3 = bs.intersection(bs1)
  t.comment(bs3.toString())
  t.equals(bs3.toString(), '00111111 01111111 00000000 00000000', 'intersection')

  t.end()
})

test('BitSet :: clones', t => {
  const bs = new BitSet(32, true)
  bs.unset(1)
  bs.unset(8)
  bs.unset(31)

  const bs1 = bs.complement()
  t.comment(bs.toString())
  t.comment(bs1.toString())
  t.equals(bs1.toString(), '01111111 11111111 00000000 00000001', 'complement')

  const bs2 = bs.union(bs1)
  t.comment(bs2.toString())
  t.equals(bs2.toString(), '11111111 11111111 11111111 11111111', 'union')

  const bs3 = bs.intersection(bs1)
  t.comment(bs3.toString())
  t.equals(bs3.toString(), '00111111 01111111 00000000 00000000', 'intersection')

  const b1 = new BitSet(33, true)
  const b2 = new BitSet(32, true)
  b2.capacity = 33
  b2.set(32)
  t.ok(b1.same(b2), 'same')

  t.ok(!b1.isEmpty, 'empty')
  b1.clear()
  t.ok(b1.isEmpty, 'empty')

  t.end()
})

test('BitSet :: iterator', t => {
  const bs = new BitSet(13)
  bs.fromArray([0, 1, 1, 0, 1, 1, 1, 0, 0, 1])
  t.comment(bs.toString()) // 01101110 01000
  const data = []
  for (let bit of bs.bits(8, 3)) {
    data.push(bit)
  }
  t.same(data, [0, 1, 1, 1, 0], 'iterator')
  t.end()
})

test('BitSet :: primes', t => {
  const bs = new BitSet(45)
  bs.setPrimes()
  t.comment(bs.toString())
  let idx = -1
  const primes = []
  for (let bit of bs.bits()) {
    idx++
    if (bit) primes.push(idx)
  }
  t.comment(primes)
  t.same(primes, [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43], 'primes')
  t.end()
})
