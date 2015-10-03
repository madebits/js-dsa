const test = require('tape')
const BinaryTree = require('./BinaryTree')

// warning not all test cases are handled and some tests are merged together

/**
 *    0
 *   1  2
 *  3 4 5 6
 */
const makeBinaryTree = () => {
  return new BinaryTree(0,
    new BinaryTree(1,
      new BinaryTree(3),
      new BinaryTree(4)
    ),
    new BinaryTree(2,
      new BinaryTree(5),
      new BinaryTree(6)
    )
  )
}

test('BinaryTree :: traversal', t => {
  const bt = makeBinaryTree()
  let accum

  accum = []
  bt.inOrderTraversal(_ => accum.push(_))
  t.deepEqual(accum, [3, 1, 4, 0, 5, 2, 6], 'inOrderTraversal')

  accum = []
  bt.preOrderTraversal(_ => accum.push(_))
  t.deepEqual(accum, [0, 1, 3, 4, 2, 5, 6], 'preOrderTraversal')

  accum = []
  bt.postOrderTraversal(_ => accum.push(_))
  t.deepEqual(accum, [3, 4, 1, 5, 6, 2, 0], 'postOrderTraversal')

  t.end()
})

test('BinaryTree :: find', t => {
  const bt = makeBinaryTree()
  const node = bt.find(5)
  t.equals(node.value, 5, 'find')
  t.end()
})

test('BinaryTree :: height', t => {
  const bt = makeBinaryTree()
  t.equals(bt.height, 2, 'height')
  t.end()
})

test('BinaryTree :: is full', t => {
  const bt = makeBinaryTree()
  t.ok(bt.isFull)
  t.notOk((new BinaryTree(0,
    new BinaryTree(1,
      new BinaryTree(3),
      new BinaryTree(4)
    ),
    new BinaryTree(2,
      new BinaryTree(5)
    )
  )).isFull)
  t.end()
})
