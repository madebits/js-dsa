const test = require('tape')
const KnightTour = require('./KnightTour')

test('KnightTour', t => {
  const kt = new KnightTour()
  const tour = kt.tour(5)
  t.ok(tour != null)
  const moves = tour.map(_ => `(${_.c},${_.r})`).join(', ')
  t.comment(moves)
  t.same(moves, '(0,0), (2,1), (4,2), (3,4), (1,3), (0,1), (2,2), (3,0), (1,1), (0,3), (2,4), (4,3), (3,1), (1,0), (0,2), (1,4), (3,3), (4,1), (2,0), (1,2), (0,4), (2,3), (4,4), (3,2), (4,0)')
  t.end()
})
