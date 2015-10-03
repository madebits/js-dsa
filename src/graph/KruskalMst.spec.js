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
    g.addEdgeFromToByValue(_[0], _[1], _[2]) // both directions
  })
  const res = k.mst(g)
  t.equal(res.size, 6, 'size')

  const hasEdge = (a, b) => res.has(g.edgeByVerticesValue(a, b)) || res.has(g.edgeByVerticesValue(b, a))
  // mst
  t.ok(hasEdge('A', 'B'), 'AB')
  t.ok(hasEdge('B', 'E'), 'BE')
  t.ok(hasEdge('E', 'C'), 'EC')
  t.ok(hasEdge('E', 'G'), 'EG')
  t.ok(hasEdge('A', 'D'), 'AD')
  t.ok(hasEdge('D', 'F'), 'DF')

  const clone = g.cloneSubGraph(res)
  t.comment(clone)

  t.end()
})
