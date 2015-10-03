const test = require('tape')
const graph = require('./WeightedGraph')
const DfsBfs = require('./DfsBfs')

test('DfsBfs :: dfs', t => {
  const g = new graph.WeightedGraph()
  g.addEdgeFromToByValue('A1', 'A1B1')
  g.addEdgeFromToByValue('A1', 'A1B2')
  g.addEdgeFromToByValue('A1B1', 'A1B1C1')
  g.addEdgeFromToByValue('A1B1', 'A1B1C2')
  g.addEdgeFromToByValue('A1B1', 'A1B1C3')

  g.addEdgeFromToByValue('A2', 'A2B1')
  g.addEdgeFromToByValue('A2', 'A2B2')
  g.addEdgeFromToByValue('A2', 'A2B3')

  g.addEdgeFromToByValue('A3', 'A3B1')
  g.addEdgeFromToByValue('A3', 'A3B2')

  g.addEdgeFromToByValue('A4', 'A4B1')
  g.addEdgeFromToByValue('A4', 'A4B2')
  g.addEdgeFromToByValue('A4', 'A4B3')
  g.addEdgeFromToByValue('A4B2', 'A4B2C1')
  g.addEdgeFromToByValue('A4B2', 'A4B2C3')
  g.addEdgeFromToByValue('A4B2', 'A4B2C3')

  const nodes = []
  let testPath
  DfsBfs.dfs(g, {
    enterNode: (node, path) => {
      if (node.value === 'A4B2C3') {
        testPath = path.slice(0) // clone
      }
      nodes.push(node.value)
    }
  }, true)
  t.comment(nodes.join(','))
  t.same(nodes, [ 'A1', 'A1B1', 'A1B1C1', 'A1B1C2', 'A1B1C3', 'A1B2', 'A2', 'A2B1', 'A2B2', 'A2B3', 'A3', 'A3B1', 'A3B2', 'A4', 'A4B1', 'A4B2', 'A4B2C1', 'A4B2C3', 'A4B3' ], 'dfs')
  t.equals(testPath.map(_ => _.value).join('/'), 'A4/A4B2/A4B2C3', 'path')
  t.end()
})

test('DfsBfs :: bfs', t => {
  const g = new graph.WeightedGraph()
  g.addEdgeFromToByValue('A1', 'A1B1')
  g.addEdgeFromToByValue('A1', 'A1B2')
  g.addEdgeFromToByValue('A1B1', 'A1B1C1')
  g.addEdgeFromToByValue('A1B1', 'A1B1C2')
  g.addEdgeFromToByValue('A1B1', 'A1B1C3')

  const nodes = []
  DfsBfs.bfs(g.firstVertexByValue('A1'), {
    enterNode: (node) => nodes.push(node.value)
  })
  t.comment(nodes.join(','))
  t.same(nodes, [ 'A1', 'A1B1', 'A1B2', 'A1B1C1', 'A1B1C2', 'A1B1C3' ], 'bfs')
  t.end()
})
