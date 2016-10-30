var assign = require('object-assign');
var defaults = require('./extends');
var variables = require('./variables');

module.exports = assign({
  width: 'calc(100% - 12px)',
  padding: '5px',
  background: variables.backgroundMainColor,
  color: variables.textMainColor
}, defaults.shadow);
