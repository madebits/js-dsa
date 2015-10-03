const test = require('tape')
const graph = require('./WeightedGraph')

test('WeightedGraph :: add / remove', t => {
  const g = new graph.WeightedGraph()
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

  t.comment(g.toString())
  t.comment(g.totalWeight())

  t.ok(g.hasVertexByValue('3') && g.hasEdgeByVerticesValue('3', '6'), 'has1')
  g.removeVertexByValue('3')
  t.ok(!g.hasVertexByValue('3') &&
    !g.hasEdgeByVerticesValue('3', '6') &&
    !g.hasEdgeByVerticesValue('2', '3') &&
    !g.hasEdgeByVerticesValue('3', '4'), 'has2')
  t.equals(g.outDegree(g.firstVertexByValue('4')), 1)
  t.equals(g.inDegree(g.firstVertexByValue('5')), 2)
  t.end()
})

test('WeightedGraph :: add / remove', t => {
  const g = new graph.WeightedGraph()
  g.addVertexByValue('1')
  g.addEdgeFromToByValue('1', '1', 0, true)
  t.comment(g.toString())

  t.ok(g.firstVertexByValue('1').pointsToSelf, 'selfie')
  t.equal(g.vertexCount, 1)
  t.equal(g.edgeCount, 1)
  t.equal(g.inDegree(g.firstVertexByValue('1')), 1, 'degree in')
  t.equal(g.outDegree(g.firstVertexByValue('1')), 1, 'degree out')
  g.removeVertexByValue('1')
  t.equal(g.vertexCount + g.edgeCount, 0)
  t.end()
})
