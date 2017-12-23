export const isBoolean = bool => bool === true || bool === false

export const isFunction = func => typeof func === 'function'

export const isString = func => typeof func === 'string'

export const isNumber = num => typeof num === 'number' && !isNaN(num)

export const isArray = arr => Array.isArray(arr)

export const isObject = obj => obj !== null && typeof obj === 'object' && !isArray(obj)

export const isThreejsColor = obj => {
  return isObject(obj) &&
    isBoolean(obj.isColor) &&
    isFunction(obj.setHex) &&
    isFunction(obj.getHex)
}

export function isValidDomParent (element) {
  if (!element) return false
  return isObject(element) && isNumber(element.nodeType) && isString(element.nodeName)
}
