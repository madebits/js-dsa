const test = require('tape')
const graph = require('./WeightedGraph')
const TravellingSalesman = require('./TravellingSalesman')

test('TravellingSalesman :: findPath', t => {
  const g = new graph.WeightedGraph(false)

  const verticesByValue = ['a', 'b', 'c', 'd']
  const edgesByValue = [ // [start, end, weight]
    ['a', 'b', 20],
    ['a', 'c', 42],
    ['b', 'c', 30],
    ['b', 'd', 34],
    ['c', 'd', 12],
  ]
  verticesByValue.forEach(_ => {
    g.addVertexByValue(_)
  })
  edgesByValue.forEach(_ => {
    g.addEdgeFromToByValue(_[0], _[1], _[2])
  })

  const tsm = new TravellingSalesman()
  const { path, weight } = tsm.findBestPath(g)
  t.comment(path)
  t.equals(weight, 66, 'weight')
  t.same(path.map(_ => _.value), ['a', 'b', 'd', 'c'], 'tsm')

  t.end()
})
