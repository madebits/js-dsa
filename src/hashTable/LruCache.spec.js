const test = require('tape')
const LruCache = require('./LruCache')

test('LruCache', t => {
  const asyncTest = async () => {
    const lru = new LruCache(async key => {
      return key
    }, 4)

    const res = await lru.get(2)
    t.equal(res, 2)
    const a = [1, 2, 3, 4, 5, 6, 7, 8, 2, 3, 2]
    for (let _ of a) {
      await lru.get(_)
    }
    t.comment(lru.hash)
    t.comment(lru.list.toString(_ => _.key))
    t.equal(lru.hash.count, 4)
    t.same(lru.list.toArray().map(_ => _.key), [2, 3, 8, 7])
  }
  asyncTest().then(t.end).catch(error => {
    t.error(error, error.stack)
    t.end()
  })
})
