const test = require('tape')
const Trie = require('./Trie')

test('Trie :: insert and find', t => {
  const pt = new Trie()
  const a = ['ape', 'apple', 'app']

  a.forEach(_ => {
    pt.insert(_)
  })

  a.forEach(_ => {
    t.notEquals(pt.find(_), null, 'find')
  })

  t.comment(pt.toString())

  t.end()
})

test('Trie :: list words', t => {
  const pt = new Trie()
  const a = ['ape', 'apple', 'app']

  a.forEach(_ => {
    pt.insert(_)
  })

  t.deepEqual(pt.listWords().sort(), a.sort())

  t.end()
})

test('Trie :: list words with pattern', t => {
  const pt = new Trie()
  const a = ['arp', 'apple', 'app', 'application', 'b2c5d', 'b3c6e', 'd3c7e']

  a.forEach(_ => {
    pt.insert(_)
  })

  let words = pt.listWords('a?p').sort()
  t.comment(words)
  t.deepEqual(words.sort(), ['app', 'arp'], 'pattern match 1')

  words = pt.listWords('??c?e').sort()
  t.comment(words)
  t.deepEqual(words.sort(), [ 'b3c6e', 'd3c7e' ], 'pattern match 2')

  t.end()
})

test('Trie :: remove', t => {
  const pt = new Trie()
  const a = ['ape', 'apple', 'app']

  a.forEach(_ => {
    pt.insert(_)
  })

  t.notEquals(pt.find('apple'), null)
  pt.remove('apple')
  t.equals(pt.find('apple'), null)

  t.equals(pt.listWords().length, 2)

  t.end()
})
