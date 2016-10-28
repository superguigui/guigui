var Prefixer = require('inline-style-prefixer');
var prefixer = new Prefixer();

var css = function($element, querySelector, styles) {
  if (typeof querySelector === 'string' || querySelector instanceof String) {
    $element = $element.querySelector(querySelector);
  }
  else {
    styles = querySelector;
    querySelector = null;
  }

  if (!$element) return;

  const prefixedStyles = prefixer.prefix(styles);
  for (var prop in prefixedStyles) {
    $element.style[prop] = prefixedStyles[prop];
  }
}

module.exports = css;
