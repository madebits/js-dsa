// https://en.wikipedia.org/wiki/Kosaraju%27s_algorithm

const DfsBfs = require('./DfsBfs')

class Kosaraju {
  // strong connected components of a graph
  // https://www.geeksforgeeks.org/strongly-connected-components/
  scc(graph) {
    // first DFS
    const visited = new Map()
    graph.allVertices.forEach(_ => {
      visited.set(_, false)
    })
    const stack = []
    graph.allVertices.forEach(_ => {
      if (visited.get(_)) return
      this._fillOrder(_, visited, stack)
    })

    graph.transpose()

    // second DFS
    graph.allVertices.forEach(_ => {
      visited.set(_, false)
    })
    const result = []
    for (let i = stack.length - 1; i >= 0; i--) {
      const current = stack[i]
      if (visited.get(current)) continue
      // scc of current
      const oneSet = this._scc(current, visited, [])
      result.push(oneSet)
    }

    return result
  }

  _fillOrder(node, visited, stack) {
    visited.set(node, true)
    for (let next of node.neighbors) {
      if (visited.get(next)) continue
      this._fillOrder(next, visited, stack)
    }
    stack.push(node)
  }

  _scc(node, visited, res) {
    res.push(node)
    visited.set(node, true)
    for (let next of node.neighbors) {
      if (visited.get(next)) continue
      this._scc(next, visited, res)
    }
    return res
  }

  //////////////////////////////////////////////////////////////////////////////

  scc2(graph) {
    // DFS1 find order
    let visited = new Map()
    const stack = []
    graph.allVertices.forEach(_ => {
      if (visited.get(_)) return
      DfsBfs.dfs(_, {
        leaveNode: node => stack.push(node)
      }, false, visited)
    })

    graph.transpose()
    visited = new Map()

    // DFS2 find connected sets
    const result = []
    for (let i = stack.length - 1; i >= 0; i--) {
      const current = stack[i]
      if (visited.get(current)) continue
      // scc of current
      const oneSet = []
      DfsBfs.dfs(current, {
        enterNode: node => oneSet.push(node)
      }, false, visited)
      result.push(oneSet)
    }

    return result
  }
}

module.exports = Kosaraju
