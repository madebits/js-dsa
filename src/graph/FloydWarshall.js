// https://en.wikipedia.org/wiki/Floyd%E2%80%93Warshall_algorithm

class FloydWarshall {
  calcDistances(graph) {
    if (!graph || !graph.vertexCount) return null

    // fill in minimum distances and next vertex
    const { vertices, reverseIndex } = graph.allVerticesWithIndex
    const dist = new Array(vertices.length).fill(null).map(_ => new Array(vertices.length).fill(Infinity)) // adjacency matrix
    const next = new Array(vertices.length).fill(null).map(_ => new Array(vertices.length).fill(null))

    for (let startIdx = 0; startIdx < vertices.length; startIdx++) {
      for (let endIdx = 0; endIdx < vertices.length; endIdx++) {
        if (startIdx === endIdx) {
          dist[startIdx][endIdx] = 0
          continue
        }
        const edge = graph.edgeByVertices(vertices[startIdx], vertices[endIdx])
        if (!edge) continue
        dist[startIdx][endIdx] = edge.weight
        next[startIdx][endIdx] = endIdx
      }
    }

    for (let middleIdx = 0; middleIdx < vertices.length; middleIdx++) {
      for (let startIdx = 0; startIdx < vertices.length; startIdx++) {
        for (let endIdx = 0; endIdx < vertices.length; endIdx++) {
          const distanceViaMiddle = dist[startIdx][middleIdx] + dist[middleIdx][endIdx]
          if (dist[startIdx][endIdx] > distanceViaMiddle) {
            dist[startIdx][endIdx] = distanceViaMiddle
            next[startIdx][endIdx] = next[startIdx][middleIdx]
          }
        }
      }
    }

    return { next, dist, graph, vertices, reverseIndex }
  }

  buildPath(result, startVertex, endVertex) {
    if (!result.reverseIndex.has(startVertex) || !result.reverseIndex.has(endVertex)) return null
    let startIdx = result.reverseIndex.get(startVertex)
    let endIdx = result.reverseIndex.get(endVertex)

    const next = result.next
    if (next[startIdx][endIdx] === null) {
      return []
    }

    const path = [startVertex]
    while (startIdx !== endIdx) {
      startIdx = next[startIdx][endIdx]
      path.push(result.vertices[startIdx])
    }
    return path
  }
}

module.exports = FloydWarshall
