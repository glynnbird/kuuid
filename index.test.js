import test from 'node:test'
import assert from 'node:assert/strict'
import * as kuuid from './index.js'

const sleep = async (ms) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms)
  })
}

test('should return 32 character id', function () {
  const x = kuuid.id()
  assert.strictEqual(x.length, 32)
})

test('should return ids that sort correctly', async function (done) {
  //this.timeout(30000)
  const ids = []
  for(let i = 0; i < 20; i++) {
    ids.push(kuuid.id())
    await sleep(1100)
  }
  const j1 = JSON.stringify(ids)
  ids.sort()
  const j2 = JSON.stringify(ids)
  // make sure sorting has had no effect i.e. they were sorted already
  assert.strictEqual(j1, j2)
})

test('should return ids that sort correctly - reverse mode', async function (done) {
  //this.timeout(30000)
  const ids = []
  for(let i = 0; i < 20; i++) {
    ids.push(kuuid.idr())
    await sleep(1100)
  }
  const j1 = JSON.stringify(ids)
  ids.sort().reverse()
  const j2 = JSON.stringify(ids)
  // make sure sorting has had no effect i.e. they were sorted already
  assert.strictEqual(j1, j2)
})

test('should return unique ids', function () {
  //this.timeout(30000)
  const ids = []
  for (let i = 0; i < 10000; i++) {
    const k = kuuid.id()
    assert.strictEqual(-1, ids.indexOf(k))
    ids.push(k)
  }
})

test('should take a user-supplied timestamp', function () {
  const id = kuuid.id('2018-01-01T00:00:00.000Z')
  const prefix1 = id.substring(0, 8)
  const prefix2 = kuuid.prefix('2018-01-01T00:00:00.000Z')
  assert.strictEqual(prefix1, '001eVnWK')
  assert.strictEqual(prefix2, prefix1)
})

test('should generate prefix for the epoch', function () {
  const prefix = kuuid.prefix('1970-01-01T00:00:00.000Z')
  assert.strictEqual(prefix, '00000000')
})

test('should generate prefix for the epoch + 1 year', function () {
  const prefix = kuuid.prefix('1971-01-01T00:00:00.000Z')
  assert.strictEqual(prefix, '00028JxA')
})

test('should generate prefix for the epoch + 10 year', function () {
  const prefix = kuuid.prefix('1980-01-01T00:00:00.000Z')
  assert.strictEqual(prefix, '000LLwUi')
})

test('should generate prefix for the epoch + 50 year', function () {
  const prefix = kuuid.prefix('2020-01-01T00:00:00.000Z')
  assert.strictEqual(prefix, '001imRQe')
})

test('should generate prefix for the epoch + 200 year', function () {
  const prefix = kuuid.prefix('2170-01-01T00:00:00.000Z')
  assert.strictEqual(prefix, '006t88C8')
})

test('should generate prefix with a numerical offset', function () {
  const prefix = kuuid.prefix(1514764800000)
  assert.strictEqual(prefix, '001eVnWK')
})

test('should generate reverse prefix for the epoch', function () {
  const prefix = kuuid.prefixReverse('1970-01-01T00:00:00Z')
  assert.strictEqual(prefix, 'zzzzzzzz')
})

test('should generate reverse prefix for the epoch + 1', function () {
  const prefix = kuuid.prefixReverse('1970-01-01T00:00:01Z')
  assert.strictEqual(prefix, 'zzzzzzzy')
})

test('should generate random data', function () {
  //this.timeout(30000)
  const ids = []
  for (let i = 0; i < 10000; i++) {
    const k = kuuid.rand()
    assert.strictEqual(-1, ids.indexOf(k))
    ids.push(k)
  }
})

test('should return ids that sort correctly - short', async function (done) {
  // this.timeout(30000)
  const ids = []
  for(let i = 0; i < 20; i++) {
    ids.push(kuuid.ids())
    await sleep(1100)
  }
  const j1 = JSON.stringify(ids)
  ids.sort()
  const j2 = JSON.stringify(ids)
  // make sure sorting has had no effect i.e. they were sorted already
  assert.strictEqual(j1, j2)
})

test('should return ids that sort correctly - short reverse mode', async function (done) {
  // this.timeout(30000)
  const ids = []
  for(let i = 0; i < 20; i++) {
    ids.push(kuuid.idsr())
    await sleep(1100)
  }
  const j1 = JSON.stringify(ids)
  ids.sort().reverse()
  const j2 = JSON.stringify(ids)
  // make sure sorting has had no effect i.e. they were sorted already
  assert.strictEqual(j1, j2)
})

test('v7 should return ids that sort correctly', async function (done) {
  //this.timeout(30000)
  const ids = []
  for(let i = 0; i < 20; i++) {
    ids.push(kuuid.v7())
    await sleep(10)
  }
  const j1 = JSON.stringify(ids)
  ids.sort()
  const j2 = JSON.stringify(ids)
  // make sure sorting has had no effect i.e. they were sorted already
  assert.strictEqual(j1, j2)
})

test('v7s should return ids that sort correctly', async function (done) {
  //this.timeout(30000)
  const ids = []
  for(let i = 0; i < 20; i++) {
    ids.push(kuuid.v7s())
    await sleep(10)
  }
  const j1 = JSON.stringify(ids)
  ids.sort()
  const j2 = JSON.stringify(ids)
  // make sure sorting has had no effect i.e. they were sorted already
  assert.strictEqual(j1, j2)
})

test('v7 should generate random data', function () {
  //this.timeout(30000)
  const ids = []
  for (let i = 0; i < 10000; i++) {
    const k = kuuid.v7()
    assert.strictEqual(-1, ids.indexOf(k))
    ids.push(k)
  }
})

test('v7s should generate random data', function () {
  //this.timeout(30000)
  const ids = []
  for (let i = 0; i < 10000; i++) {
    const k = kuuid.v7s()
    assert.strictEqual(-1, ids.indexOf(k))
    ids.push(k)
  }
})

test('v7s should return 32 character id', function () {
  const x = kuuid.v7s()
  assert.strictEqual(x.length, 32)
})

test('v7 should return 36 character id', function () {
  const x = kuuid.v7()
  assert.strictEqual(x.length, 36)
})

test('v7/v7s should have a version nibble of 7', function() {
  const x = kuuid.v7()
  assert.strictEqual(x[14], '7')
  const y = kuuid.v7s()
  assert.strictEqual(y[12], '7')
})

test('v7/v7s should have 10 (binary) as the variant bits', function() {
  let x = kuuid.v7s()
  let nibble16 = parseInt(x[16], 16).toString(2)
  assert.ok(nibble16.startsWith('10'))
  x = kuuid.v7().replace(/\-/g, '')
  nibble16 = parseInt(x[16], 16).toString(2)
  assert.ok(nibble16.startsWith('10'))
})

test('v7 should return ids that sort correctly - fast', async function (done) {
  //this.timeout(30000)
  const ids = []
  for(let i = 0; i < 1000; i++) {
    ids.push(kuuid.v7())
  }
  const j1 = JSON.stringify(ids)
  ids.sort()
  const j2 = JSON.stringify(ids)
  // make sure sorting has had no effect i.e. they were sorted already
  assert.strictEqual(j1, j2)
})
