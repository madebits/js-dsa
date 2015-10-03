const test = require('tape')
const HashTable = require('./HashTable')

test('HashTable :: set', t => {
  const ht = new HashTable(16)
  const a = new Array(256).fill(0).map(_ => Math.random().toString())
  a.forEach(_ => ht.set(_, _))
  let found = true
  a.forEach(_ => { found = found && ht.has(_) })
  t.ok(found, 'has')
  t.notOk(ht.has('apple'), '!has')
  t.end()
})

test('HashTable :: remove', t => {
  const ht = new HashTable(16)
  ht.set('a', 'b')
  ht.set('a', 'c')
  t.ok(ht.has('a'))
  ht.remove('a')
  t.ok(!ht.has('a'))
  t.end()
})

test('HashTable :: entries', t => {
  const ht = new HashTable(4)

  const a = ['apple', 'pear', 'cherry', 'plum'].sort()
  a.forEach((_, idx) => ht.set(_, idx))

  const keys = ht.keys.sort()
  const values = ht.values.sort()
  const entries = ht.entries.sort((a, b) => a.key.localeCompare(b.key))

  let ok = true
  a.forEach((_, idx) => {
    ok = ok && (keys[idx] === _)
  })
  t.ok(ok, 'keys')

  ok = true
  a.forEach((_, idx) => {
    ok = ok && (values[idx] === idx)
  })
  t.ok(ok, 'values')

  ok = true
  a.forEach((_, idx) => {
    ok = ok && (entries[idx].value === idx) && (entries[idx].key === _)
  })
  t.ok(ok, 'entries')

  t.end()
})

test('HashTable :: collect', t => {
  const ht = new HashTable()
  const a = ['a', 'b', 'b', 'c', 'c', 'd', 'c']
  ht.collect(a)
  let ok = true
  ok = ok && (ht.get('a') === 1)
  ok = ok && (ht.get('b') === 2)
  ok = ok && (ht.get('c') === 3)
  ok = ok && (ht.get('d') === 1)
  t.ok(ok, 'collect')
  t.end()
})
