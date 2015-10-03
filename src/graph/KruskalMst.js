const DisjointSet = require('../disjointSet/DisjointSet')

// https://en.wikipedia.org/wiki/Kruskal%27s_algorithm
// Minimum Spanning Tree
class KruskalMst {
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
        result.add(edge) // one direction only, use graph.findReverseEdge to find other direction
        // specific to my directed graph implementation
        const reverse = graph.findReverseEdge(edge)
        if (reverse) result.add(reverse)
      }
    }

    return result
  }
}

module.exports = KruskalMst
