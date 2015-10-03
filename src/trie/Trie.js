// https://en.wikipedia.org/wiki/Trie

class TrieNode {
  constructor(value) {
    this.value = value
    this.wordTerminator = false
    this.parent = null // needed for remove
    this.children = new Map()
  }

  addChild(letter) {
    if (!this.hasChild(letter)) {
      this.children.set(letter, new TrieNode(letter))
    }
    return this.getChild(letter)
  }

  getChild(letter) {
    return this.children.get(letter)
  }

  hasChild(letter) {
    return this.children.has(letter)
  }

  // pattern can be .e.g: a?a?a
  listWords(prefix = '', result = [], pattern = null) {
    prefix = prefix || ''
    result = result || []
    this.getChildren().forEach(child => {
      // pattern match
      if (pattern) {
        if (prefix.length >= pattern.length) return
        const patternValue = pattern[prefix.length]
        if (patternValue !== '?' && patternValue !== child.value) {
          return
        }
      }

      const currentWord = prefix + child.value
      if (child.wordTerminator) {
        result.push(currentWord)
      }
      child.listWords(currentWord, result, pattern)
    })
  }

  get hasChildren() {
    return !!this.children.size
  }

  getChildren() {
    return Array.from(this.children.values())
  }

  removeChild(letter) {
    delete this.children.delete(letter)
  }

  toString() {
    return `${this.value}${this.wordTerminator ? '-' : ''} => ${Array.from(this.children.keys()).join(',')}`
  }
}

// word prefix tree
class Trie {
  constructor() {
    this.root = new TrieNode('*')
  }

  insert(word) {
    if (!word) throw new Error('value')
    let current = this.root
    for (let letter of word) {
      const newNode = current.addChild(letter)
      if (!newNode.parent) newNode.parent = current
      current = newNode
    }
    current.wordTerminator = true
    return this
  }

  find(word) {
    if (!word) return false
    let current = this.root
    for (let letter of word) {
      current = current.getChild(letter)
      if (!current) break
    }
    return current && current.wordTerminator ? current : null
  }

  remove(word) {
    if (!word) return false
    let current = this.find(word)
    if (!current) return false
    current.wordTerminator = false
    let parent = current.parent
    while (parent) {
      if (current.hasChildren || current.wordTerminator) {
        return
      }
      parent.removeChild(current.letter)
      current = parent
      parent = parent.parent
    }
    return true
  }

  listWords(pattern = '') {
    const result = []
    this.root.listWords('', result, pattern)
    return result
  }

  toString() {
    return this.root.toString()
  }
}

module.exports = Trie
