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
    return this.edges.find(_ => _.end === vertex)
  }

  //////////////////////////////////////////////////////////////////////////////

  get neighbors() {
    return this.edges.map(_ => _.end)
  }

  get neighborsWithWeight() {
    return this.edges.map((_) => { return { neighbor: _.end, weight: _.weight } })
  }

  get randomNeighbor() {
    if (!this.degree) return null
    const edge = this.edges[Math.floor(Math.random() * this.edges.length)]
    return edge.start === this ? edge.end : edge.start
  }

  hasNeighbor(vertex) {
    if (!vertex) return false // || (vertex === this)
    return !!this.edgeByVertex(vertex)
  }

  get pointsToSelf() {
    return this.edges.some(_ => _.end === this)
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
    this.clear()
    this.sameValue = valueEqualityComparer || ((a, b) => a === b)
  }

  //////////////////////////////////////////////////////////////////////////////

  // creates a new vertex, but does not add it to graph (use addVertex to add it)
  createNewVertex(value) {
    return new Vertex(value)
  }

  clear() {
    this.vertices = new Set() // {} would be wrong here
    this.edges = new Set()
  }

  get allVertices() {
    return Array.from(this.vertices)
  }

  // reverse lookup index map from vertex to its index
  get allVerticesWithIndex() {
    const vertices = this.allVertices
    const reverseIndex = new Map()
    vertices.forEach((vertex, idx) => {
      reverseIndex.set(vertex, idx)
    })
    return { vertices, reverseIndex }
  }

  get allEdges() {
    return Array.from(this.edges)
  }

  hasVertex(vertex) {
    if (!vertex) return false
    return this.vertices.has(vertex)
  }

  hasEdge(edge) {
    if (!edge) return false
    return this.edges.has(edge)
  }

  hasVertexByValue(value) {
    return !!this.firstVertexByValue(value)
  }

  // can be slow, consider using allVerticesWithIndex
  indexOf(vertex) {
    if (!this.hasVertex(vertex) || (this.vertexCount <= 0)) return -1
    const vertices = this.allVertices
    for (let i = 0; i < vertices.length; i++) {
      if (vertices[i] === vertex) return i
    }
    return -1
  }

  //////////////////////////////////////////////////////////////////////////////

  addVertex(vertex) {
    if (!vertex) throw new Error('null vertex')
    this.vertices.add(vertex)
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

  // removes edges, but leaves vertex in graph
  unlinkVertex(vertex) {
    if (!vertex || !this.hasVertex(vertex)) return false
    const edgesToRemove = this.allEdges.filter(_ => _.start === vertex || _.end === vertex)
    edgesToRemove.forEach(_ => this.removeEdge(_))
    return true
  }

  // unlink and remove from graph
  removeVertex(vertex) {
    if (!this.unlinkVertex(vertex)) return false
    this.vertices.delete(vertex)
    return true
  }

  removeVertexByValue(value) {
    this.verticesByValue(value).forEach(_ => this.removeVertex(_))
    return this
  }

  outDegree(vertex) {
    if (!vertex || !this.hasVertex(vertex)) return -1
    return vertex.degree
  }

  inDegree(vertex) {
    if (!vertex || !this.hasVertex(vertex)) return -1
    return this.allEdges.reduce((count, edge) => {
      if (edge.end === vertex) {
        count++
      }
      return count
    }, 0)
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
    if (inBothDirections && (vertex1 !== vertex2)) {
      this.addEdge(new Edge(vertex2, vertex1, weight))
    }
    return this
  }

  addEdge(edge) {
    if (!edge) throw new Error('null edge')
    if (this.hasEdge(edge)) return this
    this.edges.add(edge)
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
    this.edges.delete(edge)
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

  edgeByVerticesValue(startValue, endValue) {
    return this.edgeByVertices(
      this.firstVertexByValue(startValue),
      this.firstVertexByValue(endValue))
  }

  hasEdgeByVertices(start, end) {
    return !!this.edgeByVertices(start, end)
  }

  hasEdgeByVerticesValue(startValue, endValue) {
    return !!this.edgeByVerticesValue(startValue, endValue)
  }

  //////////////////////////////////////////////////////////////////////////////

  randomVertex() {
    const vertices = this.allVertices
    if (!vertices.length) return null
    return vertices[Math.floor(Math.random() * vertices.length)]
  }

  // change direction of edges
  reverseDirection() {
    this.edges.forEach(edge => {
      this.removeEdge(edge)
      edge.reverseDirection()
      this.addEdge(edge)
    })
  }

  get vertexCount() {
    return this.vertices.size
  }

  get edgeCount() {
    return this.edges.size
  }

  toAdjacencyMatrix() {
    const { vertices, reverseIndex } = this.allVerticesWithIndex
    if (!vertices.length) return null
    const matrix = new Array(vertices.length).fill(null).map(_ => new Array(vertices.length).fill(Infinity))
    vertices.forEach((vertex, idx) => {
      vertex.neighbors.forEach(neighbor => {
        const neighborIdx = reverseIndex.get(neighbor)
        const edge = this.edgeByVertices(vertex, neighbor)
        matrix[idx][neighborIdx] = edge.weight
      })
    })

    return { matrix, vertices, reverseIndex }
  }

  toString() {
    return this.allVertices.map(_ => `${_.toString()}->[${_.edges.join(',')}]`).join(' ')
  }
}

module.exports = { WeightedGraph, Vertex, Edge }
