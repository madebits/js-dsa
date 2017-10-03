// https://www.geeksforgeeks.org/backtracking-set-7-hamiltonian-cycle/

class HamiltonianCycle {
  find(graph) {
    if (!graph || !graph.vertexCount || graph.isDirected) return null
    // { matrix, vertices, reverseIndex }
    const graphMatrix = graph.toAdjacencyMatrix()
    graphMatrix.vertexCount = graphMatrix.vertices.length

    const path = new Array(graphMatrix.vertexCount).fill(null) // index of nodes
    // we can start from any vertex if there is a path, we start from 0
    path[0] = 0
    if (!this._findCycles(graphMatrix, path, 1)) {
      return null
    }
    return { path, graphMatrix }
  }

  _findCycles(graphMatrix, path, lastIdx) {
    // last vertex, check for solution
    if (lastIdx === graphMatrix.vertexCount) {
      // is last connected to start?
      const isCycle = graphMatrix.matrix[path[lastIdx - 1]][0] !== Infinity
      return isCycle
    }

    // for each vertex (newIdx), see if adding it to path leads to a cycle
    for (let newIdx = 1; newIdx < graphMatrix.vertexCount; newIdx++) {
      if (!this._isSafe(graphMatrix, path, lastIdx, newIdx)) {
        continue // skip
      }
      path[lastIdx] = newIdx
      if (this._findCycles(graphMatrix, path, lastIdx + 1)) {
        return true
      }
      // newIdx does not lead to a solution, remove it (backtrack)
      path[lastIdx] = null
    }

    return false
  }

  _isSafe(graphMatrix, path, lastIdx, newIdx) {
    // check if vertex is connected to previous
    if (graphMatrix.matrix[path[lastIdx - 1]][newIdx] === Infinity) {
      return false
    }
    // check whether vertex has already been included
    return !path.some((vertexIdx, idx) => (idx < lastIdx) && (vertexIdx === newIdx))
  }
}

module.exports = HamiltonianCycle
