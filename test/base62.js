let base62 = require('../lib/base62.js')
let assert = require('assert')

describe('base62', function() {
  it('should encode 0 correctly', function() {
    let n = 0
    let x = base62(n)
    assert.equal(x, '0')
  })

  it('should encode 1 correctly', function() {
    let n = 1
    let x = base62(n)
    assert.equal(x, '1')
  })

  it('should run out of numbers at 10', function() {
    let n = 10
    let x = base62(n)
    assert.equal(x, 'A')
  })

  it('should run out of lowercase letters at 36', function() {
    let n = 36
    let x = base62(n)
    assert.equal(x, 'a')
  })

  it('should wrap at 62', function() {
    let n = 62
    let x = base62(n)
    assert.equal(x, '10')
  })

  it('should encode big number correctly', function() {
    let n = 199919991999
    let x = base62(n)
    assert.equal(x, '3WDjuZz')
  })

  it('should encode biggest integer correctly', function() {
    let n = 9007199254740991 // 2^53 -1 or Number.MAX_SAFE_INTEGER
    let x = base62(n)
    assert.equal(x, 'fFgnDxSe7')
  })

  it('should ignore negative numbers', function() {
    let n = -1
    let x = base62(n)
    assert.equal(x, '')
  })

})