// https://en.wikipedia.org/wiki/Tower_of_Hanoi

const Stack = require('../stack/Stack')

class TowersOfHanoi {
  moveDisks(n, from = null, to = null, via = null) {
    if (n <= 0) {
      return { from, to, via }
    }

    // initial state setup
    if (!from) {
      from = new Stack(n)
      for (let i = n; i > 0; i--) {
        from.push(i)
      }
      to = new Stack(n)
      via = new Stack(n) // buffer
    }

    // move top disk from => to
    if (n === 1) {
      this._putDisk(to, from.pop())
      return { from, to, via }
    }

    // free bottom disk on from = move n-1 disks from => (to) => via
    this.moveDisks(n - 1, from, via, to)
    // move bottom = top disk of from to final destination = move 1 disk from => to
    this.moveDisks(1, from, to, via)
    // move buffer to final destination = move n - 1 disks via => (from) => to
    this.moveDisks(n - 1, via, to, from)

    return { from, to, via }
  }

  _putDisk(tower, n) {
    if (!tower.isEmpty && (tower.peek < n)) {
      throw new Error(`wrong move ${n}`)
    }
    tower.push(n)
  }
}

module.exports = TowersOfHanoi
