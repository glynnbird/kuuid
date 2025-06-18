// generate a timestamp - number of seconds since the epoch
export function ts(t) {
  const d = t ? new Date(t) : new Date()
  return Math.floor(d.getTime() / 1000)
}
