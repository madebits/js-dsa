const test = require('tape')
const FloydWarshall = require('./FloydWarshall')
const graph = require('./WeightedGraph')

test('FloydWarshall :: path', t => {
  const g = new graph.WeightedGraph(true)
  const verticesByValue = ['1', '2', '3', '4']
  const edgesByValue = [ // [start, end, weight]
    ['1', '3', -2],
    ['2', '1', 4],
    ['2', '3', 3],
    ['3', '4', 2],
    ['4', '2', -1],
  ]
  verticesByValue.forEach(_ => {
    g.addVertexByValue(_)
  })
  edgesByValue.forEach(_ => {
    g.addEdgeFromToByValue(_[0], _[1], _[2])
  })

  const fw = new FloydWarshall()
  const res = fw.calcDistances(g)
  t.ok(res)
  let path = fw.buildPath(res, g.firstVertexByValue('1'), g.firstVertexByValue('2'))
  t.comment(path)
  t.same(path.map(_ => _.value), ['1', '3', '4', '2'])
  path = fw.buildPath(res, g.firstVertexByValue('2'), g.firstVertexByValue('3'))
  t.same(path.map(_ => _.value), ['2', '1', '3'])
  t.end()
})
