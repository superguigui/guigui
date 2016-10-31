var variablesThemes = require('../variables');
var assign = require('object-assign');
var computeDefaults = require('../extends');

module.exports = function() {
  var defaults = computeDefaults();
  var variables = variablesThemes[variablesThemes.theme];
  return {
    main: {
      position: 'relative',
      fontSize: '0.8em',
      height: '24px',
      clear: 'both'
    },
    label: assign({
      width: 'calc(31.5% - 20px)',
      height: '100%',
      lineHeight: '24px',
      float: 'left',
      marginRight: '10px'
    }, defaults.label),
    state: {
      width: 'calc(68.5% - 8px)',
      height: '16px',
      float: 'left',
      padding: '4px',
      boxShadow: 'inset 0px 1px 8px rgba(0, 0, 0, 0.2), inset 0px -1px 1px rgba(255, 255, 255, 0.1)'
    },
    text: assign({
      color: 'white',
      background: 'none',
      fontSize: '13px',
      fontFamily: 'Arial',
    }, defaults.input),
    scp: {
      main: assign({
        width: '175px',
        height: '150px',
        userSelect: 'none',
        position: 'absolute',
        zIndex: '999',
        top: '30px',
        right: '4px',
        display: 'none'
      }, defaults.shadow, {
        background: variables.labelBackgroundColor
      }),
      saturation: {
        position: 'relative',
        width: 'calc(100% - 25px)',
        height: '100%',
        background: 'linear-gradient(to right, #fff, #f00)',
        float: 'left',
        marginRight: '5px'
      },
      brightness: {
        width: '100%',
        height: '100%',
        background: 'linear-gradient(rgba(255,255,255,0), #000)'
      },
      sbSelector: {
        border: '2px solid #fff',
        position: 'absolute',
        width: '14px',
        height: '14px',
        borderRadius: '10px',
        top: '-7px',
        left: '-7px',
        boxSizing: 'border-box',
        zIndex: '10'
      },
      hue: {
        width: '20px',
        height: '100%',
        position: 'relative',
        float: 'left',
        background: 'linear-gradient(#f00 0%, #f0f 17%, #00f 34%, #0ff 50%, #0f0 67%, #ff0 84%, #f00 100%)'
      },
      hSelector: {
        position: 'absolute',
        background: '#fff',
        borderBottom: '1px solid #000',
        right: '-3px',
        width: '10px',
        height: '2px'
      }
    }
  };
};
