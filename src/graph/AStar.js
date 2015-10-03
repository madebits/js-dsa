// https://en.wikipedia.org/wiki/A*_search_algorithm
class AStar {
  searchPath(graph, start, goal, heuristicDistanceEstimate = null) {
    if (!graph || !start || !goal || !graph.hasVertex(start) || !graph.hasVertex(goal)) return null
    heuristicDistanceEstimate = heuristicDistanceEstimate || ((node1, node2) => {
      // well, this gives a distance proportional to when node was added in graph
      const { vertices, reverseIndex } = graph.allVerticesWithIndex
      const indexWeight = graph.totalWeight / vertices.length
      return indexWeight * Math.abs(reverseIndex.get(node2) - reverseIndex.get(node1))
    })

    // already evaluated nodes
    const closed = new Set()
    const open = new Set([start])
    const cameFrom = new Map() // previous most efficient node to reach from

    // cost from start to node
    const gScore = new Map()
    graph.vertices.forEach(_ => gScore.set(_, Infinity))
    // const from start to start
    gScore.set(start, 0)
    // cost from start to goal via this node
    const fScore = new Map()
    graph.vertices.forEach(_ => fScore.set(_, Infinity))
    // best guess via start
    fScore.set(start, heuristicDistanceEstimate(graph, start, goal))

    while (open.size) {
      const current = Array.from(open).sort((a, b) => fScore.get(a) - fScore.get(b))[0]
      if (current === goal) {
        return this._buildPath(cameFrom, current)
      }
      open.delete(current)
      closed.add(current)
      for (let {
        neighbor,
        weight
      } of current.neighborsWithWeight) {
        const next = neighbor
        if (closed.has(next)) continue
        var tentativeGScore = gScore.get(current) + weight
        if (!open.has(next)) {
          open.add(next)
        } else if (tentativeGScore >= gScore.get(next)) {
          continue
        }
        // best path till now
        cameFrom.set(next, current)
        gScore.set(next, tentativeGScore)
        const approxDistance = (next === goal) ? 0 : heuristicDistanceEstimate(graph, next, goal)
        fScore.set(next, gScore.get(next) + approxDistance)
      }
    }

    return [] // not found
  }

  _buildPath(cameFrom, current) {
    const path = [ current ]
    while (true) {
      current = cameFrom.get(current)
      if (!current) break
      path.push(current)
    }
    return path.reverse()
  }
}

module.exports = AStar
