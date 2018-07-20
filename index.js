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

// generate a kuuid
let kuuid = function (t) {


  // get time stamp for now
  const timestamp = ts(t)

  // turn timestamp into 8-digit, base-62 encoded string
  let str = base62Encode(timestamp).padStart(8, '0')

  // add 4 batches of random data as 6-digit, base-62 encoded strings
  for (var i = 0; i < 4; i++) {
    const rand = crypto.randomBytes(4).toString('hex')
    str += base62Encode(parseInt(rand, 16)).padStart(6, '0')
  }

  // truncate to 32 characters
  return str
}

module.exports = kuuid