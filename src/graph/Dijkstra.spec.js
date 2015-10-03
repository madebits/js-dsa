const test = require('tape')
const Dijkstra = require('./Dijkstra')
const graph = require('./WeightedGraph')

test('Dijkstra :: paths', t => {
  const g = new graph.WeightedGraph()
  const d = new Dijkstra()

  const verticesByValue = ['1', '2', '3', '4', '5', '6']
  const edgesByValue = [ // [start, end, weight]
    ['1', '2', 7],
    ['1', '3', 9],
    ['1', '6', 14],
    ['2', '3', 10],
    ['2', '4', 15],
    ['3', '6', 2],
    ['3', '4', 11],
    ['6', '5', 9],
    ['4', '5', 6],
  ]
  verticesByValue.forEach(_ => {
    g.addVertexByValue(_)
  })
  edgesByValue.forEach(_ => {
    g.addEdgeFromToByValue(_[0], _[1], _[2])
  })

  const start = g.firstVertexByValue('1')
  const result1 = d.dijkstra(g, start)
  const path1 = d.buildPath(result1, g.firstVertexByValue('5'))
  t.same(path1.map(_ => _.value), ['1', '3', '6', '5'])

  const result2 = d.dijkstra(g, start, g.firstVertexByValue('5'))
  const path2 = d.buildPath(result2)
  t.same(path2.map(_ => _.value), ['1', '3', '6', '5'])

  t.comment(path1)
  t.end()
})
