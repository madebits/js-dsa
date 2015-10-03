const test = require('tape')
const BinarySearchTree = require('./BinarySearchTree')

test('BinarySearchTree :: insert', t => {
  const bst = new BinarySearchTree()
  const a = [5, 4, 6, 1, 7, 8, 8, 9]
  a.forEach(_ => bst.insert(_))
  t.deepEqual(bst.ordered, [1, 4, 5, 6, 7, 8, 9], 'ordered')
  t.end()
})

test('BinarySearchTree :: find', t => {
  const bst = new BinarySearchTree()
  const a = [5, 4, 6, 1, 7, 8, 8, 9]
  a.forEach(_ => bst.insert(_))
  t.equals(bst.find(7).value, 7)
  t.end()
})

test('BinarySearchTree :: find2', t => {
  const bst = new BinarySearchTree()
  const a = [5, 4, 6, 1, 7, 8, 8, 9]
  a.forEach(_ => bst.insert(_))
  t.equals(bst.find2(7).value, 7)
  t.end()
})

test('BinarySearchTree :: min', t => {
  const bst = new BinarySearchTree()
  const a = [5, 4, 6, 1, 7, 8, 8, 9]
  a.forEach(_ => bst.insert(_))
  t.equals(bst.min.value, 1)
  t.end()
})

test('BinarySearchTree :: max', t => {
  const bst = new BinarySearchTree()
  const a = [5, 4, 6, 1, 7, 8, 8, 9]
  a.forEach(_ => bst.insert(_))
  t.equals(bst.max.value, 9)
  t.end()
})

test('BinarySearchTree :: remove', t => {
  const bst = new BinarySearchTree()
  const a = [5, 4, 6, 1, 7, 8, 8, 9]
  a.forEach(_ => bst.insert(_))
  bst.remove(7)
  t.deepEqual(bst.ordered, [1, 4, 5, 6, 8, 9], 'remove')
  t.end()
})

test('BinarySearchTree :: remove min', t => {
  const bst = new BinarySearchTree()
  const a = [5, 4, 6, 1, 7, 8, 8, 9]
  a.forEach(_ => bst.insert(_))
  bst.remove(bst.min.value)
  t.deepEqual(bst.ordered, [4, 5, 6, 7, 8, 9], 'remove')
  t.end()
})

test('BinarySearchTree :: dump', t => {
  const bst = new BinarySearchTree()
  const a = [5, 4, 6, 1, 7, 8, 8, 9]
  a.forEach(_ => bst.insert(_))
  const res = bst.dump()
  t.comment(res)
  t.equals(res, '{ 5 { 4 { 1 { * } { * } } { * } } { 6 { * } { 7 { * } { 8 { * } { 9 { * } { * } } } } } }')
  t.end()
})
