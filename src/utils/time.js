export const zeroPad = (n) =>
  ['0', '0']
    .concat(n.toString().split(''))
    .slice(-2)
    .join('')

export const formatTime = (timeInMs) => {
  const seconds = Math.floor(timeInMs / 1000)
  const formattedSeconds = zeroPad(seconds % 60)
  const minutes = Math.floor(seconds / 60)
  const formattedMinutes = zeroPad(minutes % 60)
  const hours = Math.floor(minutes / 60)
  return [ hours, formattedMinutes, formattedSeconds ].join(':')
}

window.formatTime = formatTime
