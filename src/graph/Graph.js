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

class GraphSearch {
  // return false from visitCb to stop search
  static dfs(graph, visitCb, reportNodePath) {
    if (!graph) return
    if (!visitCb) throw new Error('visitCb')
    // js specific
    const cancellationToken = { value: false }
    const wrapper = function(node, pathStack) {
      const res = visitCb(node, pathStack)
      if (!res) {
        cancellationToken.value = true
      }
      return res
    }
    const stopCb = function() {
      return cancellationToken.value
    }
    this._dfs(graph, wrapper, new Map(), reportNodePath ? [] : null, stopCb)
  }

  static _dfs(graph, visitCb, visited, pathStack, stopCb) {
    if (stopCb()) return
    if (!graph) return
    if (!visitCb) throw new Error('visitCb')
    if (!graph.isRoot) {
      if (pathStack) pathStack.push(graph)
      if (!visitCb(graph, pathStack)) {
        return
      }
      visited.set(graph, true)
    }
    for (let i = 0; i <= graph.children.length; i++) {
      const child = graph.children[i]
      if (!visited.get(child)) {
        this._dfs(child, visitCb, visited, pathStack, stopCb)
      }
    }
    if (!graph.isRoot && pathStack) {
      pathStack.pop(graph)
    }
  }

  // return false from visitCb to stop search
  static bfs(graph, visitCb) {
    if (!graph) return
    if (!visitCb) throw new Error('visitCb')
    const queue = []
    const marked = new Map()
    if (!graph.isRoot) {
      queue.push(graph)
      marked.set(graph, true)
    } else {
      graph.children.forEach(child => {
        queue.push(child)
        marked.set(child, true)
      })
    }
    while (queue.length) {
      const node = queue.shift()
      if (!visitCb(node)) break
      node.children.forEach(child => {
        if (marked.get(child)) return
        queue.push(child)
        marked.set(child, true)
      })
    }
  }
}

module.exports = { Graph, GraphSearch }
