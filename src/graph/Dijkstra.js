const PriorityQueue = require('../priorityQueue/PriorityQueue')

// https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm
// graph is WeightedGraph, starNode is WeightedGraph Vertex
class Dijkstra {
  dijkstra(graph, startVertex, targetVertex = null) {
    if (!graph || !startVertex || !graph.hasVertex(startVertex)) {
      throw new Error('wrong arguments')
    }
    if (targetVertex && !graph.hasVertex(targetVertex)) {
      throw new Error('wrong argument targetVertex')
    }

    const distances = {}
    const visited = {}
    const previous = {}
    const queue = new PriorityQueue()

    const result = {
      distances,
      previous,
      startVertex,
      graph,
      targetVertex
    }

    // init
    graph.allVertices.forEach(_ => {
      distances[_] = Infinity
      previous[_] = null
    })
    distances[startVertex] = 0

    queue.enqueue(startVertex, distances[startVertex])
    while (!queue.empty) {
      const current = queue.dequeue() // min

      // this can be extended to be a target set if needed
      if (targetVertex && (current === targetVertex)) {
        return result
      }

      current.neighbors.forEach(next => {
        if (visited[next]) return
        const edge = current.edgeByVertex(next)
        const existingDistance = distances[next]
        const alternativeDistance = distances[current] + edge.weight
        if (alternativeDistance < existingDistance) {
          distances[next] = alternativeDistance
          queue.removeByValue(next) // by vertex object id, not by vertex.value
          previous[next] = current
        }
        queue.enqueue(next, distances[next])
      })
      visited[current] = true
    }

    return result
  }

  findPath(result, targetVertex) {
    const previous = result.previous
    targetVertex = targetVertex || result.targetVertex
    if (!previous || !targetVertex || !previous[targetVertex]) return null
    const stack = []
    while (previous[targetVertex]) {
      stack.push(targetVertex)
      targetVertex = previous[targetVertex]
    }
    stack.push(result.startVertex)
    return stack.reverse()
  }
}

module.exports = Dijkstra
