// standard Node.js crypto library
import * as crypto from 'node:crypto'
import { ts } from './lib/ts.js'
import { tsms } from './lib/tsms.js'
import { base62Encode } from './lib/base62.js'

// the maximum timestamp achievable (8 digits of base 62)
const maxTS = Math.pow(62, 8) - 1

// calculate an 8-digit prefix for the timestamp 't'
// that is base62 encoded and sorts in time order
export function  prefix(opts) {
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

export function rand(n) {
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
export function id(opts) {
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
export function idms(t) {
  return id({ timestamp: t, millisecond: true })
}

// generate a kuuid (reverse mode)
export function idr(t) {
  return id({ timestamp: t, reverse: true })
}

// generate a kuuid (reverse mode)
export function idmsr(t) {
  return id({ timestamp: t, reverse: true, millisecond: true })
}

// generate short id
export function ids(t) {
  return id({ timestamp: t, random: 2 })
}

// generate short id (reverse)
export function idsr(t) {
  return id({ timestamp: t, reverse: true, random: 2 })
}

// prefix milliseconds
export function prefixms(t) {
  return prefix({ timestamp: t, millisecond: true })
}

// prefix reverse
export function prefixReverse(t) {
  return prefix({ timestamp: t, reverse: true })
}

// prefix milliseconds reverse
export function prefixReverseMs(t) {
  return prefix({ timestamp: t, reverse: true, millisecond: true })
}
