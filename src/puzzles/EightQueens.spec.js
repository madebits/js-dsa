const test = require('tape')
const EightQueens = require('./EightQueens')
const Range = require('../sequence/Range')

const sameArray = (a, b) => {
  if (a.length !== b.length) return false
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false
  }
  return true
}

test('EightQueens', t => {
  const q = new EightQueens()
  // 4 queens :)
  const size = 4
  const res = q.solve(size)
  res.forEach(columns => {
    t.comment(columns)
    t.comment('B' + Array.from(Range.range(0, 4)).join(''))
    for (let r = 0; r < size; r++) {
      let row = r.toString()
      for (let c = 0; c < size; c++) {
        row += (columns[r] === c ? 'Q' : '.')
      }
      t.comment(row)
    }
    t.comment('-------------')
    t.ok(sameArray(columns, [1, 3, 0, 2]) || sameArray(columns, [2, 0, 3, 1]))
  })
  t.end()
})
