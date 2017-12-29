function toString (val) {
  if (val === undefined || val === null) {
    return ''
  }
  return (val.toString || Object.prototype.toString).call(val)
}

function orUndefined (val) {
  if (val === undefined) { return }
  return toString(val)
}

module.exports = toString
module.exports.orUndefined = orUndefined