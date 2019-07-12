// the number of characters to encode by
const charset = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')

// there are 62 characters
const base = charset.length

// base62 encode a number
const base62Encode = function (num) {
  if (num === 0) {
    return '0'
  }
  let str = ''
  while (num > 0) {
    str = charset[num % base] + str
    num = Math.floor(num / base)
  }
  return str
}

module.exports = base62Encode
