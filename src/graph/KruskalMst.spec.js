const test = require('tape')
const KruskalMst = require('./KruskalMst')
const graph = require('./WeightedGraph')

test('KruskalMst :: mst', t => {
  const k = new KruskalMst()
  const g = new graph.WeightedGraph()
  const edges = [ // start, end, weight
    ['A', 'B', 7],
    ['A', 'D', 5],
    ['B', 'C', 8],
    ['B', 'E', 7],
    ['B', 'D', 9],
    ['C', 'E', 5],
    ['D', 'E', 15],
    ['D', 'F', 6],
    ['E', 'F', 8],
    ['E', 'G', 9],
    ['F', 'G', 11],
  ]
  edges.forEach(_ => {
    g.addEdgeFromToByValue(_[0], _[1], _[2], true) // both directions
  })
  const res = k.mst(g)
  t.equal(res.size, 12)

  const hasEdge = (a, b) => res.has(g.edgeByVerticesValue(a, b))
  // mst
  t.ok(hasEdge('A', 'B'))
  t.ok(hasEdge('B', 'E'))
  t.ok(hasEdge('E', 'C'))
  t.ok(hasEdge('E', 'G'))
  t.ok(hasEdge('A', 'D'))
  t.ok(hasEdge('D', 'F'))

  const clone = g.cloneSubGraph(res)
  t.comment(clone)

  t.end()
})
