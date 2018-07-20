// generate a timestamp - number of seconds since the epoch
let ts = function (t) {
  let d = t ? new Date(t) : new Date()
  return Math.floor(d.getTime() / 1000)
}

module.exports = ts