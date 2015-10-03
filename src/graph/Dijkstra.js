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

    const distances = new Map()
    const visited = new Map()
    const previous = new Map()
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
      distances.set(_, Infinity)
      previous.set(_, null)
    })
    distances.set(startVertex, 0)

    queue.enqueue(startVertex, distances[startVertex])
    while (!queue.empty) {
      const current = queue.dequeue() // min

      // this can be extended to be a target set if needed
      if (targetVertex && (current === targetVertex)) {
        return result
      }

      current.neighbors.forEach(next => {
        if (visited.get(next)) return
        const edge = current.edgeByVertex(next)
        const existingDistance = distances.get(next)
        const alternativeDistance = distances.get(current) + edge.weight
        if (alternativeDistance < existingDistance) {
          distances.set(next, alternativeDistance)
          queue.removeByValue(next) // by vertex object id, not by vertex.value
          previous.set(next, current)
        }
        queue.enqueue(next, distances.get(next))
      })
      visited.set(current, true)
    }

    return result
  }

  findPath(result, targetVertex) {
    const previous = result.previous
    targetVertex = targetVertex || result.targetVertex
    if (!previous || !targetVertex || !previous.get(targetVertex)) return null
    const stack = []
    while (previous.get(targetVertex)) {
      stack.push(targetVertex)
      targetVertex = previous.get(targetVertex)
    }
    stack.push(result.startVertex)
    return stack.reverse()
  }
}

module.exports = Dijkstra
