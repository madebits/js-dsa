// https://en.wikipedia.org/wiki/Bellman%E2%80%93Ford_algorithm
class BellmanFord {
  calculatePaths(graph, start) {
    if (!graph || !graph.vertexCount || !graph.hasVertex(start)) {
      return null
    }

    const vertices = graph.allVertices
    const distances = new Map()
    const predecessor = new Map()

    vertices.forEach(vertex => {
      distances.set(vertex, Infinity)
      predecessor.set(vertex, null)
    })
    distances.set(start, 0)

    for (let i = 0; i < vertices.length - 1; i++) {
      graph.allEdges.forEach(edge => {
        const s = edge.start
        const e = edge.end
        const distanceS = distances.get(s)
        const distanceE = distanceS + edge.weight
        if (distanceE < distances.get(e)) {
          distances.set(e, distanceE)
          predecessor.set(e, s)
        }
      })
    }

    // negative-weight cycles
    graph.allEdges.forEach(edge => {
      const d = distances.get(edge.start) + edge.weight
      if (d < distances.get(edge.end)) {
        throw new Error('Graph contains a negative-weight cycle')
      }
    })

    return { distances, predecessor, graph, start }
  }

  buildPath(result, target) {
    if (!result || !target) return null
    const previous = result.predecessor
    if (!previous || !target || !previous.get(target)) return null
    const stack = []
    while (previous.get(target)) {
      stack.push(target)
      target = previous.get(target)
    }
    stack.push(result.start)
    return stack.reverse()
  }
}

module.exports = BellmanFord
