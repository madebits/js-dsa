// not a sorting algorithm, but a (fast) way to compare two strings taking into account numeric parts

const naturalSort = (function () {
  /* eslint-disable complexity */
  const nc = function (s1, s2, zeroesFirst) {
    let sp1 = (typeof s1 === 'undefined')
    let sp2 = (typeof s2 === 'undefined')
    if (sp1 && sp2) return 0
    else if (sp1) return -1
    else if (sp2) return 1

    sp1 = (s1 == null)
    sp2 = (s2 == null)
    if (sp1 && sp2) return 0
    else if (sp1) return -1
    else if (sp2) return 1

    if (!isStr(s1)) s1 = s1.toString()
    if (!isStr(s2)) s2 = s2.toString()

    sp1 = (s1.length <= 0)
    sp2 = (s2.length <= 0)
    if (sp1 && sp2) return 0
    else if (sp1) return -1
    else if (sp2) return 1

    sp1 = isLetterOrDigit(s1[0])
    sp2 = isLetterOrDigit(s2[0])
    if (sp1 && !sp2) return 1
    if (!sp1 && sp2) return -1

    let i1 = 0

    let i2 = 0 // current index
    let r = 0 // temp result
    let c1, c2
    let letter1, letter2

    while (true) {
      c1 = s1[i1]
      c2 = s2[i2]
      sp1 = isDigit(c1)
      sp2 = isDigit(c2)
      if (!sp1 && !sp2) {
        letter1 = isLetter(c1)
        letter2 = isLetter(c2)

        if (letter1 && letter2) {
          r = compare(c1.toLocaleUpperCase(), c2.toLocaleUpperCase())
          if (r !== 0) return r
        } else if (!letter1 && !letter2) {
          r = c1.localeCompare(c2)
          if (r !== 0) return r
        } else if (!letter1 && letter2) {
          return -1
        } else if (letter1 && !letter2) {
          return 1
        }
      } else if (sp1 && sp2) {
        let temp = compareNum(s1, i1, s2, i2, zeroesFirst)
        r = temp.r
        if (r !== 0) return r
        i1 = temp.i1
        i2 = temp.i2
      } else if (sp1) {
        return -1
      } else if (sp2) {
        return 1
      }
      i1++
      i2++

      sp1 = (i1 >= s1.length)
      sp2 = (i2 >= s2.length)
      if (sp1 && sp2) {
        return 0
      } else if (sp1) {
        return -1
      } else if (sp2) {
        return 1
      }
    }
  }

  const compareNum = function (s1, i1, s2, i2, zeroesFirst) {
    const ret = function (res) {
      return ({
        r: res,
        i1: i1,
        i2: i2
      })
    }

    let r = 0
    let nzStart1 = i1

    let nzStart2 = i2 // nz = non zero
    let end1 = i1

    let end2 = i2
    let temp = null

    temp = scanNumEnd(s1, i1, end1, nzStart1)
    end1 = temp.end
    nzStart1 = temp.nzStart
    temp = scanNumEnd(s2, i2, end2, nzStart2)
    end2 = temp.end
    nzStart2 = temp.nzStart

    let start1 = i1
    i1 = end1 - 1
    let start2 = i2
    i2 = end2 - 1

    if (zeroesFirst) {
      const zl1 = nzStart1 - start1
      const zl2 = nzStart2 - start2
      if (zl1 > zl2) return ret(-1)
      if (zl1 < zl2) return ret(1)
    }

    const nzLength1 = end1 - nzStart1
    const nzLength2 = end2 - nzStart2

    if (nzLength1 < nzLength2) return ret(-1)
    else if (nzLength1 > nzLength2) return ret(1)

    for (let j1 = nzStart1, j2 = nzStart2; j1 <= i1; j1++, j2++) {
      r = compare(s1[j1], s2[j2])
      if (r !== 0) return ret(r)
    }
    // the nz parts are equal
    const length1 = end1 - start1
    const length2 = end2 - start2
    if (length1 === length2) return ret(0)
    if (length1 > length2) return ret(-1)
    return ret(1)
  }

  //lookahead
  const scanNumEnd = function (s, start, end, nzStart) {
    nzStart = start
    end = start
    let countZeros = true
    while (isDigit(s[end])) {
      if (countZeros && (s[end] === '0')) {
        nzStart++
      } else countZeros = false
      end++
      if (end >= s.Length) break
    }
    return ({
      end: end,
      nzStart: nzStart
    })
  }

  const compare = function (s1, s2) {
    const r = s1.localeCompare(s2)
    if (r < 0) return -1
    else if (r > 0) return 1
    return 0
  }

  //http://stackoverflow.com/questions/9862761/how-to-check-if-character-is-a-letter-in-javascript
  const isLetter = function (c) {
    return c.toLocaleLowerCase() !== c.toLocaleUpperCase()
  }

  //http://stackoverflow.com/questions/8935632/check-if-character-is-number
  const digitMap = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  const isDigit = function (c) {
    return !!digitMap[c]
  }

  const isLetterOrDigit = function (c) {
    return isDigit(c) || isLetter(c)
  }

  const isStr = function (s) {
    return ((typeof s === 'string') || (s instanceof String))
  }

  return nc
}())

module.exports = naturalSort
