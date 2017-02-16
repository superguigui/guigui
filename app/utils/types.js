export const isBoolean = bool => bool === true || bool === false;

export const isFunction = func => typeof func === 'function';

export const isNumber = num => typeof num === 'number';

export const isArray = arr => Array.isArray(arr);

export const isObject = obj => obj !== null && typeof obj === 'object';

export const isThreejsColor = obj =>
  obj.isColor && isFunction(obj.setHex) && isFunction(obj.getHex);
