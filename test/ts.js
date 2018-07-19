let ts = require('../lib/ts.js')
let assert = require('assert')

describe('ts', function() {
  it('should return the current timestamp', function() {
    let t1 = ts()
    let t2 = Math.floor(new Date().getTime()/1000 - 1514764800) // 2018-01-01
    let diff = Math.abs(t2 - t1)
    let lessThanASecond = (diff < 1)
    assert(lessThanASecond)
  })
})