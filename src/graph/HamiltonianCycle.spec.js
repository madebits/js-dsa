const test = require('tape')
const HamiltonianCycle = require('./HamiltonianCycle')
const graph = require('./WeightedGraph')

test('HamiltonianCycles :: has cycle', t => {
  const g = new graph.WeightedGraph()

  /*
  (0)--(1)--(2)
   |   / \   |
   |  /   \  |
   | /     \ |
  (3)-------(4)
  */
  g.addEdgeFromToByValue('0', '1')
  g.addEdgeFromToByValue('0', '3')
  g.addEdgeFromToByValue('1', '2')
  g.addEdgeFromToByValue('1', '3')
  g.addEdgeFromToByValue('1', '4')
  g.addEdgeFromToByValue('2', '4')
  g.addEdgeFromToByValue('3', '4')

  const hc = new HamiltonianCycle()
  const res = hc.find(g)
  t.same(res.path, [0, 1, 3, 4, 2])
  t.end()
})

test('HamiltonianCycles :: no cycle', t => {
  const g = new graph.WeightedGraph()

  /*
  (0)--(1)--(2)
   |   / \   |
   |  /   \  |
   | /     \ |
  (3)       (4)
  */
  g.addEdgeFromToByValue('0', '1')
  g.addEdgeFromToByValue('0', '3')
  g.addEdgeFromToByValue('1', '2')
  g.addEdgeFromToByValue('1', '3')
  g.addEdgeFromToByValue('1', '4')
  g.addEdgeFromToByValue('2', '4')

  const hc = new HamiltonianCycle()
  const res = hc.find(g)
  t.equal(res, null)
  t.end()
})
