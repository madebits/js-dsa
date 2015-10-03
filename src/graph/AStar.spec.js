const test = require('tape')
const AStar = require('./AStar')
const graph = require('./WeightedGraph')

test('AStar :: search', t => {
  const g = new graph.WeightedGraph()

  const verticesByValue = ['Los Angles', 'New York', 'Vancouver', 'London', 'Paris', 'Frankfurt', 'Rome']
  const edgesByValue = [ // [start, end, weight]
    ['Los Angles', 'New York', 3950], // km
    ['Los Angles', 'Vancouver', 1720],
    ['New York', 'Vancouver', 3920],
    ['New York', 'London', 5600],
    ['New York', 'Rome', 6860],
    ['New York', 'Frankfurt', 6200],
    ['New York', 'Paris', 5840],
    ['Vancouver', 'London', 7580],
    ['London', 'Frankfurt', 660],
    ['London', 'Paris', 340],
    ['London', 'Rome', 1440],
    ['Paris', 'Frankfurt', 480],
    ['Rome', 'Frankfurt', 960],
    ['Rome', 'Paris', 1100],
  ]
  verticesByValue.forEach(_ => {
    g.addVertexByValue(_)
  })
  edgesByValue.forEach(_ => {
    g.addEdgeFromToByValue(_[0], _[1], _[2], true)
  })

  var approx = {
    'Los Angles:New York': 2,
    'Los Angles:Vancouver': 1,
    'New York:Vancouver': 2,
    'New York:London': 3,
    'New York:Rome': 4,
    'New York:Frankfurt': 3,
    'New York:Paris': 3,
    'Vancouver:London': 4,
    'London:Frankfurt': 1,
    'London:Paris': 1,
    'London:Rome': 2,
    'Paris:Frankfurt': 1,
    'Rome:Frankfurt': 1,
    'Rome:Paris': 1,

  }

  const as = new AStar()
  const path = as.searchPath(g, g.firstVertexByValue('Los Angles'), g.firstVertexByValue('Rome'), (g, n1, n2) => {
    const key1 = `${n1.value}:${n2.value}`
    const key2 = `${n2.value}:${n1.value}`
    return approx[key1] || approx[key2]
  }).map(_ => _.value)
  t.comment(path)
  t.same(path, ['Los Angles', 'Vancouver', 'London', 'Rome'])
  t.end()
})
