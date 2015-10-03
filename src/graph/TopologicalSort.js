const graph = require('./Graph')

class TopologicalSort {
  _getNode(nodesMap, value) {
    if (!nodesMap.has(value)) {
      nodesMap.set(value, new graph.Graph(value))
    }
    return nodesMap.get(value)
  }

  _createGraph(dependencies) {
    const nodeMap = new Map()
    dependencies.forEach(element => {
      const elementNode = this._getNode(nodeMap, element.value)
      if (element.before) {
        element.before.forEach(before => {
          const beforeElement = this._getNode(nodeMap, before)
          beforeElement.addChild(elementNode)
        })
      }
      if (element.after) {
        element.after.forEach(after => {
          const afterElement = this._getNode(nodeMap, after)
          elementNode.addChild(afterElement)
        })
      }
    })
    return graph.Graph.create(Array.from(nodeMap.values()))
  }

  _calcIncomingEdges(nodesGraph) {
    nodesGraph.children.forEach(node => {
      node.children.forEach(child => {
        if (!child.inbound) child.inbound = 1
        else child.inbound += 1
      })
    })
  }

  // local dependencies [{ value: 'a', before: [], after: [] }, ...]
  sort(dependencies) {
    if (!dependencies) return []
    const nodesGraph = this._createGraph(dependencies)
    this._calcIncomingEdges(nodesGraph)
    const queue = [...nodesGraph.children.filter(_ => !_.inbound)]
    const ordered = []
    while (queue.length) {
      const node = queue.shift()
      node.children.forEach(child => {
        child.inbound -= 1
        if (!child.inbound) {
          queue.push(child)
        }
      })
      ordered.push(node)
    }
    if (ordered.length !== nodesGraph.children.length) {
      throw new Error('ordering is not possible')
    }
    return ordered
  }
}

module.exports = TopologicalSort
