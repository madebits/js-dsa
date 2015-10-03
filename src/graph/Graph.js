// https://en.wikipedia.org/wiki/Graph_(abstract_data_type)
// graph representation depends on algorithm(s) to be used
class Graph {
  constructor(value, children = [], graphRoot = false) {
    if (graphRoot) this.isRoot = true
    else this.value = value
    this.children = children || []
  }

  addChild(node) {
    if (!node) throw new Error('node')
    this.children.push(node)
  }

  get degree() {
    return this.children.length
  }

  toString() {
    return this.value
  }

  static create(connectedGraphs = []) {
    return new Graph(null, connectedGraphs, true)
  }
}

module.exports = Graph
