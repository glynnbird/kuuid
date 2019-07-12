const ts = require('../lib/ts.js')
const assert = require('assert')

describe('ts', function () {
  it('should return the current timestamp', function () {
    const t1 = ts()
    const t2 = Math.floor(new Date().getTime() / 1000)
    const diff = Math.abs(t2 - t1)
    const lessThanASecond = (diff < 1)
    assert(lessThanASecond)
  })

  it('should return timestamp given string date', function () {
    const t1 = ts('2018-01-01')
    assert.strictEqual(t1, 1514764800)
  })

  it('should return timestamp given number of milliseconds', function () {
    const t1 = ts(99000)
    assert.strictEqual(t1, 99)
  })
})
