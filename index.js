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

// base62 encode a number
const base62Encode = require('./lib/base62.js')

// calculate an 8-digit prefix for the timestamp 't'
// that is base62 encoded and sorts in time order
let prefix = function (t) {
  // get time stamp for now
  const timestamp = ts(t)

  // turn timestamp into 8-digit, base-62 encoded string
  return base62Encode(timestamp).padStart(8, '0')
}

// calculate an 8-digit prefix for the timestamp 't'
// that is base62 encoded and sorts in reverse time order
let prefixReverse = function (t) {
  // get time stamp for now
  const timestamp = maxTS - ts(t)

  // turn timestamp into 8-digit, base-62 encoded string
  return base62Encode(timestamp).padStart(8, '0')
}

let rand = function () {
  // we want 128-bits of random data. To do this we
  // add 4 batches of 4 random bytes encoded as 6-digit, base-62 encoded strings
  let randomStr = ''
  for (var i = 0; i < 4; i++) {
    const rand = crypto.randomBytes(4).toString('hex')
    randomStr += base62Encode(parseInt(rand, 16)).padStart(6, '0')
  }
  return randomStr
}

// generate a kuuid
let id = function (t) {
  return prefix(t) + rand()
}

// generate a kuuid (reverse mode)
let idr = function (t) {
  return prefixReverse(t) + rand()
}

module.exports = {
  id: id,
  idr: idr,
  rand: rand,
  prefix: prefix,
  prefixReverse: prefixReverse
}
