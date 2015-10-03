// https://en.wikipedia.org/wiki/Depth-first_search

class DfsBfs {
  // https://en.wikipedia.org/wiki/Depth-first_search
  // return false from visitCb to stop search
  // visitor = { enterNode, leaveNode, shouldStop }
  static dfs(graph, visitor, reportNodePath = false, visited = null) {
    if (!graph) return
    if (!visitor) throw new Error('visitor')
    visitor = DfsBfs._defaultVisitor(visitor)
    DfsBfs._dfs(graph, visitor, visited || new Map(), reportNodePath ? [] : null)
  }

  static _dfs(graph, visitor, visited, pathStack) {
    if (visitor.shouldStop()) return
    if (!graph.isGraph) {
      visited.set(graph, true)
      if (pathStack) pathStack.push(graph)
      visitor.enterNode(graph, pathStack)
    }

    for (let child of graph.neighbors) {
      if (visited.get(child)) continue
      DfsBfs._dfs(child, visitor, visited, pathStack)
    }

    if (!graph.isGraph) {
      visitor.leaveNode(graph, pathStack)
      if (pathStack) pathStack.pop(graph)
    }
  }

  // https://en.wikipedia.org/wiki/Breadth-first_search
  // return false from visitCb to stop search
  // visitor = { enterNode, leaveNode, shouldStop }
  static bfs(graph, visitor) {
    if (!graph) return
    if (!visitor) throw new Error('visitor')
    visitor = DfsBfs._defaultVisitor(visitor)
    const queue = []
    const marked = new Map()
    if (!graph.isGraph) {
      queue.push(graph)
      marked.set(graph, true)
    } else {
      graph.neighbors.forEach(child => {
        queue.push(child)
        marked.set(child, true)
      })
    }
    while (queue.length) {
      const node = queue.shift()
      visitor.enterNode(node)
      if (visitor.shouldStop()) return
      node.neighbors.forEach(child => {
        if (marked.get(child)) return
        queue.push(child)
        marked.set(child, true)
      })
      visitor.leaveNode(node)
    }
  }

  static _defaultVisitor(visitor) {
    visitor = visitor || {}
    visitor.enterNode = visitor.enterNode || (() => {})
    visitor.leaveNode = visitor.leaveNode || (() => {})
    visitor.shouldStop = visitor.shouldStop || (() => false)
    return visitor
  }
}

module.exports = DfsBfs
