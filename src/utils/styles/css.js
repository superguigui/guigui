var Prefixer = require('inline-style-prefixer');
var isString = require('../is-string');
var prefixer = new Prefixer();

var css = function($element, querySelector, styles) {
  if (isString(querySelector)) {
    $element = $element.querySelector(querySelector);
  }
  else {
    styles = querySelector;
    querySelector = null;
  }

  if (!$element) return null;

  const prefixedStyles = prefixer.prefix(styles);
  for (var prop in prefixedStyles) {
    $element.style[prop] = prefixedStyles[prop];
  }

  return $element;
}

module.exports = css;
