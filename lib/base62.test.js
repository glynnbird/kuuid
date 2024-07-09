const test = require('node:test')
const assert = require('node:assert').strict
const base62 = require('./base62.js')

test('should encode 0 correctly', function () {
  const n = 0
  const x = base62(n)
  assert.strictEqual(x, '0')
})

test('should encode 1 correctly', function () {
  const n = 1
  const x = base62(n)
  assert.strictEqual(x, '1')
})

test('should run out of numbers at 10', function () {
  const n = 10
  const x = base62(n)
  assert.strictEqual(x, 'A')
})

test('should run out of lowercase letters at 36', function () {
  const n = 36
  const x = base62(n)
  assert.strictEqual(x, 'a')
})

test('should wrap at 62', function () {
  const n = 62
  const x = base62(n)
  assert.strictEqual(x, '10')
})

test('should encode big number correctly', function () {
  const n = 199919991999
  const x = base62(n)
  assert.strictEqual(x, '3WDjuZz')
})

test('should encode biggest integer correctly', function () {
  const n = 9007199254740991 // 2^53 -1 or Number.MAX_SAFE_INTEGER
  const x = base62(n)
  assert.strictEqual(x, 'fFgnDxSe7')
})

test('should ignore negative numbers', function () {
  const n = -1
  const x = base62(n)
  assert.strictEqual(x, '')
})

