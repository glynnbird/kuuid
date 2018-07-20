// standard Node.js crypto library
const crypto = require('crypto')

// padStart polyfill
if (!String.prototype.padStart) {
  String.prototype.padStart = require('./lib/padStart.js')
}

// generate a timestamp since the epoch
const ts = require('./lib/ts.js')

// base62 encode a number
const base62Encode = require('./lib/base62.js')

let prefix = function(t) {
  // get time stamp for now
  const timestamp = ts(t)

  // turn timestamp into 8-digit, base-62 encoded string
  return base62Encode(timestamp).padStart(8, '0')
}

let rand = function() {
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

module.exports = {
  id: id,
  rand: rand,
  prefix: prefix
}