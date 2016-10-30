var variables = require('./variables');
var assign = require('object-assign');
var componentStyle = require('./component');

var verticalHorizontal = {
  background: variables.highlightColor,
  position: 'absolute'
};
module.exports = {
  main: assign({
    position: 'relative',
    margin: '3px 0'
  }, componentStyle, {
    background: variables.backgroundDarkColor
  }),
  head: {
    padding: '3px',
    cursor: 'pointer',
    userSelect: 'none'
  },
  title: {
    textAlign: 'center',
    fontSize: '0.9em',
    color: '#DFDFDF'
  },
  indicator: {
    position: 'absolute',
    right: '11px',
    height: '12px',
    width: '12px',
    top: '9px'
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
  }, verticalHorizontal),
  content: {
    marginTop: '5px',
    display: 'none'
  }
};
