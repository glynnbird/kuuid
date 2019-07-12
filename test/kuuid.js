const kuuid = require('..')
const assert = require('assert')

describe('kuuid', function () {
  it('should return 32 character id', function () {
    const x = kuuid.id()
    assert.strictEqual(x.length, 32)
  })

  it('should return ids that sort correctly', function (done) {
    this.timeout(30000)
    const ids = []
    const interval = setInterval(function () {
      ids.push(kuuid.id())
      if (ids.length === 20) {
        process.stdout.write('\n')
        const j1 = JSON.stringify(ids)
        ids.sort()
        const j2 = JSON.stringify(ids)
        // make sure sorting has had no effect i.e. they were sorted already
        assert.strictEqual(j1, j2)
        clearInterval(interval)
        done()
      } else {
        process.stdout.write('.')
      }
    }, 1100)
  })

  it('should return ids that sort correctly - reverse mode', function (done) {
    this.timeout(30000)
    const ids = []
    const interval = setInterval(function () {
      ids.push(kuuid.idr())
      if (ids.length === 20) {
        process.stdout.write('\n')
        const j1 = JSON.stringify(ids)
        ids.sort().reverse()
        const j2 = JSON.stringify(ids)
        // make sure sorting has had no effect i.e. they were sorted already
        assert.strictEqual(j1, j2)
        clearInterval(interval)
        done()
      } else {
        process.stdout.write('.')
      }
    }, 1100)
  })

  it('should return unique ids', function () {
    this.timeout(30000)
    const ids = []
    for (var i = 0; i < 10000; i++) {
      const k = kuuid.id()
      assert.strictEqual(-1, ids.indexOf(k))
      ids.push(k)
    }
  })

  it('should take a user-supplied timestamp', function () {
    const id = kuuid.id('2018-01-01T00:00:00.000Z')
    const prefix1 = id.substr(0, 8)
    const prefix2 = kuuid.prefix('2018-01-01T00:00:00.000Z')
    assert.strictEqual(prefix1, '001eVnWK')
    assert.strictEqual(prefix2, prefix1)
  })

  it('should generate prefix for the epoch', function () {
    const prefix = kuuid.prefix('1970-01-01T00:00:00.000Z')
    assert.strictEqual(prefix, '00000000')
  })

  it('should generate prefix for the epoch + 1 year', function () {
    const prefix = kuuid.prefix('1971-01-01T00:00:00.000Z')
    assert.strictEqual(prefix, '00028JxA')
  })

  it('should generate prefix for the epoch + 10 year', function () {
    const prefix = kuuid.prefix('1980-01-01T00:00:00.000Z')
    assert.strictEqual(prefix, '000LLwUi')
  })

  it('should generate prefix for the epoch + 50 year', function () {
    const prefix = kuuid.prefix('2020-01-01T00:00:00.000Z')
    assert.strictEqual(prefix, '001imRQe')
  })

  it('should generate prefix for the epoch + 200 year', function () {
    const prefix = kuuid.prefix('2170-01-01T00:00:00.000Z')
    assert.strictEqual(prefix, '006t88C8')
  })

  it('should generate prefix with a numerical offset', function () {
    const prefix = kuuid.prefix(1514764800000)
    assert.strictEqual(prefix, '001eVnWK')
  })

  it('should generate reverse prefix for the epoch', function () {
    const prefix = kuuid.prefixReverse('1970-01-01T00:00:00Z')
    assert.strictEqual(prefix, 'zzzzzzzz')
  })

  it('should generate reverse prefix for the epoch + 1', function () {
    const prefix = kuuid.prefixReverse('1970-01-01T00:00:01Z')
    assert.strictEqual(prefix, 'zzzzzzzy')
  })

  it('should generate random data', function () {
    this.timeout(30000)
    const ids = []
    for (var i = 0; i < 10000; i++) {
      const k = kuuid.rand()
      assert.strictEqual(-1, ids.indexOf(k))
      ids.push(k)
    }
  })
})
