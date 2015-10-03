// https://en.wikipedia.org/wiki/Levenshtein_distance
class LevenshteinDistance {
  editDistance(s1, s2, editCosts = null) {
    if (!s1 || !s2) return -1

    // edit cost 1,1,1 or 2,1,1, etc
    editCosts = editCosts || {}
    ;['deletion', 'insertion', 'substitution'].forEach(_ => {
      if (editCosts[_] === undefined) editCosts[_] = 1 // default cost
    })

    if (!s1.length) return s2.length * editCosts.insertion
    if (!s2.length) return s1.length * editCosts.insertion

    // 2D matrix
    const distance = Array(s1.length + 1)
      .fill(null)
      .map(() => Array(s2.length + 1).fill(0))

    // from s1 to empty string delete cost is proportional to s1 length
    for (let i = 0; i <= s1.length; i++) {
      distance[i][0] = (i * editCosts.deletion)
    }
    // from empty to s2 insert cost is proportional to s2 length
    for (let i = 0; i <= s2.length; i++) {
      distance[0][i] = (i * editCosts.insertion)
    }

    for (let i = 0; i < s1.length; i++) {
      const rowIdx = i + 1
      for (let j = 0; j < s2.length; j++) {
        const colIdx = j + 1
        distance[rowIdx][colIdx] = Math.min(
          distance[rowIdx - 1][colIdx] + editCosts.deletion,
          distance[rowIdx][colIdx - 1] + editCosts.insertion,
          distance[rowIdx - 1][colIdx - 1] + (s1[i] === s2[j] ? 0 : editCosts.substitution)
        )
      }
    }

    return distance[s1.length][s2.length]
  }
}

module.exports = LevenshteinDistance
