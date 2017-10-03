// https://en.wikipedia.org/wiki/Eight_queens_puzzle

class EightQueens {
  // place N queens on a NxN board
  solve(boardSize = 8) {
    if (boardSize <= 0) boardSize = 8
    const results = []
    this._solve(boardSize, [], results, 0) // first row is 0
    return results
  }

  _solve(boardSize, columns, results, row) {
    // end of board
    if (row === boardSize) {
      results.push(columns.slice(0)) // clone
      return
    }
    for (let col = 0; col < boardSize; col++) {
      if (!this._isValidPosition(columns, row, col)) {
        continue
      }
      columns[row] = col // remember position
      this._solve(boardSize, columns, results, row + 1) // check next row
    }
  }

  _isValidPosition(columns, row, col) {
    // check queens on all previous rows against new position (row, col)
    for (let r = 0; r < row; r++) {
      const c = columns[r]
      // queen on same col
      if (c === col) {
        return false
      }
      // queen on same diagonal: colDelta = rowDelta
      const colDelta = Math.abs(col - c)
      const rowDelta = row - r
      if (rowDelta === colDelta) {
        return false
      }
    }
    // all ok
    return true
  }
}

module.exports = EightQueens
