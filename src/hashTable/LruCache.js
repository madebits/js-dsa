// https://en.wikipedia.org/wiki/Cache_replacement_policies#Least_recently_used_(LRU)

const HashTable = require('./HashTable')
const LinkedList = require('../linkedList/LinkedList')

class LruCache {
  constructor(onCacheMissCb, size = 32, hasher = null, equalityComparer = null) {
    this.size = size
    if (this.size < 1) this.size = 32
    this.onCacheMissCb = onCacheMissCb
    if (!this.onCacheMissCb) throw new Error('required onCacheMissCb')
    this.list = new LinkedList()
    this.hash = new HashTable(size, hasher, equalityComparer)
  }

  async get(key, forceRefresh = false) {
    let node = this.hash.get(key)
    if (forceRefresh && node) {
      this.hash.remove(key)
      this.list.deleteNode(node)
      node = undefined
    }
    if (node === undefined) {
      const data = await this.onCacheMissCb(key)
      this.list.prepend({ key, data })
      this.hash.set(key, this.list.head)
      node = this.list.head
      if (this.list.length > this.size) {
        // a better implementation could keep track of tail node, or use a double linked list
        const tailNode = this.list.deleteTailNode()
        if (tailNode) {
          this.hash.remove(tailNode.value.key)
        }
      }
    } else {
      this.list.moveNodeToHead(node)
    }
    return node.value.data
  }
}

module.exports = LruCache
