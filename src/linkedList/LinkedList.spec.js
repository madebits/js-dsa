const test = require('tape')
const LinkedList = require('./LinkedList')

test('LinkedList :: append', t => {
  const ll = new LinkedList()
  t.ok(ll.isEmpty, 'empty')
  const a = [0, 1, 2, 3, 4]
  const b = [5, 6, 7, 8, 9]
  a.reverse().forEach(_ => ll.prepend(_))
  b.forEach(_ => ll.append(_))
  t.comment(ll.toString())
  t.same([...a.reverse(), ...b], ll.toArray(), 'append')
  t.end()
})

test('LinkedList :: find / delete', t => {
  const ll = new LinkedList()
  const a = [0, 1, 2, 3, 4, 3, 3, 2, 1, 5]
  ll.fromArray(a)
  t.isEqual(ll.find(2).value, 2, 'find')
  ll.deleteByValue(2)
  t.isEqual(ll.find(2), null, 'delete')
  ll.deleteByValue(0)
  t.isEqual(ll.find(0), null, 'delete head')
  t.end()
})

test('LinkedList :: iterator', t => {
  const ll = new LinkedList()
  const a = [0, 1, 2, 3, 4]
  ll.fromArray(a)
  const b = []
  for (let e of ll.head.values()) {
    b.push(e)
  }
  t.same(a, b, 'iterator')
  t.end()
})

test('LinkedList :: stack', t => {
  const ll = new LinkedList()
  ll.push(1)
  ll.push(2)
  ll.push(3)

  let ok = true
  ok = ok && (ll.pop() === 3)
  ok = ok && (ll.pop() === 2)
  ok = ok && (ll.pop() === 1)

  t.ok(ok, 'stack')
  t.end()
})

test('LinkedList :: queue', t => {
  const ll = new LinkedList()
  ll.enqueue(1)
  ll.enqueue(2)
  ll.enqueue(3)

  let ok = true
  ok = ok && (ll.dequeue() === 1)
  ok = ok && (ll.dequeue() === 2)
  ok = ok && (ll.dequeue() === 3)

  t.ok(ok, 'queue')
  t.end()
})
