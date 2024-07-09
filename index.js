// standard Node.js crypto library
const crypto = require('crypto')

// the maximum timestamp achievable (8 digits of base 62)
const maxTS = Math.pow(62, 8) - 1

// generate a timestamp since the epoch
const ts = require('./lib/ts.js')
const tsms = require('./lib/tsms.js')

// base62 encode a number
const base62Encode = require('./lib/base62.js')

// calculate an 8-digit prefix for the timestamp 't'
// that is base62 encoded and sorts in time order
const prefix = function (opts) {
  if (typeof opts === 'string' || typeof opts === 'number') {
    opts = {
      timestamp: opts,
      reverse: false,
      random: 4,
      millisecond: false
    }
  } else {
    opts = opts || {}
  }

  // get time stamp for now
  let timestamp = opts.millisecond ? tsms(opts.timestamp) : ts(opts.timestamp)
  if (opts.reverse) {
    timestamp = maxTS - timestamp
  }

  // turn timestamp into 8-digit, base-62 encoded string
  return base62Encode(timestamp).padStart(8, '0')
}

const rand = function (n) {
  if (!n || n < 1 || n > 4) {
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
const id = function (opts) {
  opts = opts || {}
  const ty = typeof opts
  if (['string', 'number'].includes(ty)) {
    return prefix(opts) + rand()
  }
  if (ty === 'object') {
    opts.timestamp = opts.timestamp ? opts.timestamp : undefined
    opts.random = opts.random ? opts.random : 4
    opts.reverse = !!opts.reverse
    opts.millisecond = !!opts.millisecond
    return prefix(opts) + rand(opts.random)
  }
  throw new Error('invalid parameters')
}

// generate a kuuid with ms
const idms = function (t) {
  return id({ timestamp: t, millisecond: true })
}

// generate a kuuid (reverse mode)
const idr = function (t) {
  return id({ timestamp: t, reverse: true })
}

// generate a kuuid (reverse mode)
const idmsr = function (t) {
  return id({ timestamp: t, reverse: true, millisecond: true })
}

// generate short id
const ids = function (t) {
  return id({ timestamp: t, random: 2 })
}

// generate short id (reverse)
const idsr = function (t) {
  return id({ timestamp: t, reverse: true, random: 2 })
}

// prefix milliseconds
const prefixms = function (t) {
  return prefix({ timestamp: t, millisecond: true })
}

// prefix reverse
const prefixReverse = function (t) {
  return prefix({ timestamp: t, reverse: true })
}

// prefix milliseconds reverse
const prefixReverseMs = function (t) {
  return prefix({ timestamp: t, reverse: true, millisecond: true })
}

module.exports = {
  id,
  idr,
  ids,
  idsr,
  idms,
  idmsr,
  rand,
  prefix,
  prefixms,
  prefixReverse,
  prefixReverseMs
}
