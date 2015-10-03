const DisjointSet = require('../disjointSet/DisjointSet')

// https://en.wikipedia.org/wiki/Kruskal%27s_algorithm
// Minimum Spanning Tree
class KruskalMinimumSpanningTree {
  // undirected graph, returns set of mst edges
  mst(graph) {
    if (!graph) throw new Error('graph')
    const result = new Set()
    const disjointSet = new DisjointSet()

    graph.vertices.forEach(v => {
      disjointSet.makeSet(v)
    })

    const edges = graph.allEdges.sort((a, b) => a.weight - b.weight)
    for (let edge of edges) {
      if (disjointSet.union(edge.start, edge.end)) {
        result.add(edge)
      }
    }

    return result
  }
}

module.exports = KruskalMinimumSpanningTree
