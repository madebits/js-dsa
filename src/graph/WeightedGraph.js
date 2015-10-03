// https://en.wikipedia.org/wiki/Graph_(discrete_mathematics)
// https://github.com/trekhleb/javascript-algorithms/tree/master/src/data-structures/graph

class Vertex {
  constructor(value) {
    this.value = value
    this.edges = []
  }

  //////////////////////////////////////////////////////////////////////////////

  addEdge(edge) {
    if (!edge) throw new Error('null edge')
    if (this.hasEdge(edge)) return this
    this.edges.push(edge)
    return this
  }

  hasEdge(edge) {
    if (!edge) return false
    return !!this.edges.find(_ => _ === edge)
  }

  removeEdge(edge) {
    if (!edge) return false
    const idx = this.edges.indexOf(edge)
    if (idx >= 0) {
      this.edges.slice(idx, 1)
      return true
    }
    return false
  }

  removeAllEdges() {
    this.edges = []
    return this
  }

  // out degree
  get degree() {
    return this.edges.length
  }

  edgeByVertex(vertex) {
    if (!vertex) return null
    return this.edges.find(_ => _.start === vertex || _.end === vertex)
  }

  //////////////////////////////////////////////////////////////////////////////

  get neighbors() {
    return this.edges.map(_ => _.start === this ? _.end : _.start)
  }

  hasNeighbor(vertex) {
    if (!vertex || (vertex === this)) return false
    return !!this.edgeByVertex(vertex)
  }

  //////////////////////////////////////////////////////////////////////////////

  toString() {
    return (this.value === undefined || this.value === null) ? '<?>' : this.value.toString()
  }
}

class Edge {
  constructor(startVertex, endVertex, weight = 0) {
    if (!startVertex || !endVertex) throw new Error('edge needs both vertices')
    this.start = startVertex
    this.end = endVertex
    this.weight = weight
  }

  * vertices() {
    yield this.start
    yield this.end
  }

  reverseDirection() {
    // swap
    [this.start, this.end] = [this.end, this.start]
  }

  toString() {
    return `${this.start.toString()}=(${this.weight})=>${this.end.toString()}`
  }
}

// a directed graph
class WeightedGraph {
  constructor(valueEqualityComparer = null) {
    this.vertices = {}
    this.edges = {}
    this.sameValue = valueEqualityComparer || ((a, b) => a === b)
  }

  //////////////////////////////////////////////////////////////////////////////

  // creates a new vertex, but does not add it to graph (use addVertex to add it)
  createNewVertex(value) {
    return new Vertex(value)
  }

  get allVertices() {
    return Object.values(this.vertices)
  }

  // reverse lookup index map from vertex to its index
  get allVerticesWithIdx() {
    const vertices = this.allVertices
    const reverseIdx = {}
    vertices.forEach((vertex, idx) => {
      reverseIdx[vertex] = idx
    })
    return { vertices, reverseIdx }
  }

  get allEdges() {
    return Object.values(this.edges)
  }

  hasVertex(vertex) {
    if (!vertex) return false
    return !!this.vertices[vertex]
  }

  hasEdge(edge) {
    if (!edge) return false
    return !!this.edges[edge]
  }

  //////////////////////////////////////////////////////////////////////////////

  addVertex(vertex) {
    if (!vertex) throw new Error('null vertex')
    this.vertices[vertex] = vertex
    return this
  }

  // useful only if unique node values are needed
  addVertexByValue(value) {
    const vertex = this.firstVertexByValue(value)
    if (vertex) return // already there
    return this.addVertex(new Vertex(value))
  }

  verticesByValue(value) {
    return this.allVertices.filter(_ => this.sameValue(_.value, value))
  }

  firstVertexByValue(value) {
    const vertices = this.verticesByValue(value)
    return vertices.length ? vertices[0] : null
  }

  neighbors(vertex) {
    if (!this.hasVertex(vertex)) throw new Error('vertex not in graph')
    return vertex.neighbors
  }

  //////////////////////////////////////////////////////////////////////////////

  // useful only if unique node values are needed
  addEdgeFromToByValue(value1, value2, weight = 0, inBothDirections = false) {
    return this.addEdgeFromTo(
      this.firstVertexByValue(value1),
      this.firstVertexByValue(value2),
      weight,
      inBothDirections)
  }

  addEdgeFromTo(vertex1, vertex2, weight = 0, inBothDirections = false) {
    this.addEdge(new Edge(vertex1, vertex2, weight))
    if (inBothDirections) {
      this.addEdge(new Edge(vertex2, vertex1, weight))
    }
    return this
  }

  addEdge(edge) {
    if (!edge) throw new Error('null edge')
    if (this.hasEdge(edge)) return this
    this.edges[edge] = edge
    for (let vertex of edge.vertices()) {
      if (!this.hasVertex(vertex)) {
        this.addVertex(vertex)
      }
    }
    edge.start.addEdge(edge) // directed only start node has the edge
    return this
  }

  removeEdge(edge) {
    if (!edge) throw new Error('edge')
    if (!this.hasEdge(edge)) return false
    delete this.edges[edge]
    for (let vertex of edge.vertices()) {
      vertex.removeEdge(edge)
    }
  }

  edgeByVertices(start, end) {
    if (!start || !end) return null
    if (!this.hasVertex(start) || !this.hasVertex(end)) {
      return null
    }
    return start.edgeByVertex(end)
  }

  hasEdgeByVertices(start, end) {
    return !!this.edgeByVertices(start, end)
  }

  //////////////////////////////////////////////////////////////////////////////

  // change direction of edges
  reverseDirection() {
    this.allEdges.forEach(edge => {
      this.removeEdge(edge)
      edge.reverseDirection()
      this.addEdge(edge)
    })
  }

  get totalWeight() {
    return this.allEdges.reduce((sum, _) => sum + _.weight, 0)
  }

  toAdjacencyMatrix() {
    const { vertices, reverseIdx } = this.allVerticesWithIdx
    if (!vertices.length) return null
    const matrix = new Array(vertices.length).fill(null).map(_ => new Array(vertices.length).fill(Infinity))
    vertices.forEach((vertex, idx) => {
      vertex.neighbors.forEach(neighbor => {
        const neighborIdx = reverseIdx[neighbor]
        const edge = this.edgeByVertices(vertex, neighbor)
        matrix[idx][neighborIdx] = edge.weight
      })
    })

    return { matrix, vertices, reverseIdx }
  }

  toString() {
    return this.allVertices.join(',')
  }
}

module.exports = { WeightedGraph, Vertex, Edge }
