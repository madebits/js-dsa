// https://en.wikipedia.org/wiki/Graph_coloring
// https://www.geeksforgeeks.org/m-coloring-problem-backtracking-5/

class GraphColoring {
  color(graph, m) {
    if (!graph || !graph.vertexCount || graph.isDirected) return null
    // { matrix, vertices, reverseIndex }
    const graphMatrix = graph.toAdjacencyMatrix()
    graphMatrix.vertexCount = graphMatrix.vertices.length

    // color of each vertex, 0 means no color yet
    const color = new Array(graphMatrix.vertexCount).fill(0)
    // vertex 0
    if (!this._canApplyColoring(graphMatrix, m, color, 0)) {
      return null
    }

    return { color, graphMatrix }
  }

  _canApplyColoring(graphMatrix, m, color, lastIdx) {
    if (lastIdx === graphMatrix.vertexCount) {
      // done
      return true
    }
    // try different color for vertex lastIdx
    for (let c = 1; c <= m; c++) {
      if (!this._isSafe(lastIdx, graphMatrix, color, c)) {
        continue // skip, not ok
      }
      color[lastIdx] = c
      if (this._canApplyColoring(graphMatrix, m, color, lastIdx + 1)) {
        return true
      }
      // backtrack color assignment
      color[lastIdx] = 0
    }

    return false
  }

  _isSafe(lastIdx, graphMatrix, color, c) {
    for (let i = 0; i < graphMatrix.vertexCount; i++) {
      if ((graphMatrix.matrix[lastIdx][i] !== Infinity) && (c === color[i])) {
        return false
      }
    }
    return true
  }
}

module.exports = GraphColoring
