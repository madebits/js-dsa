const test = require('tape')
const Graph = require('./Graph')
const DfsBfs = require('./DfsBfs')

test('Graph :: search', t => {
  const g = Graph.create()

  const a1 = new Graph('A1', [
    new Graph('A1B1', []),
    new Graph('A1B2', []),
  ])

  const a2 = new Graph('A2', [
    new Graph('A2B1', [a1]),
  ])

  const a3 = new Graph('A3', [
    new Graph('A3B1', []),
    new Graph('A3B2', [a2]),
  ])

  const a4 = new Graph('A4', [
    new Graph('A4B1', [a1]),
    new Graph('A4B2', [a3]),
    new Graph('A4B3', [a2]),
  ])

  // one connected graph
  g.children.push(new Graph('0', [a1, a2, a3, a4]))

  const dfsNodes = []
  DfsBfs.dfs(g, (node) => {
    dfsNodes.push(node.value)
    return true // go on
  })
  t.comment(dfsNodes.join(','))
  t.same(dfsNodes, ['0', 'A1', 'A1B1', 'A1B2', 'A2', 'A2B1', 'A3', 'A3B1', 'A3B2', 'A4', 'A4B1', 'A4B2', 'A4B3'], 'dfs')

  const bfsNodes = []
  DfsBfs.bfs(g, (node) => {
    bfsNodes.push(node.value)
    return true // go on
  })
  t.comment(bfsNodes.join(','))
  t.same(bfsNodes, ['0', 'A1', 'A2', 'A3', 'A4', 'A1B1', 'A1B2', 'A2B1', 'A3B1', 'A3B2', 'A4B1', 'A4B2', 'A4B3'], 'bfs')

  //stop, find A2B1
  const dfsNodesStop = []
  DfsBfs.dfs(g, (node) => {
    dfsNodesStop.push(node.value)
    return node.value !== 'A1B2'
  })
  t.comment(dfsNodesStop.join(','))
  t.same(dfsNodesStop, ['0', 'A1', 'A1B1', 'A1B2'], 'dfsStop')

  //stop, find A2B1
  const bfsNodesStop = []
  DfsBfs.bfs(g, (node) => {
    bfsNodesStop.push(node.value)
    return node.value !== 'A1B2'
  })
  t.comment(bfsNodesStop.join(','))
  t.same(bfsNodesStop, ['0', 'A1', 'A2', 'A3', 'A4', 'A1B1', 'A1B2'], 'bfsStop')

  // paths
  const pathNodes = []
  DfsBfs.dfs(g, (node, path) => {
    const nodePath = [].concat(path) // copy path
    pathNodes.push({
      value: node.value,
      path: nodePath
    })
    return true
  }, true) // true to get path info
  t.comment(pathNodes.map(_ => `${_.value} => ${_.path.join('/')}`).join('\n'))
  t.equals(pathNodes.find(_ => _.value === 'A4B3').path.join('/'), '0/A4/A4B3', 'path')
  t.end()
})