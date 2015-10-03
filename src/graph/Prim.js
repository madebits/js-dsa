// https://en.wikipedia.org/wiki/Prim%27s_algorithm

const PriorityQueue = require('../priorityQueue/PriorityQueue')

class Prim {
  minimumSpanningTree(graph) {
    if (!graph || graph.isDirected || !graph.vertexCount) return null
    const mst = new Set() // result

    const visitedVertices = new Set()
    const start = graph.allVertices[0] // select one as start
    visitedVertices.add(start)
    // holds edge with minimal weight
    const edgesQueue = new PriorityQueue()
    for (let edge of start.edges) {
      edgesQueue.enqueue(edge, edge.weight)
    }

    while (!edgesQueue.isEmpty) {
      const currentEdge = edgesQueue.dequeue()
      let nextVertex
      if (!visitedVertices.has(currentEdge.start)) {
        nextVertex = currentEdge.start
      } else if (!visitedVertices.has(currentEdge.end)) {
        nextVertex = currentEdge.end
      }
      if (nextVertex) {
        mst.add(currentEdge)
        visitedVertices.add(nextVertex)
        for (let edge of nextVertex.edges) {
          if (!(visitedVertices.has(edge.start) && visitedVertices.has(edge.end))) {
            edgesQueue.enqueue(edge, edge.weight)
          }
        }
      }
    }

    return mst
  }
}

module.exports = Prim
