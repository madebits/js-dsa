// https://en.wikipedia.org/wiki/Travelling_salesman_problem
// https://github.com/trekhleb/javascript-algorithms/tree/master/src/algorithms/graph/travelling-salesman
// brute force search for moderate graphs
class TravellingSalesman {
  findBestPath(graph) {
    if (!graph) return null
    const { matrix, vertices, reverseIdx } = graph.toAdjacencyMatrix()
    if (!vertices.length) return null
    const edges = graph.allEdges
    if (!edges.length) return null

    const startVertex = vertices[0]
    const allPaths = this._findAllPaths(startVertex)
    const allCycles = allPaths.filter(path => {
      const last = path[path.length - 1]
      return last.hasNeighbor(startVertex)
    })

    if (!allCycles.length) return null

    let path = []
    let pathWeight = Infinity

    for (let i = 0; i < allCycles.length; i++) {
      const cycle = allCycles[i]
      const cycleWeight = this._cycleWeight(matrix, reverseIdx, cycle)
      if (cycleWeight === Infinity) continue
      if (cycleWeight < pathWeight) {
        path = cycle
        pathWeight = cycleWeight
      }
    }

    return { path, weight: pathWeight }
  }

  // all possible paths
  _findAllPaths(startVertex, paths = [], path = []) {
    const currentPath = [...path] // clone
    currentPath.push(startVertex)

    // already visited nodes for this path
    const visited = currentPath.reduce((vertices, vertex) => {
      vertices[vertex] = vertex
      return vertices
    }, {})

    // next round of unvisited
    const nextUnvisited = startVertex.neighbors.filter(_ => !visited[_])

    if (!nextUnvisited.length) {
      paths.push(currentPath)
      return paths
    }

    for (let neighbor of nextUnvisited) {
      this._findAllPaths(neighbor, paths, currentPath)
    }

    return paths
  }

  _cycleWeight(adjacencyMatrix, reverseIdx, cycle) {
    let weight = 0
    for (let i = 1; i < cycle.length; i++) {
      const from = cycle[i - 1]
      const to = cycle[i]
      const fromIdx = reverseIdx[from]
      const toIdx = reverseIdx[to]
      //weight += graph.edgeByVertices(from, to).weight
      weight += adjacencyMatrix[fromIdx][toIdx] // cannot be Infinite given there is a connection
    }
    return weight
  }
}

module.exports = TravellingSalesman
