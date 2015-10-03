// https://en.wikipedia.org/wiki/Cycle_(graph_theory)

const DfsBfs = require('./DfsBfs')
const DisjointSet = require('../disjointSet/DisjointSet')

class DfsCycle {
  // find one cycle if present, not necessary the shorter
  static findCycle(graph) {
    if (!graph || graph.vertexCount <= 1) return null
    const isDirected = graph.isDirected
    let cycle = null
    DfsBfs.dfs(graph, {
      enterNode: (node, path) => {
        const previous = path.length > 1 ? path[path.length - 2] : null
        for (let pathNode of path) {
          for (let next of node.neighbors) {
            if (pathNode === next) {
              if (!isDirected && (previous === pathNode)) {
                // for undirected a->b->a is not a cycle, given a<->b
                continue
              }
              cycle = path.slice(0)
              cycle.push(next)
            }
          }
        }
      },
      shouldStop: () => {
        return !!this.cycle
      }
    }, true)
    return cycle
  }

  // https://github.com/trekhleb/javascript-algorithms/blob/master/src/algorithms/graph/detect-cycle/detectUndirectedCycleUsingDisjointSet.js
  static hasCycle(graph) {
    if (!graph || graph.vertexCount <= 1) return null
    const ds = new DisjointSet()
    graph.allVertices.forEach(_ => ds.makeSet(_))
    for (let edge of graph.edges) {
      if (ds.sameSet(edge.start, edge.end)) {
        return true
      }
      ds.union(edge.start, edge.end)
    }
  }
}

module.exports = DfsCycle
