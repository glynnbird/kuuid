// standard Node.js crypto library
const crypto = require('crypto')

// the maximum timestamp achievable (8 digits of base 62)
const maxTS = Math.pow(62, 8) - 1

// padStart polyfill
if (!String.prototype.padStart) {
  String.prototype.padStart = require('./lib/padStart.js') // eslint-disable-line
}

// generate a timestamp since the epoch
const ts = require('./lib/ts.js')
const tsms = require('./lib/tsms.js')

// base62 encode a number
const base62Encode = require('./lib/base62.js')

// calculate an 8-digit prefix for the timestamp 't'
// that is base62 encoded and sorts in time order
const prefix = function (t) {
  // get time stamp for now
  const timestamp = ts(t)

  // turn timestamp into 8-digit, base-62 encoded string
  return base62Encode(timestamp).padStart(8, '0')
}

// calculate an 8-digit prefix for the timestamp 't'
// that is base62 encoded and sorts in time order
// but with milliseconds
const prefixms = function (t) {
  // get time stamp for now
  const timestamp = tsms(t)

  // turn timestamp into 8-digit, base-62 encoded string
  return base62Encode(timestamp).padStart(8, '0')
}

// calculate an 8-digit prefix for the timestamp 't'
// that is base62 encoded and sorts in reverse time order
const prefixReverse = function (t) {
  // get time stamp for now
  const timestamp = maxTS - ts(t)

  // turn timestamp into 8-digit, base-62 encoded string
  return base62Encode(timestamp).padStart(8, '0')
}

const rand = function (n) {
  if (!n) {
    n = 4
  }
  // we want 128-bits of random data. To do this we
  // add 4 batches of 4 random bytes encoded as 6-digit, base-62 encoded strings
  let randomStr = ''
  for (let i = 0; i < n; i++) {
    const rand = crypto.randomBytes(4).toString('hex')
    randomStr += base62Encode(parseInt(rand, 16)).padStart(6, '0')
  }
  return randomStr
}

// generate a kuuid
const id = function (t) {
  return prefix(t) + rand()
}

// generate a kuuid with ms
const idms = function (t) {
  return prefixms(t) + rand()
}

// generate a kuuid (reverse mode)
const idr = function (t) {
  return prefixReverse(t) + rand()
}

// generate short id
const ids = function (t) {
  return prefixms(t) + rand(2)
}

// generate short id
const idsr = function (t) {
  return prefixReverse(t) + rand(2)
}

module.exports = {
  id,
  idr,
  ids,
  idsr,
  idms,
  rand,
  prefix,
  prefixms,
  prefixReverse
}
