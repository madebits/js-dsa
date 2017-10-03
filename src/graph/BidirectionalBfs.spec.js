const test = require('tape')
const graph = require('./WeightedGraph')
const BidirectionalBfs = require('./BidirectionalBfs')

test('BidirectionalBfs :: path', t => {
  const g = new graph.WeightedGraph()
  g.addEdgeFromToByValue('A', 'B')
  g.addEdgeFromToByValue('A', 'C')
  g.addEdgeFromToByValue('B', 'C')
  g.addEdgeFromToByValue('B', 'D')
  g.addEdgeFromToByValue('D', 'E')
  g.addEdgeFromToByValue('D', 'G')
  g.addEdgeFromToByValue('E', 'G')

  const path = new BidirectionalBfs().searchPath(g,
    g.firstVertexByValue('A'), g.firstVertexByValue('E'))

  t.comment(path.join(','))
  t.same(path.map(_ => _.value), [ 'A', 'B', 'D', 'E'], 'bi-bfs')
  t.end()
})
