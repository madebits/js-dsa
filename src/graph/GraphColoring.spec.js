const test = require('tape')
const GraphColoring = require('./GraphColoring')
const graph = require('./WeightedGraph')

test('GraphColoring :: colorable', t => {
  const g = new graph.WeightedGraph()

  /*
   (3)---(2)
    |   / |
    |  /  |
    | /   |
   (0)---(1)
  */
  g.addEdgeFromToByValue('0', '1')
  g.addEdgeFromToByValue('0', '2')
  g.addEdgeFromToByValue('0', '2')
  g.addEdgeFromToByValue('1', '2')
  g.addEdgeFromToByValue('2', '3')

  const c = new GraphColoring()
  const res = c.color(g, 3)
  t.same(res.color, [1, 2, 3, 1])
  const res1 = c.color(g, 2)
  t.equal(res1, null)
  t.end()
})
