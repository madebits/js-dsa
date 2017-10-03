// https://en.wikipedia.org/wiki/Bidirectional_search
// breadth first search from both directions

class BidirectionalBfs {
  searchPath(graph, src, dst) {
    if (!graph || !graph.hasVertex(src) || !graph.hasVertex(dst)) return

    const srcBfs = new BfsContext(src)
    const dstBfs = new BfsContext(dst)

    while (!srcBfs.isFinished && !dstBfs.isFinished) {
      // search from src to dst
      let collision = this._searchNext(graph, srcBfs, dstBfs)
      if (collision) {
        return this._mergePaths(srcBfs, dstBfs, collision)
      }

      //search from dst to src
      collision = this._searchNext(graph, dstBfs, srcBfs)
      if (collision) {
        return this._mergePaths(srcBfs, dstBfs, collision)
      }
    }

    // no path
    return null
  }

  _searchNext(graph, startBfs, endBfs) {
    // search only one level at a time, remember level size
    const levelSize = startBfs.queueSize
    for (let i = 0; i < levelSize; i++) {
      const node = startBfs.queue.shift()
      // collision, searches from both sides connect at node
      if (endBfs.marked.has(node)) {
        return node
      }

      node.neighbors.forEach(child => {
        if (startBfs.marked.has(child)) return
        startBfs.queue.push(child)
        startBfs.marked.set(child, node) // previous = node
      })
    }
    // no collision on this level
    return null
  }

  _mergePaths(srcBfs, dstBfs, collision) {
    const path = [ collision ]
    let previous = collision
    do {
      previous = srcBfs.marked.get(previous)
      if (!previous) break
      path.unshift(previous)
    } while (true)
    let next = collision
    do {
      next = dstBfs.marked.get(next)
      if (!next) break
      path.push(next)
    } while (true)
    return path
  }
}

class BfsContext {
  constructor(vertex) {
    this.queue = [ vertex ]
    this.marked = new Map()
    this.marked.set(vertex, null) // previous = null
  }

  get queueSize() {
    return this.queue.length
  }

  get isFinished() {
    return this.queueSize <= 0
  }
}

module.exports = BidirectionalBfs
