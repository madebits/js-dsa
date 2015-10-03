const test = require('tape')
const BinaryHeap = require('./BinaryHeap')

test('BinaryHeap :: add', t => {
  const a = ['4', '4', '1', '8', '9', '5', '6', '5']
  const bh = new BinaryHeap()
  a.forEach(_ => bh.insert(_))
  t.comment(bh.toString())
  t.equals(bh.peek, a.sort()[0], 'min')
  let i = 0
  let same = true
  while (bh.count) {
    same = same && (bh.poll() === a.sort()[i++])
  }
  t.ok(same, 'poll')
  t.end()
})

test('BinaryHeap :: remove', t => {
  const a = ['4', '4', '1', '8', '9', '5', '6', '5']
  const bh = new BinaryHeap()
  a.forEach(_ => bh.insert(_))
  t.comment(bh.toString())
  bh.remove(a.sort()[1])
  t.comment(bh.toString())
  t.equals(bh.peek, a.sort()[0], 'min')
  t.end()
})

test('BinaryHeap :: heap sort', t => {
  const a = ['4', '4', '1', '8', '9', '5', '6', '5']
  const b = BinaryHeap.sort(a)
  t.same(b, a.sort(), 'sort')
  t.end()
})
