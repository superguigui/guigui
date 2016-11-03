var assign = require('object-assign');
var computeDefaults = require('./extends');
var variablesThemes = require('./variables');

module.exports = function(theme) {
  var defaults = computeDefaults(theme);
  var variables = variablesThemes[theme];
  return assign({
    width: 'calc(100% - 12px)',
    padding: '5px',
    background: variables.backgroundMainColor,
    color: variables.textMainColor,
    boxSizing: 'content-box'
  }, defaults.shadow);
};
