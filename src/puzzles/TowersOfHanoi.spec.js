const test = require('tape')
const TowersOfHanoi = require('./TowersOfHanoi')
const Range = require('../sequence/Range')

test('TowersOfHanoi :: move', t => {
  const h = new TowersOfHanoi()
  const disks = 13
  const res = h.moveDisks(disks)
  t.equal(res.to.count, disks)
  t.same(res.to.toArray(), Array.from(Range.range(1, disks + 1)))
  t.end()
})
