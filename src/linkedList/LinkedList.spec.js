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

////////////////////////////////////////////////////////////////////////////////

test('LinkedList :: k-th element from end', t => {
  const findFromEnd = (head, k) => {
    if (k <= 0) return null
    let p1 = head
    let p2 = p1 // p2 k behind p1
    for (let i = 1; i < k; i++) {
      if (!p1) break
      p1 = p1.next
    }
    if (!p1) return null
    while (p1.next) {
      p1 = p1.next
      p2 = p2.next
    }
    return p2
  }

  const ll = new LinkedList()
  const a = [0, 1, 2, 3, 4, 3, 999, 2, 1, 5]
  ll.fromArray(a)

  t.equal(findFromEnd(ll.head, 4).value, 999)
  t.equal(findFromEnd(ll.head, 10).value, 0) // start
  t.equal(findFromEnd(ll.head, 1).value, 5) // end
  t.equal(findFromEnd(null, 1), null)
  t.end()
})

////////////////////////////////////////////////////////////////////////////////

test('LinkedList :: is palindrome', t => {
  const isPalindrome = (head) => {
    let fast = head
    let slow = fast
    const stack = []
    while (fast && fast.next) {
      stack.push(slow.value)
      slow = slow.next
      fast = fast.next.next // 2x faster
    }
    // odd length, skip middle
    if (fast) {
      slow = slow.next
    }

    while (slow) {
      if (stack.pop() !== slow.value) {
        return false
      }
      slow = slow.next
    }

    return true
  }

  t.ok(isPalindrome((new LinkedList()).fromArray([1, 2, 1]).head))
  t.ok(isPalindrome((new LinkedList()).fromArray([1, 2, 2, 1]).head))
  t.ok(isPalindrome((new LinkedList()).fromArray([1]).head))
  t.ok(isPalindrome((new LinkedList()).fromArray([1, 1]).head))
  t.ok(!isPalindrome((new LinkedList()).fromArray([1, 4]).head))

  t.end()
})

////////////////////////////////////////////////////////////////////////////////

test('LinkedList :: find loop', t => {
  const detectLoop = (head) => {
    // detect loop
    let fast = head // +2
    let slow = head
    // fast and slow will meet after loop_size - startOfLoop turns
    while (fast && fast.next) {
      slow = slow.next
      fast = fast.next.next
      if (fast === slow) {
        break
      }
    }
    if (!fast || !fast.next) {
      return null
    }
    // find start of loop, after loop_size - startOfLoop
    slow = head
    while (slow !== fast) {
      slow = slow.next
      fast = fast.next
    }
    return slow
  }

  const detectLoop2 = (head) => {
    const hash = new Set()
    while (head) {
      if (hash.has(head)) return head
      hash.add(head)
      head = head.next
    }
  }

  const ll = new LinkedList().fromArray([1, 2, 3, 4, 5, 6, 7, 8, 9])
  t.ok(!detectLoop(ll.head))
  t.ok(!detectLoop2(ll.head))
  const node6 = ll.find(6)
  const node9 = ll.find(9)
  node9.next = node6
  t.equal(detectLoop(ll.head), node6)
  t.equal(detectLoop2(ll.head), node6)

  t.end()
})

////////////////////////////////////////////////////////////////////////////////
