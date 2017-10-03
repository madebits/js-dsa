// https://en.wikipedia.org/wiki/Knight%27s_tour
// https://www.geeksforgeeks.org/the-knights-tour-problem-backtracking-1/

class KnightTour {
  constructor() {
    // knight deltas around position, 8 moves
    this._moveR = [1, 2, 2, 1, -1, -2, -2, -1]
    this._moveC = [2, 1, -1, -2, -2, -1, 1, 2]
  }

  tour(n = 8) {
    const board = Array(n).fill(null).map(() => Array(n).fill(false))

    // start at (0,0)
    const moves = [{ r: 0, c: 0 }]
    this._markVisited(board, moves[0])

    return this._solve(board, moves) ? moves : null
  }

  _markVisited(board, pos, visited = true) {
    board[pos.r][pos.c] = visited
  }

  _solve(board, moves) {
    if (moves.length === board.length * board.length) {
      return true
    }
    const previousMove = moves[moves.length - 1]

    for (let i = 0; i < 8; i++) {
      const move = { r: previousMove.r + this._moveR[i], c: previousMove.c + this._moveC[i] }
      if (!this._canMove(board, move)) {
        continue
      }
      moves.push(move)
      this._markVisited(board, move, true)
      if (this._solve(board, moves)) {
        return true
      }
      // backtrack
      moves.pop()
      this._markVisited(board, move, false)
    }
    return false
  }

  _canMove(board, move) {
    return (move.r >= 0) &&
      (move.r < board.length) &&
      (move.c >= 0) &&
      (move.c < board.length) &&
      !board[move.r][move.c]
  }
}

module.exports = KnightTour
