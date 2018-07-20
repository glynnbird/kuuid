let kuuid = require('..')
let assert = require('assert')


describe('kuuid', function() {

  it('should return 32 character id', function() {
    let x = kuuid.id()
    assert.equal(x.length, 32)
  })

  it('should return ids that sort correctly', function(done) {
    this.timeout(30000);
    let ids = []
    const interval = setInterval(function() {
      ids.push(kuuid.id())
      if (ids.length == 20) {
        process.stdout.write('\n')
        let j1 = JSON.stringify(ids)
        ids.sort()
        let j2 = JSON.stringify(ids)
        // make sure sorting has had no effect i.e. they were sorted already
        assert.equal(j1, j2)
        clearInterval(interval)
        done()
      } else {
        process.stdout.write('.')
      }
    }, 1100)
  })

  it('should return unique ids', function() {
    this.timeout(30000)
    let ids = []
    for (var i = 0; i < 10000; i++) {
      let k = kuuid.id()
      assert.equal(-1, ids.indexOf(k))
      ids.push(k)
    }
  })

  it('should take a user-supplied timestamp', function() {
    let id = kuuid.id('2018-01-01T00:00:00.000Z')
    let prefix1 = id.substr(0, 8)
    let prefix2 = kuuid.prefix('2018-01-01T00:00:00.000Z')
    assert.equal(prefix1, '001eVnWK')
    assert.equal(prefix2, prefix1)
  })

  it('should generate prefix for the epoch', function() {
    let prefix = kuuid.prefix('1970-01-01T00:00:00.000Z')
    assert.equal(prefix, '00000000')
  })

  it('should generate prefix for the epoch + 1 year', function() {
    let prefix = kuuid.prefix('1971-01-01T00:00:00.000Z')
    assert.equal(prefix, '00028JxA')
  })

  it('should generate prefix for the epoch + 10 year', function() {
    let prefix = kuuid.prefix('1980-01-01T00:00:00.000Z')
    assert.equal(prefix, '000LLwUi')
  })

  it('should generate prefix for the epoch + 50 year', function() {
    let prefix = kuuid.prefix('2020-01-01T00:00:00.000Z')
    assert.equal(prefix, '001imRQe')
  })

  it('should generate prefix for the epoch + 200 year', function() {
    let prefix = kuuid.prefix('2170-01-01T00:00:00.000Z')
    assert.equal(prefix, '006t88C8')
  })

  it('should generate prefix with a numerical offset', function() {
    let prefix = kuuid.prefix(1514764800000)
    assert.equal(prefix, '001eVnWK')
  })

  it('should generate random data', function() {
    this.timeout(30000)
    let ids = []
    for (var i = 0; i < 10000; i++) {
      let k = kuuid.rand()
      assert.equal(-1, ids.indexOf(k))
      ids.push(k)
    }
  })

})