'use strict';

var prefix = require('prefix');
var isArray = require('is-array');
var properties = require('./lib/properties');
var applyDefaultUnit = require('./lib/default-unit');

var _has = Object.prototype.hasOwnProperty;
var transformProp = prefix('transform');
var propNameAliases = {
  x: 'translateX',
  y: 'translateY',
  z: 'translateZ',
  origin: 'transformOrigin'
};

exports = module.exports = transform;
function transform(target, opts) {
  var transformOutput = [];
  var propName;
  var propValue;
  var propData;

  replaceAliases(opts);

  for (propName in opts) {
    if (!_has.call(opts, propName)) continue;

    propValue = opts[propName];

    // If it's a transform property.
    if (_has.call(properties.transform, propName)) {
      propData = properties.transform[propName];

      if (isArray(propValue)) {
        propValue = propValue.join(propData.separator);
      }

      transformOutput.push(
        propName + '(' + applyDefaultUnit(
          propValue,
          propData.defaultUnit,
          propData.separator
        ) + ')'
      );

      continue;
    }

    // For other properties like transform-origin.
    if (_has.call(properties, propName)) {
      propData = properties[propName];

      if (isArray(propValue)) {
        propValue = propValue.join(propData.separator);
      }

      target.style[prefix(propName)] = applyDefaultUnit(
        propValue,
        propData.defaultUnit,
        propData.separator
      );

      continue;
    }

    console.warn(
      'dom-transform: this property (`' + propName + '`) is not supported.'
    );
  }

  // Apply transform property values.
  target.style[transformProp] = transformOutput.join(' ');
}

exports.get = get;
function get(target, props) {
  var s = target.style;

  if (typeof props === 'string') {
    if (_has.call(properties.transform, props)) {
      return s[transformProp];
    }

    return s[prefix(props)];
  }

  if (!props) {
    props = getPropertiesName();
  }

  var values = {};
  props.forEach(function(propName) {
    values[propName] = s[prefix(propName)];
  });

  return values;
}

exports.reset = reset;
function reset(target, props) {
  var s = target.style;

  if (typeof props === 'string') {
    s[prefix(props)] = null;
    return;
  }

  if (!props) {
    props = getPropertiesName();
  }

  props.forEach(function(propName) {
    s[prefix(propName)] = null;
  });
}

exports.isSupported = isSupported;
function isSupported() {
  return transformProp.length > 0;
}

function replaceAliases(obj) {
  var propName;
  for (propName in obj) {
    if (_has.call(propNameAliases, propName)) {
      obj[propNameAliases[propName]] = obj[propName];
      delete obj[propName];
    }
  }
}

function getPropertiesName() {
  return Object.keys(properties).map(function(propName) {
    return propName;
  });
}
