export function toFixed (number, precision) {
  var power = Math.pow(10, precision)
  return (Math.round(number * power) / power).toFixed(precision)
}

export function format (number, pattern) {
  var precision = String(pattern).split('.')[1]
  return toFixed(number, precision ? precision.length : 0)
}

export function clamp (value, min, max) {
  return Math.min(Math.max(value, min), max)
}

export function toPrecision (number, step) {
  return Math.round(number / step) * step
}
