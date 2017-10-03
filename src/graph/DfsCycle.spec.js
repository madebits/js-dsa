const test = require('tape')
const graph = require('./WeightedGraph')
const DfsCycle = require('./DfsCycle')

test('DfsBfs :: detect cycle directed', t => {
  const g = new graph.WeightedGraph(true)
  g.addEdgeFromToByValue('a', 'b')
  g.addEdgeFromToByValue('a', 'd', 0, true)
  g.addEdgeFromToByValue('b', 'c')
  g.addEdgeFromToByValue('c', 'd')

  t.ok(DfsCycle.hasCycle(g), 'has')

  const cycle = DfsCycle.findCycle(g)
  t.comment(cycle.map(_ => _.value).join(','), 'cycle')
  t.same(cycle.map(_ => _.value), ['a', 'b', 'c', 'd', 'a'])
  t.end()
})

test('DfsBfs :: detect cycle undirected', t => {
  const g = new graph.WeightedGraph()
  g.addEdgeFromToByValue('a', 'b')
  g.addEdgeFromToByValue('a', 'd')
  g.addEdgeFromToByValue('b', 'c')
  g.addEdgeFromToByValue('c', 'd')
  g.addEdgeFromToByValue('a', 'e')
  g.addEdgeFromToByValue('d', 'e')

  t.ok(DfsCycle.hasCycle(g), 'has')

  const cycle = DfsCycle.findCycle(g)
  t.comment(cycle.map(_ => _.value).join(','), 'cycle')
  t.same(cycle.map(_ => _.value), ['a', 'b', 'c', 'd', 'e', 'a'])
  t.end()
})
