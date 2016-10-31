var variablesThemes = require('../variables');
var assign = require('object-assign');
var computeDefaults = require('../extends');

module.exports = function() {
  var defaults = computeDefaults();
  var variables = variablesThemes[variablesThemes.theme];
  return {
    main: {
      height: '24px',
      cursor: 'pointer',
      userSelect: 'none'
    },
    label: assign({
      fontSize: '0.8em',
      float: 'left',
      width: 'calc(29.5% - 10px)',
      height: '100%',
      lineHeight: '24px',
    }, defaults.label),
    state: {
      position: 'relative',
      background: variables.shadowColor,
      height: '100%',
      width: '24px',
      float: 'left',
      borderRadius: '3px',
      margin: '0 0 0 10px',
      boxShadow: '0px 2px 1px rgba(255, 255, 255, 0.05)'
    },
    handle: {
      position: 'absolute',
      background: variables.highlightColor,
      width: '50%',
      height: '50%',
      top: '25%',
      left: '25%',
      borderRadius: '3px',
      display: 'none'
    }
  };
};
