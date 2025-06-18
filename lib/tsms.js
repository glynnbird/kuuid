// generate a timestamp - number of milliseconds since the epoch
export function tsms(t) {
  const d = t ? new Date(t) : new Date()
  return Math.floor(d.getTime())
}

