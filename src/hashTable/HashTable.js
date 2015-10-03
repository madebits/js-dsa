class HashTable {
  constructor(size = 256, hasher = null, equalityComparer = null) {
    if (size < 0) size = 16
    this._hasher = {
      hash: hasher || this._defaultHasher,
      compare: equalityComparer || ((a, b) => a === b)
    }
    this._buckets = (new Array(size)).fill(null).map(_ => [])
  }

  _defaultHasher(key) {
    if (!key) return 0
    if (typeof (key) === 'number') return key
    // http://www.cse.yorku.ca/~oz/hash.html
    // djb2
    return Array.from(key.toString()).reduce(
      (hash, letter) => ((hash << 5) + hash) + letter.charCodeAt(0),
      5381)
  }

  _hash(s) {
    return this._hasher.hash(s)
  }

  _get(key) {
    const idx = Math.abs(this._hash(key) % this._buckets.length)
    const collisionIdx = this._buckets[idx].findIndex(_ => this._hasher.compare(_.key, key))
    return {
      idx,
      collisionIdx
    }
  }

  set(key, value) {
    const {
      idx,
      collisionIdx
    } = this._get(key)
    if (collisionIdx >= 0) {
      this._buckets[idx][collisionIdx].value = value
    } else {
      this._buckets[idx].push({
        key,
        value
      })
    }
    return this
  }

  get(key) {
    const {
      idx,
      collisionIdx
    } = this._get(key)
    if (collisionIdx < 0) return undefined
    return this._buckets[idx][collisionIdx].value
  }

  has(key) {
    const {
      collisionIdx
    } = this._get(key)
    return collisionIdx >= 0
  }

  remove(key) {
    const {
      idx,
      collisionIdx
    } = this._get(key)
    if (collisionIdx < 0) return undefined
    const value = this._buckets[idx][collisionIdx].value
    this._buckets[idx].splice(collisionIdx, 1)
    return value
  }

  get keys() {
    //return this._buckets.flatMap(bucket => bucket.map(_ => _.key))
    return this._buckets.reduce((keys, bucket) => {
      keys.push(...bucket.map(_ => _.key))
      return keys
    }, [])
  }

  get values() {
    return this._buckets.reduce((values, bucket) => {
      values.push(...bucket.map(_ => _.value))
      return values
    }, [])
  }

  get entries() {
    return this._buckets.reduce((entries, bucket) => {
      entries.push(...bucket)
      return entries
    }, [])
  }

  // collect counts on a list of words
  collect(wordsArray) {
    for (let key of wordsArray) {
      const {
        idx,
        collisionIdx
      } = this._get(key)
      if (collisionIdx >= 0) {
        this._buckets[idx][collisionIdx].value += 1
      } else {
        this._buckets[idx].push({
          key,
          value: 1
        })
      }
    }
  }

  get count() {
    return this._buckets.reduce((accumulator, bucket) => accumulator + bucket.length, 0)
  }

  get stats() {
    const bucketLengths = this._buckets.map(_ => _.length)
    return {
      buckets: this._buckets.length,
      count: this.count,
      emptyBuckets: this._buckets.reduce((accumulator, bucket) => accumulator + (bucket.length ? 0 : 1), 0),
      bucketLengths,
      averageBucketLength: bucketLengths.reduce((sum, length) => sum + length, 0) / this._buckets.length,
      maxBucketLength: bucketLengths.reduce((max, length) => Math.max(max, length)),
      idealBucketLength: this.count / this._buckets.length
    }
  }
}

module.exports = HashTable
