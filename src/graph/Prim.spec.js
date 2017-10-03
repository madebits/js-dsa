const test = require('tape')
const Prim = require('./Prim')
const graph = require('./WeightedGraph')

test('Prim :: minimum spanning tree', t => {
  const g = new graph.WeightedGraph()
  const verticesByValue = ['a', 'b', 'c', 'd']
  const edgesByValue = [ // [start, end, weight]
    ['a', 'b', 2],
    ['a', 'd', 1],
    ['b', 'd', 2],
    ['c', 'd', 3],
  ]
  verticesByValue.forEach(_ => {
    g.addVertexByValue(_)
  })
  edgesByValue.forEach(_ => {
    g.addEdgeFromToByValue(_[0], _[1], _[2])
  })

  const p = new Prim()
  const res = p.minimumSpanningTree(g)
  const hasEdge = (a, b) => res.has(g.edgeByVerticesValue(a, b)) || res.has(g.edgeByVerticesValue(b, a))
  // mst
  t.ok(hasEdge('a', 'd'), 'AD')
  t.ok(hasEdge('b', 'a') || hasEdge('b', 'd'), 'BA||BD')
  t.ok(hasEdge('c', 'd'), 'EC')

  const clone = g.cloneSubGraph(res)
  t.comment(clone)

  t.end()
})
