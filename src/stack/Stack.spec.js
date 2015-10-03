const test = require('tape')
const Stack = require('./Stack')

test('Stack :: insert', t => {
  const st = new Stack(13)
  t.equals(st.capacity, 16)
  const a = [3, 4, 5, 6]
  a.forEach(_ => st.push(_))
  t.equals(st.peek, a[a.length - 1])
  t.equals(st.count, a.length)
  t.equals(st.pop(), a[a.length - 1])
  t.end()
})

test('Stack :: capacity', t => {
  const st = new Stack(3)
  t.equals(st.capacity, 4)
  const a = [3, 4, 5, 6, 5, 7]
  a.forEach(_ => st.push(_))
  t.equals(st.capacity, 8, 'capacity')
  t.end()
})

test('Stack :: reverse', t => {
  const st = new Stack()
  const a = [3, 4, 5, 6, 5, 7]
  a.forEach(_ => st.push(_))
  const b = []
  while (st.count) b.unshift(st.pop())
  t.deepEquals(a, b)
  t.throws(() => st.pop())
  t.end()
})
