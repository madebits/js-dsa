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

////////////////////////////////////////////////////////////////////////////////

test('BinarySearchTree :: from sorted array', t => {
  const createFromSortedArray = (sortedArray) => {
    if (!sortedArray) return null
    const create = (sortedArray, start, end) => {
      if (end < start) return null
      const middle = Math.floor((start + end) / 2)
      const node = new BinarySearchTree(sortedArray[middle])
      node.left = create(sortedArray, start, middle - 1)
      node.right = create(sortedArray, middle + 1, end)
      return (node.value === null) ? null : node
    }
    return create(sortedArray, 0, sortedArray.length - 1)
  }
  const a = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  const bt = createFromSortedArray(a)
  t.same(bt.ordered, a, 'sorted array')
  t.end()
})

////////////////////////////////////////////////////////////////////////////////

test('BinarySearchTree :: is binary search tree', t => {
  const isBinaryTree = (bt) => {
    if (!bt) return false
    // min <= bt.value < max
    const checkTree = (bt, min, max) => {
      if (!bt) return true
      if (min && (bt.value < min)) {
        return false
      }
      if (max && (bt.value > max)) {
        return false
      }
      const invalid = !checkTree(bt.left, min, bt.value) || !checkTree(bt.right, bt.value, max)
      return !invalid
    }
    return checkTree(bt, null, null)
  }
  const bst = new BinarySearchTree()
  const a = [5, 5, 4, 6, 1, 7, 8, 8, 9]
  a.forEach(_ => bst.insert(_))
  t.ok(isBinaryTree(bst))
  bst.left.value = 10
  t.ok(!isBinaryTree(bst))
  t.end()
})

////////////////////////////////////////////////////////////////////////////////
