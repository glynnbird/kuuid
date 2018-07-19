let kuuid = require('..')
let assert = require('assert')


describe('kuuid', function() {

  it('should return 32 character id', function() {
    let x = kuuid()
    assert.equal(x.length, 32)
  })

  it('should return ids that sort correctly', function(done) {
    this.timeout(30000);
    let ids = []
    const interval = setInterval(function() {
      ids.push(kuuid())
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
    this.timeout(30000);
    let ids = []
    for (var i = 0; i < 10000; i++) {
      let k = kuuid()
      assert.equal(-1, ids.indexOf(k))
      ids.push(k)
    }
  })


})