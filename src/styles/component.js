var assign = require('object-assign');
var computeDefaults = require('./extends');
var variablesThemes = require('./variables');

module.exports = function() {
  var defaults = computeDefaults();
  var variables = variablesThemes[variablesThemes.theme];
  return assign({
    width: 'calc(100% - 12px)',
    padding: '5px',
    background: variables.backgroundMainColor,
    color: variables.textMainColor,
    boxSizing: 'content-box'
  }, defaults.shadow);
};
