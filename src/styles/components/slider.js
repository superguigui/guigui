var variables = require('../variables');
var assign = require('object-assign');
var defaults = require('../extends');

var backgroundHandleIndice = {
  position: 'absolute',
  pointerEvents: 'none'
};

var backgroundHandle = {
  width: '100%',
  height: '18%',
  top: '11%'
};

var indice = assign({
  color: variables.textSecondaryColor,
  fontSize: '0.7em',
  bottom: '10%',
  userSelect: 'none'
}, backgroundHandleIndice);

module.exports = {
  main: {
    height: '24px',
    fontSize: '0.8em'
  },
  label: assign({
    float: 'left',
    width: 'calc(29.5% - 10px)',
    height: '100%',
    lineHeight: '24px',
  }, defaults.label),
  container: {
    float: 'left',
    width: 'calc(50% - 20px)',
    margin: '0 10px',
    height: '100%',
    position: 'relative',
    cursor: 'ew-resize'
  },
  value: assign({
    float: 'left',
    fontFamily: 'Courier New, Arial',
    background: variables.fieldBackgroundColor,
    color: variables.textHighlightColor,
    height: '100%',
    lineHeight: '40px * 0.6',
    width: '20.5%',
    fontSize: '0.9em',
    textAlign: 'center'
  }, defaults.input),
  background: assign({
    backgroundColor: variables.primaryValidColor,
    background: 'linear-gradient(to right, ' + variables.primaryValidColor + ' 0%, ' + variables.secondaryValidColor + ' 100%)'
  }, backgroundHandleIndice, backgroundHandle),
  handle: assign({
    width: '100%',
    background: variables.fieldBackgroundColor,
    right: '0',
    transformOrigin: 'right'
  }, backgroundHandleIndice, backgroundHandle),
  min: assign({
    left: '0'
  }, indice),
  max: assign({
    right: '0'
  }, indice)
};
