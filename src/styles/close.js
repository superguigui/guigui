var assign = require('object-assign');
var variablesThemes = require('./variables');
var computeDefaults = require('./extends');

module.exports = function(theme) {
  var defaults = computeDefaults(theme);
  var variables = variablesThemes[theme];
  const verticalHorizontal = {
    position: 'absolute',
    background: variables.highlightColor
  };
  return {
    main: assign({
      background: variables.backgroundMainColor,
      width: '30px',
      height: '30px',
      position: 'absolute',
      right: '0px',
      cursor: 'pointer',
      boxSizing: 'content-box'
    }, defaults.shadow),
    content: {
      width: '60%',
      height: '60%',
      top: '20%',
      left: '20%',
      position: 'absolute',
      transition: 'transform 0.5s cubic-bezier(0.190, 1.000, 0.220, 1.000)'
    },
    vertical: assign({
      width: '2px',
      height: '100%',
      left: '50%',
      transform: 'translateX(-50%)'
    }, verticalHorizontal),
    horizontal: assign({
      height: '2px',
      width: '100%',
      top: '50%',
      transform: 'translateY(-50%)'
    }, verticalHorizontal)
  };
};
