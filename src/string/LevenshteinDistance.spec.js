const test = require('tape')
const LevenshteinDistance = require('./LevenshteinDistance')

test('LevenshteinDistance :: editDistance', t => {
  t.equal((new LevenshteinDistance()).editDistance('kitten', 'sitting'), 3, 'levenshteinDistance')
  t.end()
})
