const test = require('tape')
const BellmanFord = require('./BellmanFord')
const graph = require('./WeightedGraph')

test('BellmanFord :: path', t => {
  const g = new graph.WeightedGraph(true)
  const verticesByValue = ['a', 'b', 'c', 'd', 'e', 'f']
  const edgesByValue = [ // [start, end, weight]
    ['a', 'b', 6],
    ['a', 'c', 5],
    ['b', 'c', 6],
    ['b', 'd', 2],
    ['c', 'e', 2],
    ['d', 'c', 8],
    ['d', 'e', 1],
    ['d', 'f', 6],
    ['e', 'f', 3],
  ]
  verticesByValue.forEach(_ => {
    g.addVertexByValue(_)
  })
  edgesByValue.forEach(_ => {
    g.addEdgeFromToByValue(_[0], _[1], _[2])
  })

  const bf = new BellmanFord()
  const res = bf.calculatePaths(g, g.firstVertexByValue('a'))
  t.ok(res)
  let path = bf.buildPath(res, g.firstVertexByValue('f'))
  t.comment(path)
  t.same(path.map(_ => _.value), ['a', 'c', 'e', 'f'])
  t.end()
})
