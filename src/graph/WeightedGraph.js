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
      this.edges.splice(idx, 1)
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
    return this.edges.find(_ => _.end === vertex || _.start === vertex)
  }

  //////////////////////////////////////////////////////////////////////////////

  get neighbors() {
    return this.edges.map(_ => _.start === this ? _.end : _.start)
  }

  get neighborsWithWeight() {
    return this.edges.map((_) => { return { neighbor: _.start === this ? _.end : _.start, weight: _.weight } })
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

  isReverseDirection(edge) {
    if (!edge) return false
    return edge.start === this.end && edge.end === this.start
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
  constructor(isDirected = false, valueEqualityComparer = null) {
    this.clear()
    this.sameValue = valueEqualityComparer || ((a, b) => a === b)
    this.isDirected = isDirected
    this.isGraph = true // to recognize instances in js code
  }

  //////////////////////////////////////////////////////////////////////////////

  // factory: create a new graph
  createNewGraph(isDirected = false, valueEqualityComparer = null) {
    return new WeightedGraph(isDirected, valueEqualityComparer || this.sameValue.bind(this))
  }

  // factory: creates a new vertex, but does not add it to graph (use addVertex to add it)
  createNewVertex(value) {
    return new Vertex(value)
  }

  // factory: create edge, but does not add it to graph
  createNewEdge(startVertex, endVertex, weight = 0) {
    return new Edge(startVertex, endVertex, weight)
  }

  //////////////////////////////////////////////////////////////////////////////

  clear() {
    this.vertices = new Set() // {} would be wrong here
    this.edges = new Set()
  }

  // same this.allVertices
  get neighbors() {
    return this.allVertices
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
  // return the first found or new added vertex
  addVertexByValue(value) {
    let vertex = this.firstVertexByValue(value)
    if (vertex) return vertex // already there
    vertex = new Vertex(value)
    this.addVertex(vertex)
    return vertex
  }

  verticesByValue(value) {
    return this.allVertices.filter(_ => this.sameValue(_.value, value))
  }

  firstVertexByValue(value) {
    const vertices = this.verticesByValue(value)
    return vertices.length ? vertices[0] : null
  }

  neighborsByVertex(vertex) {
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
    if (!this.isDirected) return vertex.degree
    return this.allEdges.reduce((count, edge) => {
      if (edge.end === vertex) {
        count++
      }
      return count
    }, 0)
  }

  //////////////////////////////////////////////////////////////////////////////

  // useful only if unique node values are needed
  addEdgeFromToByValue(value1, value2, weight = 0, bidirectional = false) {
    return this.addEdgeFromTo(
      this.addVertexByValue(value1),
      this.addVertexByValue(value2),
      weight,
      bidirectional)
  }

  addEdgeFromTo(vertex1, vertex2, weight = 0, bidirectional = false) {
    this.addEdge(new Edge(vertex1, vertex2, weight))
    if (bidirectional && (vertex1 !== vertex2)) {
      this.addEdge(new Edge(vertex2, vertex1, weight))
    }
    return this
  }

  addEdge(edge) {
    if (!edge) throw new Error('null edge')
    if (this.hasEdge(edge)) return this
    if (this.hasEdgeByVertices(edge.start, edge.end)) {
      return this
    }
    this.edges.add(edge)
    for (let vertex of edge.vertices()) {
      if (!this.hasVertex(vertex)) {
        this.addVertex(vertex)
      }
    }
    edge.start.addEdge(edge) // directed only start node has the edge
    if (!this.isDirected && (edge.start !== edge.end)) {
      edge.end.addEdge(edge)
    }
    return this
  }

  removeEdge(edge) {
    if (!edge) throw new Error('edge')
    if (!this.hasEdge(edge)) return false
    this.edges.delete(edge)
    for (let vertex of edge.vertices()) {
      vertex.removeEdge(edge)
    }
    return true
  }

  removeEdgeByVertices(start, end) {
    const edge = this.edgeByVertices(start, end)
    if (!edge) return false
    return this.removeEdge(edge)
  }

  removeEdgeByVerticesValue(startValue, endValue) {
    const edge = this.edgeByVerticesValue(startValue, endValue)
    if (!edge) return false
    return this.removeEdge(edge)
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

  findReverseEdge(edge) {
    if (!edge) throw new Error('edge')
    if (!this.hasEdge(edge)) return null
    return this.edgeByVertices(edge.end, edge.start)
  }

  //////////////////////////////////////////////////////////////////////////////

  randomVertex() {
    const vertices = this.allVertices
    if (!vertices.length) return null
    return vertices[Math.floor(Math.random() * vertices.length)]
  }

  transpose() {
    this.reverseDirection()
  }

  // change direction of edges
  reverseDirection() {
    if (!this.isDirected) return // makes no sense
    this.allEdges.forEach(edge => {
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

  get totalWeight() {
    return this.allEdges.reduce((weight, edge) => weight + edge.weight, 0)
  }

  // edgeToWeightCb: (edge, start, startIdx, end, endIdx) => edge.weight
  toAdjacencyMatrix(edgeToWeightCb = null) {
    edgeToWeightCb = edgeToWeightCb || ((edge, start, startIdx, end, endIdx) => edge.weight)
    const { vertices, reverseIndex } = this.allVerticesWithIndex
    if (!vertices.length) return null
    const matrix = new Array(vertices.length).fill(null).map(_ => new Array(vertices.length).fill(Infinity))
    vertices.forEach((vertex, idx) => {
      matrix[idx][idx] = 0 // each vertex can reach self
      vertex.neighbors.forEach(neighbor => {
        const neighborIdx = reverseIndex.get(neighbor)
        const edge = this.edgeByVertices(vertex, neighbor)
        matrix[idx][neighborIdx] = edgeToWeightCb(edge, vertex, idx, neighbor, neighborIdx)
      })
    })

    return { matrix, vertices, reverseIndex }
  }

  // does not clone values
  cloneSubGraph(setOfEdges) {
    const result = new WeightedGraph()
    if (!setOfEdges) return result
    const clones = new Map()
    setOfEdges.forEach(edge => {
      if (!this.hasEdge(edge)) return
      for (let v of edge.vertices()) {
        if (!clones.has(v)) {
          clones.set(v, new Vertex(v.value))
        }
      }
      result.addEdgeFromTo(clones.get(edge.start), clones.get(edge.end), edge.weight)
    })
    return result
  }

  toString() {
    return this.allVertices.map(_ => `${_.toString()}->[${_.edges.join(',')}]`).join(' ')
  }
}

module.exports = { WeightedGraph, Vertex, Edge }
