var variablesThemes = require('../variables');
var assign = require('object-assign');
var computeDefaults = require('../extends');

module.exports = function(theme) {
  var defaults = computeDefaults(theme);
  var variables = variablesThemes[theme];
  return {
    main: {
      height: '24px',
      cursor: 'pointer',
      userSelect: 'none'
    },
    label: assign({
      fontSize: '0.8em',
      height: '100%',
      lineHeight: '24px',
      color: variables.textMainColor,
      fontStyle: 'normal',
      textTransform: 'capitalize'
    }, defaults.label),
    span: {
      position: 'relative',
      top: '-1px',
      left: '4px',
      color: variables.highlightColor
    }
  };
};
