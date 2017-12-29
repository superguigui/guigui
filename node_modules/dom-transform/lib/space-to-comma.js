'use strict';

module.exports = function(value) {
  if (!/,/.test(value)) {
    value = value.split(' ').join(',');
  }

  return value;
};
