const test = require('tape')
const PriorityQueue = require('./PriorityQueue')

test('PriorityQueue :: enqueue', t => {
  const pq = new PriorityQueue()

  pq.enqueue(3, 2)
  pq.enqueue(1, 3)
  pq.enqueue(5, 1)
  pq.enqueue(5, 4)

  let ok = true
  ok = ok && pq.dequeue() === 5
  ok = ok && pq.dequeue() === 3
  ok = ok && pq.dequeue() === 1
  ok = ok && pq.dequeue() === 5

  t.ok(ok, 'enqueue')
  t.end()
})

test('PriorityQueue :: remove', t => {
  const pq = new PriorityQueue()

  pq.enqueue(3, 2)
  pq.enqueue(1, 3)
  pq.enqueue(5, 1)
  pq.enqueue(5, 2)

  pq.removeByPriority(2)
  t.equals(pq.count, 2, 'remove')

  pq.enqueue(5, 5)
  pq.removeByValue(5)
  t.equals(pq.count, 1, 'removeItem')

  t.end()
})
