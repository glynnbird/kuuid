// the epoch which we shall measure time from
const epoch = new Date('2018-01-01').getTime() / 1000

// generate a timestamp since the epoch
let ts = function () {
  const now = new Date().getTime() / 1000
  return Math.floor(now - epoch)
}

module.exports = ts