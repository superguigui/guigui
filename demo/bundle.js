(function(l, i, v, e) { v = l.createElement(i); v.async = 1; v.src = '//' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; e = l.getElementsByTagName(i)[0]; e.parentNode.insertBefore(v, e)})(document, 'script');
'use strict';

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var componentEmitter = createCommonjsModule(function (module) {
/**
 * Expose `Emitter`.
 */

{
  module.exports = Emitter;
}

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) { return mixin(obj); }
}

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on =
Emitter.prototype.addEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};
  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
    .push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function(event, fn){
  function on() {
    this.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off =
Emitter.prototype.removeListener =
Emitter.prototype.removeAllListeners =
Emitter.prototype.removeEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks['$' + event];
  if (!callbacks) { return this; }

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks['$' + event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }
  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function(event){
  var this$1 = this;

  this._callbacks = this._callbacks || {};
  var args = [].slice.call(arguments, 1)
    , callbacks = this._callbacks['$' + event];

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this$1, args);
    }
  }

  return this;
};

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function(event){
  this._callbacks = this._callbacks || {};
  return this._callbacks['$' + event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function(event){
  return !! this.listeners(event).length;
};
});

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
var isBuffer_1 = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
};

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}

var toString = Object.prototype.toString;

/**
 * Get the native `typeof` a value.
 *
 * @param  {*} `val`
 * @return {*} Native javascript type
 */

var kindOf = function kindOf(val) {
  // primitivies
  if (typeof val === 'undefined') {
    return 'undefined';
  }
  if (val === null) {
    return 'null';
  }
  if (val === true || val === false || val instanceof Boolean) {
    return 'boolean';
  }
  if (typeof val === 'string' || val instanceof String) {
    return 'string';
  }
  if (typeof val === 'number' || val instanceof Number) {
    return 'number';
  }

  // functions
  if (typeof val === 'function' || val instanceof Function) {
    return 'function';
  }

  // array
  if (typeof Array.isArray !== 'undefined' && Array.isArray(val)) {
    return 'array';
  }

  // check for instances of RegExp and Date before calling `toString`
  if (val instanceof RegExp) {
    return 'regexp';
  }
  if (val instanceof Date) {
    return 'date';
  }

  // other objects
  var type = toString.call(val);

  if (type === '[object RegExp]') {
    return 'regexp';
  }
  if (type === '[object Date]') {
    return 'date';
  }
  if (type === '[object Arguments]') {
    return 'arguments';
  }
  if (type === '[object Error]') {
    return 'error';
  }

  // buffer
  if (isBuffer_1(val)) {
    return 'buffer';
  }

  // es6: Map, WeakMap, Set, WeakSet
  if (type === '[object Set]') {
    return 'set';
  }
  if (type === '[object WeakSet]') {
    return 'weakset';
  }
  if (type === '[object Map]') {
    return 'map';
  }
  if (type === '[object WeakMap]') {
    return 'weakmap';
  }
  if (type === '[object Symbol]') {
    return 'symbol';
  }

  // typed arrays
  if (type === '[object Int8Array]') {
    return 'int8array';
  }
  if (type === '[object Uint8Array]') {
    return 'uint8array';
  }
  if (type === '[object Uint8ClampedArray]') {
    return 'uint8clampedarray';
  }
  if (type === '[object Int16Array]') {
    return 'int16array';
  }
  if (type === '[object Uint16Array]') {
    return 'uint16array';
  }
  if (type === '[object Int32Array]') {
    return 'int32array';
  }
  if (type === '[object Uint32Array]') {
    return 'uint32array';
  }
  if (type === '[object Float32Array]') {
    return 'float32array';
  }
  if (type === '[object Float64Array]') {
    return 'float64array';
  }

  // must be a plain object
  return 'object';
};

var isNumber$1 = function isNumber(num) {
  var type = kindOf(num);

  if (type === 'string') {
    if (!num.trim()) { return false; }
  } else if (type !== 'number') {
    return false;
  }

  return (num - num + 1) >= 0;
};

var tinycolor = createCommonjsModule(function (module) {
// TinyColor v1.4.1
// https://github.com/bgrins/TinyColor
// Brian Grinstead, MIT License

(function(Math) {

var trimLeft = /^\s+/,
    trimRight = /\s+$/,
    tinyCounter = 0,
    mathRound = Math.round,
    mathMin = Math.min,
    mathMax = Math.max,
    mathRandom = Math.random;

function tinycolor (color, opts) {

    color = (color) ? color : '';
    opts = opts || { };

    // If input is already a tinycolor, return itself
    if (color instanceof tinycolor) {
       return color;
    }
    // If we are called as a function, call using new instead
    if (!(this instanceof tinycolor)) {
        return new tinycolor(color, opts);
    }

    var rgb = inputToRGB(color);
    this._originalInput = color, this._r = rgb.r, this._g = rgb.g, this._b = rgb.b, this._a = rgb.a, this._roundA = mathRound(100*this._a) / 100, this._format = opts.format || rgb.format;
    this._gradientType = opts.gradientType;

    // Don't let the range of [0,255] come back in [0,1].
    // Potentially lose a little bit of precision here, but will fix issues where
    // .5 gets interpreted as half of the total, instead of half of 1
    // If it was supposed to be 128, this was already taken care of by `inputToRgb`
    if (this._r < 1) { this._r = mathRound(this._r); }
    if (this._g < 1) { this._g = mathRound(this._g); }
    if (this._b < 1) { this._b = mathRound(this._b); }

    this._ok = rgb.ok;
    this._tc_id = tinyCounter++;
}

tinycolor.prototype = {
    isDark: function() {
        return this.getBrightness() < 128;
    },
    isLight: function() {
        return !this.isDark();
    },
    isValid: function() {
        return this._ok;
    },
    getOriginalInput: function() {
      return this._originalInput;
    },
    getFormat: function() {
        return this._format;
    },
    getAlpha: function() {
        return this._a;
    },
    getBrightness: function() {
        //http://www.w3.org/TR/AERT#color-contrast
        var rgb = this.toRgb();
        return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
    },
    getLuminance: function() {
        //http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
        var rgb = this.toRgb();
        var RsRGB, GsRGB, BsRGB, R, G, B;
        RsRGB = rgb.r/255;
        GsRGB = rgb.g/255;
        BsRGB = rgb.b/255;

        if (RsRGB <= 0.03928) {R = RsRGB / 12.92;} else {R = Math.pow(((RsRGB + 0.055) / 1.055), 2.4);}
        if (GsRGB <= 0.03928) {G = GsRGB / 12.92;} else {G = Math.pow(((GsRGB + 0.055) / 1.055), 2.4);}
        if (BsRGB <= 0.03928) {B = BsRGB / 12.92;} else {B = Math.pow(((BsRGB + 0.055) / 1.055), 2.4);}
        return (0.2126 * R) + (0.7152 * G) + (0.0722 * B);
    },
    setAlpha: function(value) {
        this._a = boundAlpha(value);
        this._roundA = mathRound(100*this._a) / 100;
        return this;
    },
    toHsv: function() {
        var hsv = rgbToHsv(this._r, this._g, this._b);
        return { h: hsv.h * 360, s: hsv.s, v: hsv.v, a: this._a };
    },
    toHsvString: function() {
        var hsv = rgbToHsv(this._r, this._g, this._b);
        var h = mathRound(hsv.h * 360), s = mathRound(hsv.s * 100), v = mathRound(hsv.v * 100);
        return (this._a == 1) ?
          "hsv("  + h + ", " + s + "%, " + v + "%)" :
          "hsva(" + h + ", " + s + "%, " + v + "%, "+ this._roundA + ")";
    },
    toHsl: function() {
        var hsl = rgbToHsl(this._r, this._g, this._b);
        return { h: hsl.h * 360, s: hsl.s, l: hsl.l, a: this._a };
    },
    toHslString: function() {
        var hsl = rgbToHsl(this._r, this._g, this._b);
        var h = mathRound(hsl.h * 360), s = mathRound(hsl.s * 100), l = mathRound(hsl.l * 100);
        return (this._a == 1) ?
          "hsl("  + h + ", " + s + "%, " + l + "%)" :
          "hsla(" + h + ", " + s + "%, " + l + "%, "+ this._roundA + ")";
    },
    toHex: function(allow3Char) {
        return rgbToHex(this._r, this._g, this._b, allow3Char);
    },
    toHexString: function(allow3Char) {
        return '#' + this.toHex(allow3Char);
    },
    toHex8: function(allow4Char) {
        return rgbaToHex(this._r, this._g, this._b, this._a, allow4Char);
    },
    toHex8String: function(allow4Char) {
        return '#' + this.toHex8(allow4Char);
    },
    toRgb: function() {
        return { r: mathRound(this._r), g: mathRound(this._g), b: mathRound(this._b), a: this._a };
    },
    toRgbString: function() {
        return (this._a == 1) ?
          "rgb("  + mathRound(this._r) + ", " + mathRound(this._g) + ", " + mathRound(this._b) + ")" :
          "rgba(" + mathRound(this._r) + ", " + mathRound(this._g) + ", " + mathRound(this._b) + ", " + this._roundA + ")";
    },
    toPercentageRgb: function() {
        return { r: mathRound(bound01(this._r, 255) * 100) + "%", g: mathRound(bound01(this._g, 255) * 100) + "%", b: mathRound(bound01(this._b, 255) * 100) + "%", a: this._a };
    },
    toPercentageRgbString: function() {
        return (this._a == 1) ?
          "rgb("  + mathRound(bound01(this._r, 255) * 100) + "%, " + mathRound(bound01(this._g, 255) * 100) + "%, " + mathRound(bound01(this._b, 255) * 100) + "%)" :
          "rgba(" + mathRound(bound01(this._r, 255) * 100) + "%, " + mathRound(bound01(this._g, 255) * 100) + "%, " + mathRound(bound01(this._b, 255) * 100) + "%, " + this._roundA + ")";
    },
    toName: function() {
        if (this._a === 0) {
            return "transparent";
        }

        if (this._a < 1) {
            return false;
        }

        return hexNames[rgbToHex(this._r, this._g, this._b, true)] || false;
    },
    toFilter: function(secondColor) {
        var hex8String = '#' + rgbaToArgbHex(this._r, this._g, this._b, this._a);
        var secondHex8String = hex8String;
        var gradientType = this._gradientType ? "GradientType = 1, " : "";

        if (secondColor) {
            var s = tinycolor(secondColor);
            secondHex8String = '#' + rgbaToArgbHex(s._r, s._g, s._b, s._a);
        }

        return "progid:DXImageTransform.Microsoft.gradient("+gradientType+"startColorstr="+hex8String+",endColorstr="+secondHex8String+")";
    },
    toString: function(format) {
        var formatSet = !!format;
        format = format || this._format;

        var formattedString = false;
        var hasAlpha = this._a < 1 && this._a >= 0;
        var needsAlphaFormat = !formatSet && hasAlpha && (format === "hex" || format === "hex6" || format === "hex3" || format === "hex4" || format === "hex8" || format === "name");

        if (needsAlphaFormat) {
            // Special case for "transparent", all other non-alpha formats
            // will return rgba when there is transparency.
            if (format === "name" && this._a === 0) {
                return this.toName();
            }
            return this.toRgbString();
        }
        if (format === "rgb") {
            formattedString = this.toRgbString();
        }
        if (format === "prgb") {
            formattedString = this.toPercentageRgbString();
        }
        if (format === "hex" || format === "hex6") {
            formattedString = this.toHexString();
        }
        if (format === "hex3") {
            formattedString = this.toHexString(true);
        }
        if (format === "hex4") {
            formattedString = this.toHex8String(true);
        }
        if (format === "hex8") {
            formattedString = this.toHex8String();
        }
        if (format === "name") {
            formattedString = this.toName();
        }
        if (format === "hsl") {
            formattedString = this.toHslString();
        }
        if (format === "hsv") {
            formattedString = this.toHsvString();
        }

        return formattedString || this.toHexString();
    },
    clone: function() {
        return tinycolor(this.toString());
    },

    _applyModification: function(fn, args) {
        var color = fn.apply(null, [this].concat([].slice.call(args)));
        this._r = color._r;
        this._g = color._g;
        this._b = color._b;
        this.setAlpha(color._a);
        return this;
    },
    lighten: function() {
        return this._applyModification(lighten, arguments);
    },
    brighten: function() {
        return this._applyModification(brighten, arguments);
    },
    darken: function() {
        return this._applyModification(darken, arguments);
    },
    desaturate: function() {
        return this._applyModification(desaturate, arguments);
    },
    saturate: function() {
        return this._applyModification(saturate, arguments);
    },
    greyscale: function() {
        return this._applyModification(greyscale, arguments);
    },
    spin: function() {
        return this._applyModification(spin, arguments);
    },

    _applyCombination: function(fn, args) {
        return fn.apply(null, [this].concat([].slice.call(args)));
    },
    analogous: function() {
        return this._applyCombination(analogous, arguments);
    },
    complement: function() {
        return this._applyCombination(complement, arguments);
    },
    monochromatic: function() {
        return this._applyCombination(monochromatic, arguments);
    },
    splitcomplement: function() {
        return this._applyCombination(splitcomplement, arguments);
    },
    triad: function() {
        return this._applyCombination(triad, arguments);
    },
    tetrad: function() {
        return this._applyCombination(tetrad, arguments);
    }
};

// If input is an object, force 1 into "1.0" to handle ratios properly
// String input requires "1.0" as input, so 1 will be treated as 1
tinycolor.fromRatio = function(color, opts) {
    if (typeof color == "object") {
        var newColor = {};
        for (var i in color) {
            if (color.hasOwnProperty(i)) {
                if (i === "a") {
                    newColor[i] = color[i];
                }
                else {
                    newColor[i] = convertToPercentage(color[i]);
                }
            }
        }
        color = newColor;
    }

    return tinycolor(color, opts);
};

// Given a string or object, convert that input to RGB
// Possible string inputs:
//
//     "red"
//     "#f00" or "f00"
//     "#ff0000" or "ff0000"
//     "#ff000000" or "ff000000"
//     "rgb 255 0 0" or "rgb (255, 0, 0)"
//     "rgb 1.0 0 0" or "rgb (1, 0, 0)"
//     "rgba (255, 0, 0, 1)" or "rgba 255, 0, 0, 1"
//     "rgba (1.0, 0, 0, 1)" or "rgba 1.0, 0, 0, 1"
//     "hsl(0, 100%, 50%)" or "hsl 0 100% 50%"
//     "hsla(0, 100%, 50%, 1)" or "hsla 0 100% 50%, 1"
//     "hsv(0, 100%, 100%)" or "hsv 0 100% 100%"
//
function inputToRGB(color) {

    var rgb = { r: 0, g: 0, b: 0 };
    var a = 1;
    var s = null;
    var v = null;
    var l = null;
    var ok = false;
    var format = false;

    if (typeof color == "string") {
        color = stringInputToObject(color);
    }

    if (typeof color == "object") {
        if (isValidCSSUnit(color.r) && isValidCSSUnit(color.g) && isValidCSSUnit(color.b)) {
            rgb = rgbToRgb(color.r, color.g, color.b);
            ok = true;
            format = String(color.r).substr(-1) === "%" ? "prgb" : "rgb";
        }
        else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.v)) {
            s = convertToPercentage(color.s);
            v = convertToPercentage(color.v);
            rgb = hsvToRgb(color.h, s, v);
            ok = true;
            format = "hsv";
        }
        else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.l)) {
            s = convertToPercentage(color.s);
            l = convertToPercentage(color.l);
            rgb = hslToRgb(color.h, s, l);
            ok = true;
            format = "hsl";
        }

        if (color.hasOwnProperty("a")) {
            a = color.a;
        }
    }

    a = boundAlpha(a);

    return {
        ok: ok,
        format: color.format || format,
        r: mathMin(255, mathMax(rgb.r, 0)),
        g: mathMin(255, mathMax(rgb.g, 0)),
        b: mathMin(255, mathMax(rgb.b, 0)),
        a: a
    };
}


// Conversion Functions
// --------------------

// `rgbToHsl`, `rgbToHsv`, `hslToRgb`, `hsvToRgb` modified from:
// <http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript>

// `rgbToRgb`
// Handle bounds / percentage checking to conform to CSS color spec
// <http://www.w3.org/TR/css3-color/>
// *Assumes:* r, g, b in [0, 255] or [0, 1]
// *Returns:* { r, g, b } in [0, 255]
function rgbToRgb(r, g, b){
    return {
        r: bound01(r, 255) * 255,
        g: bound01(g, 255) * 255,
        b: bound01(b, 255) * 255
    };
}

// `rgbToHsl`
// Converts an RGB color value to HSL.
// *Assumes:* r, g, and b are contained in [0, 255] or [0, 1]
// *Returns:* { h, s, l } in [0,1]
function rgbToHsl(r, g, b) {

    r = bound01(r, 255);
    g = bound01(g, 255);
    b = bound01(b, 255);

    var max = mathMax(r, g, b), min = mathMin(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min) {
        h = s = 0; // achromatic
    }
    else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }

        h /= 6;
    }

    return { h: h, s: s, l: l };
}

// `hslToRgb`
// Converts an HSL color value to RGB.
// *Assumes:* h is contained in [0, 1] or [0, 360] and s and l are contained [0, 1] or [0, 100]
// *Returns:* { r, g, b } in the set [0, 255]
function hslToRgb(h, s, l) {
    var r, g, b;

    h = bound01(h, 360);
    s = bound01(s, 100);
    l = bound01(l, 100);

    function hue2rgb(p, q, t) {
        if(t < 0) { t += 1; }
        if(t > 1) { t -= 1; }
        if(t < 1/6) { return p + (q - p) * 6 * t; }
        if(t < 1/2) { return q; }
        if(t < 2/3) { return p + (q - p) * (2/3 - t) * 6; }
        return p;
    }

    if(s === 0) {
        r = g = b = l; // achromatic
    }
    else {
        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return { r: r * 255, g: g * 255, b: b * 255 };
}

// `rgbToHsv`
// Converts an RGB color value to HSV
// *Assumes:* r, g, and b are contained in the set [0, 255] or [0, 1]
// *Returns:* { h, s, v } in [0,1]
function rgbToHsv(r, g, b) {

    r = bound01(r, 255);
    g = bound01(g, 255);
    b = bound01(b, 255);

    var max = mathMax(r, g, b), min = mathMin(r, g, b);
    var h, s, v = max;

    var d = max - min;
    s = max === 0 ? 0 : d / max;

    if(max == min) {
        h = 0; // achromatic
    }
    else {
        switch(max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return { h: h, s: s, v: v };
}

// `hsvToRgb`
// Converts an HSV color value to RGB.
// *Assumes:* h is contained in [0, 1] or [0, 360] and s and v are contained in [0, 1] or [0, 100]
// *Returns:* { r, g, b } in the set [0, 255]
 function hsvToRgb(h, s, v) {

    h = bound01(h, 360) * 6;
    s = bound01(s, 100);
    v = bound01(v, 100);

    var i = Math.floor(h),
        f = h - i,
        p = v * (1 - s),
        q = v * (1 - f * s),
        t = v * (1 - (1 - f) * s),
        mod = i % 6,
        r = [v, q, p, p, t, v][mod],
        g = [t, v, v, q, p, p][mod],
        b = [p, p, t, v, v, q][mod];

    return { r: r * 255, g: g * 255, b: b * 255 };
}

// `rgbToHex`
// Converts an RGB color to hex
// Assumes r, g, and b are contained in the set [0, 255]
// Returns a 3 or 6 character hex
function rgbToHex(r, g, b, allow3Char) {

    var hex = [
        pad2(mathRound(r).toString(16)),
        pad2(mathRound(g).toString(16)),
        pad2(mathRound(b).toString(16))
    ];

    // Return a 3 character hex if possible
    if (allow3Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1)) {
        return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0);
    }

    return hex.join("");
}

// `rgbaToHex`
// Converts an RGBA color plus alpha transparency to hex
// Assumes r, g, b are contained in the set [0, 255] and
// a in [0, 1]. Returns a 4 or 8 character rgba hex
function rgbaToHex(r, g, b, a, allow4Char) {

    var hex = [
        pad2(mathRound(r).toString(16)),
        pad2(mathRound(g).toString(16)),
        pad2(mathRound(b).toString(16)),
        pad2(convertDecimalToHex(a))
    ];

    // Return a 4 character hex if possible
    if (allow4Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1) && hex[3].charAt(0) == hex[3].charAt(1)) {
        return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0) + hex[3].charAt(0);
    }

    return hex.join("");
}

// `rgbaToArgbHex`
// Converts an RGBA color to an ARGB Hex8 string
// Rarely used, but required for "toFilter()"
function rgbaToArgbHex(r, g, b, a) {

    var hex = [
        pad2(convertDecimalToHex(a)),
        pad2(mathRound(r).toString(16)),
        pad2(mathRound(g).toString(16)),
        pad2(mathRound(b).toString(16))
    ];

    return hex.join("");
}

// `equals`
// Can be called with any tinycolor input
tinycolor.equals = function (color1, color2) {
    if (!color1 || !color2) { return false; }
    return tinycolor(color1).toRgbString() == tinycolor(color2).toRgbString();
};

tinycolor.random = function() {
    return tinycolor.fromRatio({
        r: mathRandom(),
        g: mathRandom(),
        b: mathRandom()
    });
};


// Modification Functions
// ----------------------
// Thanks to less.js for some of the basics here
// <https://github.com/cloudhead/less.js/blob/master/lib/less/functions.js>

function desaturate(color, amount) {
    amount = (amount === 0) ? 0 : (amount || 10);
    var hsl = tinycolor(color).toHsl();
    hsl.s -= amount / 100;
    hsl.s = clamp01(hsl.s);
    return tinycolor(hsl);
}

function saturate(color, amount) {
    amount = (amount === 0) ? 0 : (amount || 10);
    var hsl = tinycolor(color).toHsl();
    hsl.s += amount / 100;
    hsl.s = clamp01(hsl.s);
    return tinycolor(hsl);
}

function greyscale(color) {
    return tinycolor(color).desaturate(100);
}

function lighten (color, amount) {
    amount = (amount === 0) ? 0 : (amount || 10);
    var hsl = tinycolor(color).toHsl();
    hsl.l += amount / 100;
    hsl.l = clamp01(hsl.l);
    return tinycolor(hsl);
}

function brighten(color, amount) {
    amount = (amount === 0) ? 0 : (amount || 10);
    var rgb = tinycolor(color).toRgb();
    rgb.r = mathMax(0, mathMin(255, rgb.r - mathRound(255 * - (amount / 100))));
    rgb.g = mathMax(0, mathMin(255, rgb.g - mathRound(255 * - (amount / 100))));
    rgb.b = mathMax(0, mathMin(255, rgb.b - mathRound(255 * - (amount / 100))));
    return tinycolor(rgb);
}

function darken (color, amount) {
    amount = (amount === 0) ? 0 : (amount || 10);
    var hsl = tinycolor(color).toHsl();
    hsl.l -= amount / 100;
    hsl.l = clamp01(hsl.l);
    return tinycolor(hsl);
}

// Spin takes a positive or negative amount within [-360, 360] indicating the change of hue.
// Values outside of this range will be wrapped into this range.
function spin(color, amount) {
    var hsl = tinycolor(color).toHsl();
    var hue = (hsl.h + amount) % 360;
    hsl.h = hue < 0 ? 360 + hue : hue;
    return tinycolor(hsl);
}

// Combination Functions
// ---------------------
// Thanks to jQuery xColor for some of the ideas behind these
// <https://github.com/infusion/jQuery-xcolor/blob/master/jquery.xcolor.js>

function complement(color) {
    var hsl = tinycolor(color).toHsl();
    hsl.h = (hsl.h + 180) % 360;
    return tinycolor(hsl);
}

function triad(color) {
    var hsl = tinycolor(color).toHsl();
    var h = hsl.h;
    return [
        tinycolor(color),
        tinycolor({ h: (h + 120) % 360, s: hsl.s, l: hsl.l }),
        tinycolor({ h: (h + 240) % 360, s: hsl.s, l: hsl.l })
    ];
}

function tetrad(color) {
    var hsl = tinycolor(color).toHsl();
    var h = hsl.h;
    return [
        tinycolor(color),
        tinycolor({ h: (h + 90) % 360, s: hsl.s, l: hsl.l }),
        tinycolor({ h: (h + 180) % 360, s: hsl.s, l: hsl.l }),
        tinycolor({ h: (h + 270) % 360, s: hsl.s, l: hsl.l })
    ];
}

function splitcomplement(color) {
    var hsl = tinycolor(color).toHsl();
    var h = hsl.h;
    return [
        tinycolor(color),
        tinycolor({ h: (h + 72) % 360, s: hsl.s, l: hsl.l}),
        tinycolor({ h: (h + 216) % 360, s: hsl.s, l: hsl.l})
    ];
}

function analogous(color, results, slices) {
    results = results || 6;
    slices = slices || 30;

    var hsl = tinycolor(color).toHsl();
    var part = 360 / slices;
    var ret = [tinycolor(color)];

    for (hsl.h = ((hsl.h - (part * results >> 1)) + 720) % 360; --results; ) {
        hsl.h = (hsl.h + part) % 360;
        ret.push(tinycolor(hsl));
    }
    return ret;
}

function monochromatic(color, results) {
    results = results || 6;
    var hsv = tinycolor(color).toHsv();
    var h = hsv.h, s = hsv.s, v = hsv.v;
    var ret = [];
    var modification = 1 / results;

    while (results--) {
        ret.push(tinycolor({ h: h, s: s, v: v}));
        v = (v + modification) % 1;
    }

    return ret;
}

// Utility Functions
// ---------------------

tinycolor.mix = function(color1, color2, amount) {
    amount = (amount === 0) ? 0 : (amount || 50);

    var rgb1 = tinycolor(color1).toRgb();
    var rgb2 = tinycolor(color2).toRgb();

    var p = amount / 100;

    var rgba = {
        r: ((rgb2.r - rgb1.r) * p) + rgb1.r,
        g: ((rgb2.g - rgb1.g) * p) + rgb1.g,
        b: ((rgb2.b - rgb1.b) * p) + rgb1.b,
        a: ((rgb2.a - rgb1.a) * p) + rgb1.a
    };

    return tinycolor(rgba);
};


// Readability Functions
// ---------------------
// <http://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef (WCAG Version 2)

// `contrast`
// Analyze the 2 colors and returns the color contrast defined by (WCAG Version 2)
tinycolor.readability = function(color1, color2) {
    var c1 = tinycolor(color1);
    var c2 = tinycolor(color2);
    return (Math.max(c1.getLuminance(),c2.getLuminance())+0.05) / (Math.min(c1.getLuminance(),c2.getLuminance())+0.05);
};

// `isReadable`
// Ensure that foreground and background color combinations meet WCAG2 guidelines.
// The third argument is an optional Object.
//      the 'level' property states 'AA' or 'AAA' - if missing or invalid, it defaults to 'AA';
//      the 'size' property states 'large' or 'small' - if missing or invalid, it defaults to 'small'.
// If the entire object is absent, isReadable defaults to {level:"AA",size:"small"}.

// *Example*
//    tinycolor.isReadable("#000", "#111") => false
//    tinycolor.isReadable("#000", "#111",{level:"AA",size:"large"}) => false
tinycolor.isReadable = function(color1, color2, wcag2) {
    var readability = tinycolor.readability(color1, color2);
    var wcag2Parms, out;

    out = false;

    wcag2Parms = validateWCAG2Parms(wcag2);
    switch (wcag2Parms.level + wcag2Parms.size) {
        case "AAsmall":
        case "AAAlarge":
            out = readability >= 4.5;
            break;
        case "AAlarge":
            out = readability >= 3;
            break;
        case "AAAsmall":
            out = readability >= 7;
            break;
    }
    return out;

};

// `mostReadable`
// Given a base color and a list of possible foreground or background
// colors for that base, returns the most readable color.
// Optionally returns Black or White if the most readable color is unreadable.
// *Example*
//    tinycolor.mostReadable(tinycolor.mostReadable("#123", ["#124", "#125"],{includeFallbackColors:false}).toHexString(); // "#112255"
//    tinycolor.mostReadable(tinycolor.mostReadable("#123", ["#124", "#125"],{includeFallbackColors:true}).toHexString();  // "#ffffff"
//    tinycolor.mostReadable("#a8015a", ["#faf3f3"],{includeFallbackColors:true,level:"AAA",size:"large"}).toHexString(); // "#faf3f3"
//    tinycolor.mostReadable("#a8015a", ["#faf3f3"],{includeFallbackColors:true,level:"AAA",size:"small"}).toHexString(); // "#ffffff"
tinycolor.mostReadable = function(baseColor, colorList, args) {
    var bestColor = null;
    var bestScore = 0;
    var readability;
    var includeFallbackColors, level, size;
    args = args || {};
    includeFallbackColors = args.includeFallbackColors ;
    level = args.level;
    size = args.size;

    for (var i= 0; i < colorList.length ; i++) {
        readability = tinycolor.readability(baseColor, colorList[i]);
        if (readability > bestScore) {
            bestScore = readability;
            bestColor = tinycolor(colorList[i]);
        }
    }

    if (tinycolor.isReadable(baseColor, bestColor, {"level":level,"size":size}) || !includeFallbackColors) {
        return bestColor;
    }
    else {
        args.includeFallbackColors=false;
        return tinycolor.mostReadable(baseColor,["#fff", "#000"],args);
    }
};


// Big List of Colors
// ------------------
// <http://www.w3.org/TR/css3-color/#svg-color>
var names = tinycolor.names = {
    aliceblue: "f0f8ff",
    antiquewhite: "faebd7",
    aqua: "0ff",
    aquamarine: "7fffd4",
    azure: "f0ffff",
    beige: "f5f5dc",
    bisque: "ffe4c4",
    black: "000",
    blanchedalmond: "ffebcd",
    blue: "00f",
    blueviolet: "8a2be2",
    brown: "a52a2a",
    burlywood: "deb887",
    burntsienna: "ea7e5d",
    cadetblue: "5f9ea0",
    chartreuse: "7fff00",
    chocolate: "d2691e",
    coral: "ff7f50",
    cornflowerblue: "6495ed",
    cornsilk: "fff8dc",
    crimson: "dc143c",
    cyan: "0ff",
    darkblue: "00008b",
    darkcyan: "008b8b",
    darkgoldenrod: "b8860b",
    darkgray: "a9a9a9",
    darkgreen: "006400",
    darkgrey: "a9a9a9",
    darkkhaki: "bdb76b",
    darkmagenta: "8b008b",
    darkolivegreen: "556b2f",
    darkorange: "ff8c00",
    darkorchid: "9932cc",
    darkred: "8b0000",
    darksalmon: "e9967a",
    darkseagreen: "8fbc8f",
    darkslateblue: "483d8b",
    darkslategray: "2f4f4f",
    darkslategrey: "2f4f4f",
    darkturquoise: "00ced1",
    darkviolet: "9400d3",
    deeppink: "ff1493",
    deepskyblue: "00bfff",
    dimgray: "696969",
    dimgrey: "696969",
    dodgerblue: "1e90ff",
    firebrick: "b22222",
    floralwhite: "fffaf0",
    forestgreen: "228b22",
    fuchsia: "f0f",
    gainsboro: "dcdcdc",
    ghostwhite: "f8f8ff",
    gold: "ffd700",
    goldenrod: "daa520",
    gray: "808080",
    green: "008000",
    greenyellow: "adff2f",
    grey: "808080",
    honeydew: "f0fff0",
    hotpink: "ff69b4",
    indianred: "cd5c5c",
    indigo: "4b0082",
    ivory: "fffff0",
    khaki: "f0e68c",
    lavender: "e6e6fa",
    lavenderblush: "fff0f5",
    lawngreen: "7cfc00",
    lemonchiffon: "fffacd",
    lightblue: "add8e6",
    lightcoral: "f08080",
    lightcyan: "e0ffff",
    lightgoldenrodyellow: "fafad2",
    lightgray: "d3d3d3",
    lightgreen: "90ee90",
    lightgrey: "d3d3d3",
    lightpink: "ffb6c1",
    lightsalmon: "ffa07a",
    lightseagreen: "20b2aa",
    lightskyblue: "87cefa",
    lightslategray: "789",
    lightslategrey: "789",
    lightsteelblue: "b0c4de",
    lightyellow: "ffffe0",
    lime: "0f0",
    limegreen: "32cd32",
    linen: "faf0e6",
    magenta: "f0f",
    maroon: "800000",
    mediumaquamarine: "66cdaa",
    mediumblue: "0000cd",
    mediumorchid: "ba55d3",
    mediumpurple: "9370db",
    mediumseagreen: "3cb371",
    mediumslateblue: "7b68ee",
    mediumspringgreen: "00fa9a",
    mediumturquoise: "48d1cc",
    mediumvioletred: "c71585",
    midnightblue: "191970",
    mintcream: "f5fffa",
    mistyrose: "ffe4e1",
    moccasin: "ffe4b5",
    navajowhite: "ffdead",
    navy: "000080",
    oldlace: "fdf5e6",
    olive: "808000",
    olivedrab: "6b8e23",
    orange: "ffa500",
    orangered: "ff4500",
    orchid: "da70d6",
    palegoldenrod: "eee8aa",
    palegreen: "98fb98",
    paleturquoise: "afeeee",
    palevioletred: "db7093",
    papayawhip: "ffefd5",
    peachpuff: "ffdab9",
    peru: "cd853f",
    pink: "ffc0cb",
    plum: "dda0dd",
    powderblue: "b0e0e6",
    purple: "800080",
    rebeccapurple: "663399",
    red: "f00",
    rosybrown: "bc8f8f",
    royalblue: "4169e1",
    saddlebrown: "8b4513",
    salmon: "fa8072",
    sandybrown: "f4a460",
    seagreen: "2e8b57",
    seashell: "fff5ee",
    sienna: "a0522d",
    silver: "c0c0c0",
    skyblue: "87ceeb",
    slateblue: "6a5acd",
    slategray: "708090",
    slategrey: "708090",
    snow: "fffafa",
    springgreen: "00ff7f",
    steelblue: "4682b4",
    tan: "d2b48c",
    teal: "008080",
    thistle: "d8bfd8",
    tomato: "ff6347",
    turquoise: "40e0d0",
    violet: "ee82ee",
    wheat: "f5deb3",
    white: "fff",
    whitesmoke: "f5f5f5",
    yellow: "ff0",
    yellowgreen: "9acd32"
};

// Make it easy to access colors via `hexNames[hex]`
var hexNames = tinycolor.hexNames = flip(names);


// Utilities
// ---------

// `{ 'name1': 'val1' }` becomes `{ 'val1': 'name1' }`
function flip(o) {
    var flipped = { };
    for (var i in o) {
        if (o.hasOwnProperty(i)) {
            flipped[o[i]] = i;
        }
    }
    return flipped;
}

// Return a valid alpha value [0,1] with all invalid values being set to 1
function boundAlpha(a) {
    a = parseFloat(a);

    if (isNaN(a) || a < 0 || a > 1) {
        a = 1;
    }

    return a;
}

// Take input from [0, n] and return it as [0, 1]
function bound01(n, max) {
    if (isOnePointZero(n)) { n = "100%"; }

    var processPercent = isPercentage(n);
    n = mathMin(max, mathMax(0, parseFloat(n)));

    // Automatically convert percentage into number
    if (processPercent) {
        n = parseInt(n * max, 10) / 100;
    }

    // Handle floating point rounding errors
    if ((Math.abs(n - max) < 0.000001)) {
        return 1;
    }

    // Convert into [0, 1] range if it isn't already
    return (n % max) / parseFloat(max);
}

// Force a number between 0 and 1
function clamp01(val) {
    return mathMin(1, mathMax(0, val));
}

// Parse a base-16 hex value into a base-10 integer
function parseIntFromHex(val) {
    return parseInt(val, 16);
}

// Need to handle 1.0 as 100%, since once it is a number, there is no difference between it and 1
// <http://stackoverflow.com/questions/7422072/javascript-how-to-detect-number-as-a-decimal-including-1-0>
function isOnePointZero(n) {
    return typeof n == "string" && n.indexOf('.') != -1 && parseFloat(n) === 1;
}

// Check to see if string passed in is a percentage
function isPercentage(n) {
    return typeof n === "string" && n.indexOf('%') != -1;
}

// Force a hex value to have 2 characters
function pad2(c) {
    return c.length == 1 ? '0' + c : '' + c;
}

// Replace a decimal with it's percentage value
function convertToPercentage(n) {
    if (n <= 1) {
        n = (n * 100) + "%";
    }

    return n;
}

// Converts a decimal to a hex value
function convertDecimalToHex(d) {
    return Math.round(parseFloat(d) * 255).toString(16);
}
// Converts a hex value to a decimal
function convertHexToDecimal(h) {
    return (parseIntFromHex(h) / 255);
}

var matchers = (function() {

    // <http://www.w3.org/TR/css3-values/#integers>
    var CSS_INTEGER = "[-\\+]?\\d+%?";

    // <http://www.w3.org/TR/css3-values/#number-value>
    var CSS_NUMBER = "[-\\+]?\\d*\\.\\d+%?";

    // Allow positive/negative integer/number.  Don't capture the either/or, just the entire outcome.
    var CSS_UNIT = "(?:" + CSS_NUMBER + ")|(?:" + CSS_INTEGER + ")";

    // Actual matching.
    // Parentheses and commas are optional, but not required.
    // Whitespace can take the place of commas or opening paren
    var PERMISSIVE_MATCH3 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
    var PERMISSIVE_MATCH4 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";

    return {
        CSS_UNIT: new RegExp(CSS_UNIT),
        rgb: new RegExp("rgb" + PERMISSIVE_MATCH3),
        rgba: new RegExp("rgba" + PERMISSIVE_MATCH4),
        hsl: new RegExp("hsl" + PERMISSIVE_MATCH3),
        hsla: new RegExp("hsla" + PERMISSIVE_MATCH4),
        hsv: new RegExp("hsv" + PERMISSIVE_MATCH3),
        hsva: new RegExp("hsva" + PERMISSIVE_MATCH4),
        hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
        hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
        hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
        hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
    };
})();

// `isValidCSSUnit`
// Take in a single string / number and check to see if it looks like a CSS unit
// (see `matchers` above for definition).
function isValidCSSUnit(color) {
    return !!matchers.CSS_UNIT.exec(color);
}

// `stringInputToObject`
// Permissive string parsing.  Take in a number of formats, and output an object
// based on detected format.  Returns `{ r, g, b }` or `{ h, s, l }` or `{ h, s, v}`
function stringInputToObject(color) {

    color = color.replace(trimLeft,'').replace(trimRight, '').toLowerCase();
    var named = false;
    if (names[color]) {
        color = names[color];
        named = true;
    }
    else if (color == 'transparent') {
        return { r: 0, g: 0, b: 0, a: 0, format: "name" };
    }

    // Try to match string input using regular expressions.
    // Keep most of the number bounding out of this function - don't worry about [0,1] or [0,100] or [0,360]
    // Just return an object and let the conversion functions handle that.
    // This way the result will be the same whether the tinycolor is initialized with string or object.
    var match;
    if ((match = matchers.rgb.exec(color))) {
        return { r: match[1], g: match[2], b: match[3] };
    }
    if ((match = matchers.rgba.exec(color))) {
        return { r: match[1], g: match[2], b: match[3], a: match[4] };
    }
    if ((match = matchers.hsl.exec(color))) {
        return { h: match[1], s: match[2], l: match[3] };
    }
    if ((match = matchers.hsla.exec(color))) {
        return { h: match[1], s: match[2], l: match[3], a: match[4] };
    }
    if ((match = matchers.hsv.exec(color))) {
        return { h: match[1], s: match[2], v: match[3] };
    }
    if ((match = matchers.hsva.exec(color))) {
        return { h: match[1], s: match[2], v: match[3], a: match[4] };
    }
    if ((match = matchers.hex8.exec(color))) {
        return {
            r: parseIntFromHex(match[1]),
            g: parseIntFromHex(match[2]),
            b: parseIntFromHex(match[3]),
            a: convertHexToDecimal(match[4]),
            format: named ? "name" : "hex8"
        };
    }
    if ((match = matchers.hex6.exec(color))) {
        return {
            r: parseIntFromHex(match[1]),
            g: parseIntFromHex(match[2]),
            b: parseIntFromHex(match[3]),
            format: named ? "name" : "hex"
        };
    }
    if ((match = matchers.hex4.exec(color))) {
        return {
            r: parseIntFromHex(match[1] + '' + match[1]),
            g: parseIntFromHex(match[2] + '' + match[2]),
            b: parseIntFromHex(match[3] + '' + match[3]),
            a: convertHexToDecimal(match[4] + '' + match[4]),
            format: named ? "name" : "hex8"
        };
    }
    if ((match = matchers.hex3.exec(color))) {
        return {
            r: parseIntFromHex(match[1] + '' + match[1]),
            g: parseIntFromHex(match[2] + '' + match[2]),
            b: parseIntFromHex(match[3] + '' + match[3]),
            format: named ? "name" : "hex"
        };
    }

    return false;
}

function validateWCAG2Parms(parms) {
    // return valid WCAG2 parms for isReadable.
    // If input parms are invalid, return {"level":"AA", "size":"small"}
    var level, size;
    parms = parms || {"level":"AA", "size":"small"};
    level = (parms.level || "AA").toUpperCase();
    size = (parms.size || "small").toLowerCase();
    if (level !== "AA" && level !== "AAA") {
        level = "AA";
    }
    if (size !== "small" && size !== "large") {
        size = "small";
    }
    return {"level":level, "size":size};
}

// Node: Export function
if ('object' !== "undefined" && module.exports) {
    module.exports = tinycolor;
}
// AMD/requirejs: Define the module
else if (typeof undefined === 'function' && undefined.amd) {
    undefined(function () {return tinycolor;});
}
// Browser: Expose to window
else {
    window.tinycolor = tinycolor;
}

})(Math);
});

// check document first so it doesn't error in node.js
var style = typeof document != 'undefined'
  ? document.createElement('p').style
  : {};

var prefixes = ['O', 'ms', 'Moz', 'Webkit'];
var upper = /([A-Z])/g;
var memo = {};

/**
 * prefix `key`
 *
 *   prefix('transform') // => WebkitTransform
 *
 * @param {String} key
 * @return {String}
 * @api public
 */
function prefix(key){
  // Camel case
  key = key.replace(/-([a-z])/g, function(_, char){
    return char.toUpperCase()
  });

  // Without prefix
  if (style[key] !== undefined) { return key }

  // With prefix
  var Key = key.charAt(0).toUpperCase() + key.slice(1);
  var i = prefixes.length;
  while (i--) {
    var name = prefixes[i] + Key;
    if (style[name] !== undefined) { return name }
  }

  return key
}

/**
 * Memoized version of `prefix`
 *
 * @param {String} key
 * @return {String}
 * @api public
 */
function prefixMemozied(key){
  return key in memo
    ? memo[key]
    : memo[key] = prefix(key)
}

/**
 * Create a dashed prefix
 *
 * @param {String} key
 * @return {String}
 * @api public
 */
function prefixDashed(key){
  key = prefix(key);
  if (upper.test(key)) {
    key = '-' + key.replace(upper, '-$1');
    upper.lastIndex = 0;
  }
  return key.toLowerCase()
}

var prefix_1 = prefixMemozied;
var dash = prefixDashed;

prefix_1.dash = dash;

/**
 * isArray
 */

var isArray$1 = Array.isArray;

/**
 * toString
 */

var str = Object.prototype.toString;

/**
 * Whether or not the given `val`
 * is an array.
 *
 * example:
 *
 *        isArray([]);
 *        // > true
 *        isArray(arguments);
 *        // > false
 *        isArray('');
 *        // > false
 *
 * @param {mixed} val
 * @return {bool}
 */

var isArray_1 = isArray$1 || function (val) {
  return !! val && '[object Array]' == str.call(val);
};

var properties = {
  transform: {
    translate: {defaultUnit: 'px'},
    translate3d: {defaultUnit: 'px'},
    translateX: {defaultUnit: 'px'},
    translateY: {defaultUnit: 'px'},
    translateZ: {defaultUnit: 'px'},
    scale: {defaultUnit: ''},
    scale3d: {defaultUnit: ''},
    scaleX: {defaultUnit: ''},
    scaleY: {defaultUnit: ''},
    scaleZ: {defaultUnit: ''},
    rotate: {defaultUnit: 'deg'},
    rotate3d: {defaultUnit: ''},
    rotateX: {defaultUnit: 'deg'},
    rotateY: {defaultUnit: 'deg'},
    rotateZ: {defaultUnit: 'deg'},
    skew: {defaultUnit: 'deg'},
    skewX: {defaultUnit: 'deg'},
    skewY: {defaultUnit: 'deg'},
    perspective: {defaultUnit: 'px'},
    matrix: {defaultUnit: ''},
    matrix3d: {defaultUnit: ''}
  },

  transformOrigin: {
    defaultUnit: 'px',
    separator: ' '
  }
};

var trim_1 = createCommonjsModule(function (module, exports) {
exports = module.exports = trim;

function trim(str){
  return str.replace(/^\s*|\s*$/g, '');
}

exports.left = function(str){
  return str.replace(/^\s*/, '');
};

exports.right = function(str){
  return str.replace(/\s*$/, '');
};
});

var trim_2 = trim_1.left;
var trim_3 = trim_1.right;

var NUMBER_REGEX = /^-?\d+(\.\d+)?$/;

var defaultUnit = function(value, unit, separator) {
  separator = separator || ',';

  if (typeof value === 'number') {
    return '' + value + unit;
  }

  // Allow to use either the defined separator or space
  // to delimitate the values.
  // Ex: '10 10' or '10, 10'.
  var separatorRegExp = new RegExp(separator, 'g');
  var values = value.split(separatorRegExp.test(value) ? separator : ' ');

  return values.map(function(v) {
    v = trim_1(v);

    if (NUMBER_REGEX.test(v)) {
      v += unit;
    }

    return v;
  }).join(separator);
};

var domTransform = createCommonjsModule(function (module, exports) {
var _has = Object.prototype.hasOwnProperty;
var transformProp = prefix_1('transform');
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
    if (!_has.call(opts, propName)) { continue; }

    propValue = opts[propName];

    // If it's a transform property.
    if (_has.call(properties.transform, propName)) {
      propData = properties.transform[propName];

      if (isArray_1(propValue)) {
        propValue = propValue.join(propData.separator);
      }

      transformOutput.push(
        propName + '(' + defaultUnit(
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

      if (isArray_1(propValue)) {
        propValue = propValue.join(propData.separator);
      }

      target.style[prefix_1(propName)] = defaultUnit(
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

    return s[prefix_1(props)];
  }

  if (!props) {
    props = getPropertiesName();
  }

  var values = {};
  props.forEach(function(propName) {
    values[propName] = s[prefix_1(propName)];
  });

  return values;
}

exports.reset = reset;
function reset(target, props) {
  var s = target.style;

  if (typeof props === 'string') {
    s[prefix_1(props)] = null;
    return;
  }

  if (!props) {
    props = getPropertiesName();
  }

  props.forEach(function(propName) {
    s[prefix_1(propName)] = null;
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
});

var domTransform_1 = domTransform.get;
var domTransform_2 = domTransform.reset;
var domTransform_3 = domTransform.isSupported;

var src = createCommonjsModule(function (module) {
(function() {

var Emitter = componentEmitter;
var isNumber = isNumber$1;
var tinycolor$$1 = tinycolor;
var transform = domTransform;

/**
 * Creates a new SimpleColorPicker
 * @param {Object} options
 * @param {String|Number|Object} options.color The default color that the picker will display. Default is #FFFFFF. It can be a hexadecimal number or an hex String.
 * @param {String|Number|Object} options.background The background color of the picker. Default is transparent. It can be a hexadecimal number or an hex String.
 * @param {HTMLElement} options.el A dom node to add the picker to. You can also use `colorPicker.appendTo(domNode)` afterwards if you prefer.
 * @param {Number} options.width Desired width of the color picker. Default is 175.
 * @param {Number} options.height Desired height of the color picker. Default is 150.
 */
function SimpleColorPicker(options) {
  // Options
  options = options || {};

  // Properties
  this.color = null;
  this.width = 0;
  this.widthUnits = 'px';
  this.height = 0;
  this.heightUnits = 'px';
  this.hue = 0;
  this.position = {x: 0, y: 0};
  this.huePosition = 0;
  this.saturationWidth = 0;
  this.hueHeight = 0;
  this.maxHue = 0;
  this.inputIsNumber = false;

  // Bind methods to scope (if needed)
  this._onSaturationMouseDown = this._onSaturationMouseDown.bind(this);
  this._onSaturationMouseMove = this._onSaturationMouseMove.bind(this);
  this._onSaturationMouseUp = this._onSaturationMouseUp.bind(this);
  this._onHueMouseDown = this._onHueMouseDown.bind(this);
  this._onHueMouseMove = this._onHueMouseMove.bind(this);
  this._onHueMouseUp = this._onHueMouseUp.bind(this);

  // Create DOM
  this.$el = document.createElement('div');
  this.$el.className = 'Scp';
  this.$el.innerHTML = [
    '<div class="Scp-saturation">',
      '<div class="Scp-brightness"></div>',
      '<div class="Scp-sbSelector"></div>',
    '</div>',
    '<div class="Scp-hue">',
      '<div class="Scp-hSelector"></div>',
    '</div>'
  ].join('');

  // DOM accessors
  this.$saturation = this.$el.querySelector('.Scp-saturation');
  this.$hue = this.$el.querySelector('.Scp-hue');
  this.$sbSelector = this.$el.querySelector('.Scp-sbSelector');
  this.$hSelector = this.$el.querySelector('.Scp-hSelector');

  // Event listeners
  this.$saturation.addEventListener('mousedown', this._onSaturationMouseDown);
  this.$saturation.addEventListener('touchstart', this._onSaturationMouseDown);
  this.$hue.addEventListener('mousedown', this._onHueMouseDown);
  this.$hue.addEventListener('touchstart', this._onHueMouseDown);

  // Some styling and DOMing from options
  if (options.el) {
    this.appendTo(options.el);
  }
  if (options.background) {
    this.setBackgroundColor(options.background);
  }
  if (options.widthUnits) {
    this.widthUnits = options.widthUnits;
  }
  if (options.heightUnits) {
    this.heightUnits = options.heightUnits;
  }
  this.setSize(options.width || 175, options.height || 150);
  this.setColor(options.color);

  return this;
}

Emitter(SimpleColorPicker.prototype);

/* =============================================================================
  Public API
============================================================================= */
/**
 * Add the SimpleColorPicker instance to a DOM element.
 * @param  {HTMLElement} el
 * @return {SimpleColorPicker} Returns itself for chaining purpose
 */
SimpleColorPicker.prototype.appendTo = function(el) {
  el.appendChild(this.$el);
  return this;
};

/**
 * Removes picker from its parent and kill all listeners.
 * Call this method for proper destroy.
 */
SimpleColorPicker.prototype.remove = function() {
  this._onSaturationMouseUp();
  this._onHueMouseUp();

  this.$saturation.removeEventListener('mousedown', this._onSaturationMouseDown);
  this.$saturation.removeEventListener('touchstart', this._onSaturationMouseDown);
  this.$hue.removeEventListener('mousedown', this._onHueMouseDown);
  this.$hue.removeEventListener('touchstart', this._onHueMouseDown);

  this.off();

  if (this.$el.parentNode) {
    this.$el.parentNode.removeChild(this.$el);
  }
};

/**
 * Manually set the current color of the picker. This is the method
 * used on instantiation to convert `color` option to actual color for
 * the picker. Param can be a hexadecimal number or an hex String.
 * @param {String|Number} color hex color desired
 * @return {SimpleColorPicker} Returns itself for chaining purpose
 */
SimpleColorPicker.prototype.setColor = function(color) {
  if(isNumber(color)) {
    this.inputIsNumber = true;
    color = numberToHex(color);
  } else {
    this.inputIsNumber = false;
  }
  this.color = tinycolor$$1(color);

  var hsvColor = this.color.toHsv();

  if(!isNaN(hsvColor.h)) {
    this.hue = hsvColor.h;
  }

  this._moveSelectorTo(this.saturationWidth * hsvColor.s, (1 - hsvColor.v) * this.hueHeight);
  this._moveHueTo((1 - (this.hue / 360)) * this.hueHeight);

  this._updateHue();
  return this;
};

/**
 * Set size of the color picker for a given width and height. Note that
 * a padding of 5px will be added if you chose to use the background option
 * of the constructor.
 * @param {Number} width
 * @param {Number} height
 * @return {SimpleColorPicker} Returns itself for chaining purpose
 */
SimpleColorPicker.prototype.setSize = function(width, height) {
  this.width = width;
  this.height = height;
  this.$el.style.width = this.width + this.widthUnits;
  this.$el.style.height = this.height + this.heightUnits;

  this.saturationWidth = this.width - 25;
  this.$saturation.style.width = this.saturationWidth + 'px';

  this.hueHeight = this.height;
  this.maxHue = this.hueHeight - 2;

  return this;
};

/**
 * Set the background color of the picker. It also adds a 5px padding
 * for design purpose.
 * @param {String|Number} color hex color desired for background
 * @return {SimpleColorPicker} Returns itself for chaining purpose
 */
SimpleColorPicker.prototype.setBackgroundColor = function(color) {
  if(isNumber(color)) {
    color = numberToHex(color);
  }
  this.$el.style.padding = '5px';
  this.$el.style.background = tinycolor$$1(color).toHexString();
  return this;
};

/**
 * Removes background of the picker if previously set. It's no use
 * calling this method if you didn't set the background option on start
 * or if you didn't call setBackgroundColor previously.
 */
SimpleColorPicker.prototype.setNoBackground = function() {
  this.$el.style.padding = '0px';
  this.$el.style.background = 'none';
};

/**
 * Registers callback to the update event of the picker.
 * picker inherits from [component/emitter](https://github.com/component/emitter)
 * so you could do the same thing by calling `colorPicker.on('update');`
 * @param  {Function} callback
 * @return {SimpleColorPicker} Returns itself for chaining purpose
 */
SimpleColorPicker.prototype.onChange = function(callback) {
  this.on('update', callback);
  this.emit('update', this.getHexString());
  return this;
};

/* =============================================================================
  Color getters
============================================================================= */
/**
 * Main color getter, will return a formatted color string depending on input
 * or a number depending on the last setColor call.
 * @return {Number|String}
 */
SimpleColorPicker.prototype.getColor = function() {
  if(this.inputIsNumber) {
    return this.getHexNumber();
  }
  return this.color.toString();
};

/**
 * Returns color as css hex string (ex: '#FF0000').
 * @return {String}
 */
SimpleColorPicker.prototype.getHexString = function() {
  return this.color.toHexString().toUpperCase();
};

/**
 * Returns color as number (ex: 0xFF0000).
 * @return {Number}
 */
SimpleColorPicker.prototype.getHexNumber = function() {
  return parseInt(this.color.toHex(), 16);
};

/**
 * Returns color as {r: 255, g: 0, b: 0} object.
 * @return {Object}
 */
SimpleColorPicker.prototype.getRGB = function() {
  return this.color.toRgb();
};

/**
 * Returns color as {h: 100, s: 1, v: 1} object.
 * @return {Object}
 */
SimpleColorPicker.prototype.getHSV = function() {
  return this.color.toHsv();
};

/**
 * Returns true if color is perceived as dark
 * @return {Boolean}
 */
SimpleColorPicker.prototype.isDark = function() {
  return this.color.isDark();
};

/**
 * Returns true if color is perceived as light
 * @return {Boolean}
 */
SimpleColorPicker.prototype.isLight = function() {
  return this.color.isLight();
};

/* =============================================================================
  "Private" methods
============================================================================= */
SimpleColorPicker.prototype._moveSelectorTo = function(x, y) {
  this.position.x = clamp(x, 0, this.saturationWidth);
  this.position.y = clamp(y, 0, this.hueHeight);

  transform(this.$sbSelector, {
    x: this.position.x,
    y: this.position.y
  });
};

SimpleColorPicker.prototype._updateColorFromPosition = function() {
  this.color = tinycolor$$1({h: this.hue, s: this.position.x / this.saturationWidth, v: 1 - (this.position.y / this.hueHeight)});
  this._updateColor();
};

SimpleColorPicker.prototype._moveHueTo = function(y) {
  this.huePosition = clamp(y, 0, this.maxHue);

  transform(this.$hSelector, {
    y: this.huePosition
  });
};

SimpleColorPicker.prototype._updateHueFromPosition = function() {
  var hsvColor = this.color.toHsv();
  this.hue = 360 * (1 - (this.huePosition / this.maxHue));
  this.color = tinycolor$$1({h: this.hue, s: hsvColor.s, v: hsvColor.v});
  this._updateHue();
};

SimpleColorPicker.prototype._updateHue = function() {
  var hueColor = tinycolor$$1({h: this.hue, s: 1, v: 1});
  this.$saturation.style.background = 'linear-gradient(to right, #fff, ' + hueColor.toHexString() + ')';
  this._updateColor();
};

SimpleColorPicker.prototype._updateColor = function() {
  this.$sbSelector.style.background = this.color.toHexString();
  this.$sbSelector.style.borderColor = this.color.isDark() ? '#fff' : '#000';
  this.emit('update', this.color.toHexString());
};

/* =============================================================================
  Events handlers
============================================================================= */
SimpleColorPicker.prototype._onSaturationMouseDown = function(e) {
  var sbOffset = this.$saturation.getBoundingClientRect();
  var xPos = getMousePosition(e).x;
  var yPos = getMousePosition(e).y;
  this._moveSelectorTo(xPos - sbOffset.left, yPos - sbOffset.top);
  this._updateColorFromPosition();
  window.addEventListener('mouseup', this._onSaturationMouseUp);
  window.addEventListener('touchend', this._onSaturationMouseUp);
  window.addEventListener('mousemove', this._onSaturationMouseMove);
  window.addEventListener('touchmove', this._onSaturationMouseMove);
  e.preventDefault();
};

SimpleColorPicker.prototype._onSaturationMouseMove = function(e) {
  var sbOffset = this.$saturation.getBoundingClientRect();
  var xPos = getMousePosition(e).x;
  var yPos = getMousePosition(e).y;
  this._moveSelectorTo(xPos - sbOffset.left, yPos - sbOffset.top);
  this._updateColorFromPosition();
};

SimpleColorPicker.prototype._onSaturationMouseUp = function() {
  window.removeEventListener('mouseup', this._onSaturationMouseUp);
  window.removeEventListener('touchend', this._onSaturationMouseUp);
  window.removeEventListener('mousemove', this._onSaturationMouseMove);
  window.removeEventListener('touchmove', this._onSaturationMouseMove);
};

SimpleColorPicker.prototype._onHueMouseDown = function(e) {
  var hOffset = this.$hue.getBoundingClientRect();
  var yPos = getMousePosition(e).y;
  this._moveHueTo(yPos - hOffset.top);
  this._updateHueFromPosition();
  window.addEventListener('mouseup', this._onHueMouseUp);
  window.addEventListener('touchend', this._onHueMouseUp);
  window.addEventListener('mousemove', this._onHueMouseMove);
  window.addEventListener('touchmove', this._onHueMouseMove);
  e.preventDefault();
};

SimpleColorPicker.prototype._onHueMouseMove = function(e) {
  var hOffset = this.$hue.getBoundingClientRect();
  var yPos = getMousePosition(e).y;
  this._moveHueTo(yPos - hOffset.top);
  this._updateHueFromPosition();
};

SimpleColorPicker.prototype._onHueMouseUp = function() {
  window.removeEventListener('mouseup', this._onHueMouseUp);
  window.removeEventListener('touchend', this._onHueMouseUp);
  window.removeEventListener('mousemove', this._onHueMouseMove);
  window.removeEventListener('touchmove', this._onHueMouseMove);
};

/* =============================================================================
  Helper functions
============================================================================= */
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function getMousePosition(e) {
  e = (e.type.indexOf('touch') === 0) ? e.touches[0] : e;
  return {
    x: e.clientX,
    y: e.clientY
  };
}

function numberToHex(color) {
  return color = '#' + ('00000' + (color | 0).toString(16)).substr(-6);
}

if ('object' !== 'undefined' && module.exports) {
  module.exports = SimpleColorPicker;
}

})();
});

function __$styleInject(css, returnValue) {
  if (typeof document === 'undefined') {
    return returnValue;
  }
  css = css || '';
  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';
  head.appendChild(style);
  
  if (style.styleSheet){
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
  return returnValue;
}

function _interopDefault$1 (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var SimpleColorPicker = _interopDefault$1(src);

var isBoolean = function (bool) { return bool === true || bool === false; };

var isFunction = function (func) { return typeof func === 'function'; };

var isString = function (func) { return typeof func === 'string'; };

var isNumber = function (num) { return typeof num === 'number' && !isNaN(num); };

var isArray = function (arr) { return Array.isArray(arr); };

var isObject = function (obj) { return obj !== null && typeof obj === 'object' && !isArray(obj); };

var isThreejsColor = function (obj) {
  return isObject(obj) &&
    isBoolean(obj.isColor) &&
    isFunction(obj.setHex) &&
    isFunction(obj.getHex)
};

function isValidDomParent (element) {
  if (!element) { return false }
  return isObject(element) && isNumber(element.nodeType) && isString(element.nodeName)
}

function createElement (tagName) {
  var arguments$1 = arguments;

  var classes = [], len = arguments.length - 1;
  while ( len-- > 0 ) { classes[ len ] = arguments$1[ len + 1 ]; }

  var $el = document.createElement(tagName);
  addClasses.apply(void 0, [ $el ].concat( classes ));
  return $el
}

function appendElement (element, parent) {
  if ( parent === void 0 ) { parent = document.body; }

  parent.appendChild(element);
}

function offset (elem) {
  var result = {left: 0, top: 0};
  while (elem && !isNaN(elem.offsetTop) && !isNaN(elem.offsetLeft)) {
    result.left += elem.offsetLeft;
    result.top += elem.offsetTop;
    elem = elem.offsetParent;
  }
  return result
}

/* ---------------------------------------------------------------------------------
  CLASSES STUFF
--------------------------------------------------------------------------------- */
function addClasses (element) {
  var arguments$1 = arguments;

  var classNames = [], len = arguments.length - 1;
  while ( len-- > 0 ) { classNames[ len ] = arguments$1[ len + 1 ]; }

  classNames.forEach(function (className) { return addClass(element, className); });
}

function addClass (element, className) {
  if (hasClass(element, className)) { return }
  if (element.classList) {
    element.classList.add(className);
  } else {
    element.className += ' ' + className;
  }
}

function hasClass (element, className) {
  if (element.classList) {
    return element.classList.contains(className)
  } else {
    return new RegExp('(^| )' + className + '( |$)', 'gi').test(element.className)
  }
}

function removeClass (element, className) {
  if (!hasClass(element, className)) { return }
  if (element.classList) {
    element.classList.remove(className);
  } else {
    element.className = element.className.replace(
      new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'),
      ' '
    );
  }
}

function toggleClass (element, className) {
  if (hasClass(element, className)) {
    removeClass(element, className);
  } else {
    addClass(element, className);
  }
}

var Renderable = function Renderable (options, domString) {
  if ( options === void 0 ) { options = {}; }
  if ( domString === void 0 ) { domString = ''; }

  this.classNames = options.classNames || [];
  this.$el = createElement.apply(void 0, [ 'div' ].concat( this.classNames ));
  this.parent = null;
  this.$el.innerHTML = domString;
};

Renderable.prototype.render = function render () {};

Renderable.prototype.appendTo = function appendTo (parent) {
  if (isValidDomParent(parent)) {
    this.parent = parent;
    parent.appendChild(this.$el);
  } else {
    throw new Error('Renderable cannot be added to ' + parent)
  }
};

Renderable.prototype.remove = function remove () {
  if (this.parent) {
    this.parent.removeChild(this.$el);
    this.parent = null;
  }
};

var Component = (function (Renderable$$1) {
  function Component (object, property, options, domString) {
    if ( options === void 0 ) { options = {}; }
    if ( domString === void 0 ) { domString = ''; }

    options.classNames = options.classNames || [];
    options.classNames.push('guigui-component');

    if (!object) {
      throw new Error('Cannot create a component around a non object')
    }

    Renderable$$1.call(this, options, domString);

    this.onWatch = this.onWatch.bind(this);
    this.isWatched = options.watch === true;

    this._targetObject = object;
    this._targetProperty = property;
    this._value = object[property];
    this._events = [];

    this.onEndInteraction();
  }

  if ( Renderable$$1 ) { Component.__proto__ = Renderable$$1; }
  Component.prototype = Object.create( Renderable$$1 && Renderable$$1.prototype );
  Component.prototype.constructor = Component;

  Component.prototype.on = function on (type, handler) {
    if (!this._events[type]) {
      this._events[type] = [];
    }
    this._events[type].push(handler);
  };

  Component.prototype.off = function off (type, handler) {
    if (this._events[type]) {
      this._events[type].splice(this._events[type].indexOf(handler) >>> 0, 1);
    }
  };

  Component.prototype.emit = function emit (type, evt) {
    (this._events[type] || []).slice().map(function (handler) {
      handler(evt);
    });
  };

  Component.prototype.invalidate = function invalidate () {
    this._value = this._targetObject[this._targetProperty];
  };

  Component.prototype.onWatch = function onWatch () {
    if (this._targetObject[this._targetProperty] !== this._value) {
      this.invalidate();
    }
  };

  Component.prototype.onStartInteraction = function onStartInteraction () {
    if (this.isWatched) {
      clearInterval(this._watchInterval);
    }
  };

  Component.prototype.onEndInteraction = function onEndInteraction () {
    if (this.isWatched) {
      this._watchInterval = setInterval(this.onWatch, 100);
    }
  };

  return Component;
}(Renderable));

__$styleInject(".guigui-toggler-label {\n  font-size: 12px;\n  line-height: 18px;\n  font-style: italic;\n  text-align: center;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n}\n\n.guigui-toggler {\n  cursor: pointer;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n}\n\n.guigui-toggler-label {\n  float: left;\n  width: calc(90% - 27px);\n  padding: 0px 5px;\n}\n\n.guigui-toggler-state, .guigui-toggler-handle {\n  border-radius: 2px;\n}\n\n.guigui-toggler-state {\n  position: relative;\n  background: #1D1F24;\n  height: 100%;\n  width: 17px;\n  float: left;\n  margin: 0px 0px 0px 10px;\n  box-shadow: rgba(255, 255, 255, 0.0470588) 0px 2px 1px;\n}\n\n.guigui-toggler-handle {\n  position: absolute;\n  background: #3D77EB;\n  width: 54%;\n  height: 50%;\n  top: 25%;\n  left: 23%;\n  display: none;\n}\n\n.guigui-toggler--selected .guigui-toggler-handle {\n  display: block;\n}",undefined);

var Toggler = (function (Component$$1) {
  function Toggler (object, property, options) {
    if ( options === void 0 ) { options = {}; }

    var label = options.label; if ( label === void 0 ) { label = property; }

    var domString = "\n      <div class=\"guigui-toggler-label\">" + label + "</div>\n      <div class=\"guigui-toggler-state\">\n        <div class=\"guigui-toggler-handle\"></div>\n      </div>\n    ";

    Component$$1.call(this, object, property, {classNames: ['guigui-toggler']}, domString);

    this.onTogglerClick = this.onTogglerClick.bind(this);

    this.labelText = label;
    this.isSelected = false;
    this.isToggler = true;

    this.value = this._targetObject[this._targetProperty] === true;

    this.$el.addEventListener('click', this.onTogglerClick);
  }

  if ( Component$$1 ) { Toggler.__proto__ = Component$$1; }
  Toggler.prototype = Object.create( Component$$1 && Component$$1.prototype );
  Toggler.prototype.constructor = Toggler;

  var prototypeAccessors = { value: { configurable: true } };

  Toggler.prototype.onTogglerClick = function onTogglerClick (e) {
    this.onStartInteraction();
    this.value = !this.value;
    this.onEndInteraction();
  };

  prototypeAccessors.value.get = function () {
    return this.isSelected
  };

  prototypeAccessors.value.set = function (value) {
    if (value) {
      this.isSelected = true;
      addClass(this.$el, 'guigui-toggler--selected');
    } else {
      this.isSelected = false;
      removeClass(this.$el, 'guigui-toggler--selected');
    }
    this._targetObject[this._targetProperty] = value;
    this.emit('update', value);
  };

  Object.defineProperties( Toggler.prototype, prototypeAccessors );

  return Toggler;
}(Component));

function toFixed (number, precision) {
  var power = Math.pow(10, precision);
  return (Math.round(number * power) / power).toFixed(precision)
}

function format (number, pattern) {
  var precision = String(pattern).split('.')[1];
  return toFixed(number, precision ? precision.length : 0)
}

function clamp (value, min, max) {
  return Math.min(Math.max(value, min), max)
}

function toPrecision (number, step) {
  return Math.round(number / step) * step
}

__$styleInject(".guigui-slider-label {\n  font-size: 12px;\n  line-height: 18px;\n  font-style: italic;\n  text-align: center;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n}\n\n.guigui-slider-label {\n  float: left;\n  width: calc(29.5% - 10px);\n  padding: 0px 5px;\n}\n\n.guigui-slider-container {\n  float: left;\n  width: calc(50% - 20px);\n  margin: 0px 10px;\n  height: 100%;\n  position: relative;\n  cursor: ew-resize;\n}\n\n.guigui-slider-background, .guigui-slider-handle {\n  position: absolute;\n  width: 100%;\n  height: 18%;\n  top: 5%;\n  pointer-events: none;\n}\n\n.guigui-slider-background {\n  background: linear-gradient(to right, #3D77EB 0%, #00D2DA 100%);\n  pointer-events: none;\n}\n\n.guigui-slider-handle {\n  background: #22252B;\n  right: 0px;\n  -webkit-transform-origin: right center 0px;\n          transform-origin: right center 0px;\n}\n\n.guigui-slider-indice {\n  color: #6B6B6B;\n  font-size: 9px;\n  line-height: 7px;\n  bottom: 0;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  position: absolute;\n  pointer-events: none;\n}\n\n.guigui-slider-indice.guigui-slider-indice--min {\n  left: 0px;\n}\n\n.guigui-slider-indice.guigui-slider-indice--max {\n  right: 0px;\n}\n\n.guigui-slider-value {\n  float: left;\n  font-family: \"Courier New\", Arial;\n  background: #22252B;\n  color: #3D77EB;\n  height: 100%;\n  line-height: 1;\n  width: 20.5%;\n  font-size: 10px;\n  text-align: center;\n  margin: 0px;\n  border: 0px;\n  padding: 0px;\n  display: inline-block;\n  vertical-align: middle;\n  white-space: normal;\n  box-sizing: content-box;\n  outline: 0px;\n}",undefined);

var Slider = (function (Component$$1) {
  function Slider (object, property, options) {
    if ( options === void 0 ) { options = {}; }

    var step = options.step; if ( step === void 0 ) { step = 1; }
    var min = options.min; if ( min === void 0 ) { min = 0; }
    var max = options.max; if ( max === void 0 ) { max = 100; }
    var watch = options.watch; if ( watch === void 0 ) { watch = false; }
    var label = options.label; if ( label === void 0 ) { label = property; }

    var minText = format(min, step.toString());
    var maxText = format(max, step.toString());

    var domString = "\n      <div class=\"guigui-slider-label\">" + label + "</div>\n      <div class=\"guigui-slider-container\">\n        <div class=\"guigui-slider-background\"></div>\n        <div class=\"guigui-slider-handle\"></div>\n          <div class=\"guigui-slider-indice guigui-slider-indice--min\">" + minText + "</div>\n          <div class=\"guigui-slider-indice guigui-slider-indice--max\">" + maxText + "</div>\n        </div>\n        <input type=\"text\" class=\"guigui-slider-value\" value=\"0\"/>\n      </div>\n    ";

    Component$$1.call(this, object, property, {watch: watch, classNames: ['guigui-slider']}, domString);

    this.onSliderStartDrag = this.onSliderStartDrag.bind(this);
    this.onSliderStopDrag = this.onSliderStopDrag.bind(this);
    this.onSliderDrag = this.onSliderDrag.bind(this);
    this.onTextStartDrag = this.onTextStartDrag.bind(this);
    this.onTextStopDrag = this.onTextStopDrag.bind(this);
    this.onTextDrag = this.onTextDrag.bind(this);
    this.onTextKeyDown = this.onTextKeyDown.bind(this);
    this.onTextChange = this.onTextChange.bind(this);

    this.isSlider = true;
    this.step = step;
    this.min = min;
    this.max = max;
    this.labelText = label;
    this.isWatched = watch === true;
    this.minText = minText;
    this.maxText = maxText;

    this.textValueSlowingFactor = 0.1;

    this.sliderValue = 0;

    this.$container = this.$el.querySelector('.guigui-slider-container');
    this.$handle = this.$el.querySelector('.guigui-slider-handle');
    this.$background = this.$el.querySelector('.guigui-slider-background');
    this.$value = this.$el.querySelector('.guigui-slider-value');

    // create event listeners
    this.$container.addEventListener('mousedown', this.onSliderStartDrag);
    this.$value.addEventListener('mousedown', this.onTextStartDrag);
    this.$value.addEventListener('keydown', this.onTextKeyDown);
    this.$value.addEventListener('change', this.onTextChange);

    // set initial value
    this.value = this._targetObject[this._targetProperty];
  }

  if ( Component$$1 ) { Slider.__proto__ = Component$$1; }
  Slider.prototype = Object.create( Component$$1 && Component$$1.prototype );
  Slider.prototype.constructor = Slider;

  var prototypeAccessors = { value: { configurable: true } };

  prototypeAccessors.value.get = function () {
    return this.sliderValue
  };

  prototypeAccessors.value.set = function (value) {
    if (!isNaN(value)) {
      this.sliderValue = clamp(toPrecision(value, this.step), this.min, this.max);
      this._value = this.sliderValue;
      this.updateTarget().updateSlider().updateText();
      this.emit('update', this.sliderValue);
    }
  };

  Slider.prototype.remove = function remove () {
    this.$container.removeEventListener('mousedown', this.onSliderStartDrag);
    this.$value.removeEventListener('mousedown', this.onTextStartDrag);
    this.$value.removeEventListener('keydown', this.onTextKeyDown);
    this.$value.removeEventListener('change', this.onTextChange);
    this.onSliderStopDrag();
    this.onTextStopDrag();
    Component$$1.prototype.remove.call(this);
  };

  /* =============================================================================
    Slider Dragging
  ============================================================================= */
  Slider.prototype.onSliderStartDrag = function onSliderStartDrag (e) {
    this.onStartInteraction();
    this.onSliderDrag(e);
    window.addEventListener('mouseup', this.onSliderStopDrag);
    window.addEventListener('mousemove', this.onSliderDrag);
    e.preventDefault();
  };

  Slider.prototype.onSliderStopDrag = function onSliderStopDrag (e) {
    window.removeEventListener('mouseup', this.onSliderStopDrag);
    window.removeEventListener('mousemove', this.onSliderDrag);
    this.onEndInteraction();
    if (e) { e.preventDefault(); }
  };

  Slider.prototype.onSliderDrag = function onSliderDrag (e) {
    var ratio = (e.clientX - offset(this.$handle).left) / this.$background.offsetWidth;
    this.value = this.min + (this.max - this.min) * ratio;
    e.preventDefault();
  };

  /* =============================================================================
    Text Dragging
  ============================================================================= */
  Slider.prototype.onTextStartDrag = function onTextStartDrag (e) {
    this.startY = e.clientY;
    this.startValue = this.value;
    window.addEventListener('mouseup', this.onTextStopDrag);
    window.addEventListener('mousemove', this.onTextDrag);
    e.preventDefault();
  };

  Slider.prototype.onTextStopDrag = function onTextStopDrag (e) {
    window.removeEventListener('mouseup', this.onTextStopDrag);
    window.removeEventListener('mousemove', this.onTextDrag);
    if (e) { e.preventDefault(); }
  };

  Slider.prototype.onTextDrag = function onTextDrag (e) {
    var delta = this.startY - e.clientY;
    this.value = this.startValue + delta * this.step * this.textValueSlowingFactor;
    e.preventDefault();
  };

  Slider.prototype.onTextKeyDown = function onTextKeyDown (e) {
    if (e.keyCode === 38) {
      this.value += this.step;
    } else if (e.keyCode === 40) {
      this.value -= this.step;
    }
  };

  Slider.prototype.onTextChange = function onTextChange () {
    if (this.$value.value.match(/^[+-]?\d+(\.\d+)?$/g)) {
      this.value = Number(this.$value.value);
    } else {
      this.value = this.sliderValue;
    }
  };

  /* =============================================================================
    Updaters
  ============================================================================= */
  Slider.prototype.updateTarget = function updateTarget () {
    this._targetObject[this._targetProperty] = this.sliderValue;
    return this
  };

  Slider.prototype.updateText = function updateText () {
    this.$value.value = format(this.sliderValue, this.step.toString());
    return this
  };

  Slider.prototype.updateSlider = function updateSlider () {
    this.$handle.style.transform = 'scaleX(' +
      (1 - (this.sliderValue - this.min) / (this.max - this.min)) +
      ')';
    return this
  };

  Slider.prototype.invalidate = function invalidate () {
    Component$$1.prototype.invalidate.call(this);
    this.value = this._value;
  };

  Object.defineProperties( Slider.prototype, prototypeAccessors );

  return Slider;
}(Component));

__$styleInject(".guigui-launcher-label {\n  font-size: 12px;\n  line-height: 18px;\n  font-style: italic;\n  text-align: center;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n}\n\n.guigui-launcher {\n  cursor: pointer;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n}\n\n.guigui .guigui-launcher--pressed {\n  background: #36383F;\n}\n\n.guigui-launcher-label {\n  text-transform: capitalize;\n}\n\n.guigui-launcher-label span {\n  position: relative;\n  top: -1px;\n  left: 4px;\n  color: #3D77EB;\n}",undefined);

var Launcher = (function (Component$$1) {
  function Launcher (object, property, options) {
    if ( options === void 0 ) { options = {}; }

    var label = options.label; if ( label === void 0 ) { label = property; }
    var scope = options.scope; if ( scope === void 0 ) { scope = object; }

    var domString = "\n      <div class=\"guigui-launcher-label\">" + label + "<span>()</span></div>\n    ";

    Component$$1.call(this, object, property, {classNames: ['guigui-launcher']}, domString);

    this.onButtonClick = this.onButtonClick.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);

    this.isLauncher = true;
    this.labelText = label;
    this.callbackScope = scope;

    this.$el.addEventListener('click', this.onButtonClick);
    this.$el.addEventListener('mousedown', this.onMouseDown);
  }

  if ( Component$$1 ) { Launcher.__proto__ = Component$$1; }
  Launcher.prototype = Object.create( Component$$1 && Component$$1.prototype );
  Launcher.prototype.constructor = Launcher;

  Launcher.prototype.remove = function remove () {
    this.$el.removeEventListener('click', this.onButtonClick);
    this.$el.removeEventListener('mousedown', this.onMouseDown);
    window.removeEventListener('mouseup', this.onMouseUp);
    Component$$1.prototype.remove.call(this);
  };

  Launcher.prototype.onButtonClick = function onButtonClick () {
    this._targetObject[this._targetProperty].call(this.callbackScope);
  };

  Launcher.prototype.onMouseDown = function onMouseDown () {
    addClass(this.$el, 'guigui-launcher--pressed');
    window.addEventListener('mouseup', this.onMouseUp);
  };

  Launcher.prototype.onMouseUp = function onMouseUp () {
    window.removeEventListener('mouseup', this.onMouseUp);
    removeClass(this.$el, 'guigui-launcher--pressed');
  };

  return Launcher;
}(Component));

__$styleInject(".guigui-text-label {\n  font-size: 12px;\n  line-height: 18px;\n  font-style: italic;\n  text-align: center;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  float: left;\n  width: calc(31.5% - 20px);\n  padding: 0px 5px;\n  margin-right: 10px;\n}.guigui-text-value {\n  width: calc(68.5% - 10px);\n  background: #22252B;\n  color: #3D77EB;\n  line-height: 12px;\n  box-sizing: content-box;\n}\n\n.guigui-text {\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n}\n\n.guigui-text-value {\n  float: left;\n  height: 10px;\n  font-size: 11px;\n  text-align: left;\n  margin: 0px;\n  border: 0px;\n  padding: 4px 5px;\n  display: inline-block;\n  vertical-align: middle;\n  white-space: normal;\n  outline: 0px;\n}\n",undefined);

var Text = (function (Component$$1) {
  function Text (object, property, options) {
    if ( options === void 0 ) { options = {}; }

    var label = options.label; if ( label === void 0 ) { label = property; }

    var currentValue = object[property];

    var domString = "\n      <div class=\"guigui-text-label\">" + label + "</div>\n      <input type=\"text\" class=\"guigui-text-value\" value=\"" + currentValue + "\"/>\n    ";

    Component$$1.call(this, object, property, {classNames: ['guigui-text']}, domString);

    this.onInputChange = this.onInputChange.bind(this);

    this.isText = true;
    this.$input = this.$el.querySelector('input');
    this.value = currentValue;
    this.$input.addEventListener('input', this.onInputChange);
  }

  if ( Component$$1 ) { Text.__proto__ = Component$$1; }
  Text.prototype = Object.create( Component$$1 && Component$$1.prototype );
  Text.prototype.constructor = Text;

  var prototypeAccessors = { value: { configurable: true } };

  Text.prototype.onInputChange = function onInputChange () {
    this.value = this.$input.value;
  };

  prototypeAccessors.value.get = function () {
    return this.$input.value
  };

  prototypeAccessors.value.set = function (value) {
    this.$input.value = value;
    this._value = value;
    this._targetObject[this._targetProperty] = value;
    this.emit('update', this.sliderValue);
  };

  Object.defineProperties( Text.prototype, prototypeAccessors );

  return Text;
}(Component));

__$styleInject(".guigui-select-label {\n  font-size: 12px;\n  line-height: 18px;\n  font-style: italic;\n  text-align: center;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  float: left;\n  width: calc(31.5% - 20px);\n  padding: 0px 5px;\n  margin-right: 10px;\n}.guigui-select select {\n  width: calc(68.5% - 10px);\n  background: #22252B;\n  color: #3D77EB;\n  line-height: 12px;\n  box-sizing: content-box;\n}\n\n.guigui-select {\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n}\n\n.guigui-select select {\n  border: none;\n  -webkit-appearance: none;\n     -moz-appearance: none;\n          appearance: none;\n  padding: 3px 5px;\n  border-radius: 0;\n  top: -1px;\n  position: relative;\n  background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGhlaWdodD0iNTEycHgiIGZpbGw9IiMzRDc3RUIiIGlkPSJMYXllcl8xIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgd2lkdGg9IjUxMnB4IiB4bWw6c3BhY2U9InByZXNlcnZlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48cGF0aCBkPSJNOTguOSwxODQuN2wxLjgsMi4xbDEzNiwxNTYuNWM0LjYsNS4zLDExLjUsOC42LDE5LjIsOC42YzcuNywwLDE0LjYtMy40LDE5LjItOC42TDQxMSwxODcuMWwyLjMtMi42ICBjMS43LTIuNSwyLjctNS41LDIuNy04LjdjMC04LjctNy40LTE1LjgtMTYuNi0xNS44djBIMTEyLjZ2MGMtOS4yLDAtMTYuNiw3LjEtMTYuNiwxNS44Qzk2LDE3OS4xLDk3LjEsMTgyLjIsOTguOSwxODQuN3oiLz48L3N2Zz4=);\n  background-repeat: no-repeat;\n  background-size: 14px 14px;\n  background-position: calc(100% - 2px) center;\n}\n\n.guigui-select select:focus {\n  outline: none;\n}\n\n.guigui-select select::-moz-focus-inner {\n  border: 0;\n}\n\n@-moz-document url-prefix() {\n  .guigui-select select {\n    padding: 1px 5px;\n    top: -3px;\n  }\n}\n",undefined);

var Select = (function (Component$$1) {
  function Select (object, property, array, options) {
    if ( options === void 0 ) { options = {}; }

    var label = options.label; if ( label === void 0 ) { label = property; }

    var currentValue = object[property];

    if (!isArray(array)) {
      throw new Error('Select cannot work without an array')
    }

    array = array.map(function (item) {
      if (isObject(item) && item.name && item.value) { return item }
      else { return {name: item, value: item} }
    });

    var selectOptions = array
      .map(function (ref) {
        var value = ref.value;
        var name = ref.name;

        var selected = value === currentValue ? 'selected' : '';
        return ("<option " + selected + " value=\"" + value + "\">" + name + "</option>")
      })
      .join('');
    var domString = "\n      <div class=\"guigui-select-label\">" + label + "</div>\n      <select>\n        " + selectOptions + "\n      </select>\n    ";

    Component$$1.call(this, object, property, {classNames: ['guigui-select']}, domString);

    this.onSelectChange = this.onSelectChange.bind(this);

    this.isSelect = true;
    this.$select = this.$el.querySelector('select');
    this.value = currentValue;
    this.$select.addEventListener('change', this.onSelectChange);
  }

  if ( Component$$1 ) { Select.__proto__ = Component$$1; }
  Select.prototype = Object.create( Component$$1 && Component$$1.prototype );
  Select.prototype.constructor = Select;

  var prototypeAccessors = { value: { configurable: true } };

  Select.prototype.onSelectChange = function onSelectChange (e) {
    this.value = this.$select.value;
  };

  prototypeAccessors.value.get = function () {
    return this.$select.value
  };

  prototypeAccessors.value.set = function (value) {
    this.$select.value = value;
    this._value = value;
    this._targetObject[this._targetProperty] = value;
    this.emit('update', this.sliderValue);
  };

  Object.defineProperties( Select.prototype, prototypeAccessors );

  return Select;
}(Component));

// Components
function createComponent (object, property, array, options) {
  var target = object[property];

  if (array && isArray(array)) {
    return new Select(object, property, array, options)
  } else {
    options = array || {};
  }

  if (isBoolean(target)) { return new Toggler(object, property, options) }
  if (isNumber(target)) { return new Slider(object, property, options) }
  if (isFunction(target)) { return new Launcher(object, property, options) }
  return new Text(object, property, options)
}

__$styleInject(".guigui-colorpicker-label {\n  font-size: 12px;\n  line-height: 18px;\n  font-style: italic;\n  text-align: center;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  float: left;\n  width: calc(31.5% - 20px);\n  padding: 0px 5px;\n  margin-right: 10px;\n}\n\n.guigui-colorpicker {\n  clear: both;\n}\n\n.guigui-colorpicker-state {\n  background: rgb(184, 144, 137);\n  width: calc(68.5% - 8px);\n  height: 10px;\n  float: left;\n  padding: 4px;\n  box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 8px inset, rgba(255, 255, 255, 0.0980392) 0px -1px 1px inset;\n}\n\n.guigui-colorpicker-text {\n  color: black;\n  background: none;\n  font-size: 11px;\n  line-height: 12px;\n  font-family: Arial;\n  margin: 0px;\n  border: 0px;\n  padding: 3px 0px;\n  display: inline-block;\n  vertical-align: middle;\n  white-space: normal;\n  box-sizing: content-box;\n  outline: 0px;\n  position: relative;\n  top: -4px;\n}\n\n@-moz-document url-prefix() {\n  .guigui-colorpicker-text {\n    top: -6px;\n  }\n}\n\n.guigui-colorpicker .Scp {\n  padding: 5px;\n  background: rgb(48, 52, 60);\n  width: 175px;\n  height: 150px;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  position: absolute;\n  z-index: 999;\n  top: 26px;\n  right: 4px;\n  display: none;\n  box-shadow: rgba(255, 255, 255, 0.0588235) 0px 1px 1px inset;\n  border: 1px solid rgb(29, 31, 36);\n}\n\n.guigui-colorpicker .Scp-saturation {\n  background: linear-gradient(to right, rgb(255, 255, 255) 0%, rgb(255, 38, 0) 100%);\n  position: relative;\n  width: calc(100% - 25px);\n  height: 100%;\n  float: left;\n  margin-right: 5px;\n}\n\n.guigui-colorpicker .Scp-hue {\n  width: 20px;\n  height: 100%;\n  position: relative;\n  float: left;\n  background: linear-gradient(rgb(255, 0, 0) 0%, rgb(255, 0, 255) 17%, rgb(0, 0, 255) 34%, rgb(0, 255, 255) 50%, rgb(0, 255, 0) 67%, rgb(255, 255, 0) 84%, rgb(255, 0, 0) 100%);\n}\n\n.guigui-colorpicker .Scp-brightness {\n  width: 100%;\n  height: 100%;\n  background: linear-gradient(rgba(255, 255, 255, 0), rgb(0, 0, 0));\n}\n\n.guigui-colorpicker .Scp-sbSelector {\n  -webkit-transform: translateX(38.3152px) translateY(41.7647px);\n          transform: translateX(38.3152px) translateY(41.7647px);\n  background: rgb(184, 144, 137);\n  border: 2px solid rgb(0, 0, 0);\n  position: absolute;\n  width: 14px;\n  height: 14px;\n  border-radius: 10px;\n  top: -7px;\n  left: -7px;\n  box-sizing: border-box;\n  z-index: 10;\n}\n\n.guigui-colorpicker .Scp-hSelector {\n  -webkit-transform: translateY(146.277px);\n          transform: translateY(146.277px);\n  position: absolute;\n  background: rgb(255, 255, 255);\n  border-bottom: 1px solid rgb(0, 0, 0);\n  right: -3px;\n  width: 10px;\n  height: 2px;\n}\n\n.guigui-colorpicker--opened .Scp {\n  display: block;\n}",undefined);

var Colorpicker = (function (Component$$1) {
  function Colorpicker (object, property, options) {
    if ( options === void 0 ) { options = {}; }

    var label = options.label; if ( label === void 0 ) { label = property; }

    var domString = "\n      <div class=\"guigui-colorpicker-label\">" + label + "</div>\n      <div class=\"guigui-colorpicker-state\">\n        <input type=\"text\" class=\"guigui-colorpicker-text\" value=\"#FF0000\"/>\n      </div>\n    ";

    Component$$1.call(this, object, property, {classNames: ['guigui-colorpicker']}, domString);

    this.onColorPickerClick = this.onColorPickerClick.bind(this);
    this.onColorPickerUpdate = this.onColorPickerUpdate.bind(this);
    this.onPickerMouseLeave = this.onPickerMouseLeave.bind(this);
    this.onFinishedInteracting = this.onFinishedInteracting.bind(this);
    this.onTextChange = this.onTextChange.bind(this);

    var value = object[property];

    this.isThreejsColor = isThreejsColor(value);
    this.initialColorFormat = isNumber(value) || this.isThreejsColor ? 'number' : 'string';
    this.isOpened = false;

    this.$text = this.$el.querySelector('.guigui-colorpicker-text');
    this.$state = this.$el.querySelector('.guigui-colorpicker-state');

    this.colorPicker = new SimpleColorPicker({
      el: this.$el,
      color: (
      this.isThreejsColor
        ? this._targetObject[this._targetProperty].getHex()
        : this._targetObject[this._targetProperty]
      ),
      background: '#30343c'
    });
    this.$picker = this.colorPicker.$el;
    this.colorPicker.onChange(this.onColorPickerUpdate);

    this.$text.value = this.colorPicker.color.toHexString();

    this.onTextChange();

    this.$state.addEventListener('click', this.onColorPickerClick);
    this.$text.addEventListener('change', this.onTextChange);
  }

  if ( Component$$1 ) { Colorpicker.__proto__ = Component$$1; }
  Colorpicker.prototype = Object.create( Component$$1 && Component$$1.prototype );
  Colorpicker.prototype.constructor = Colorpicker;

  Colorpicker.prototype.remove = function remove () {
    this.$state.removeEventListener('click', this.onColorPickerClick);
    this.$picker.removeEventListener('mouseleave', this.onPickerMouseLeave);
    window.removeEventListener('mouseup', this.onFinishedInteracting);
    Component$$1.prototype.remove.call(this);
  };

  Colorpicker.prototype.getColor = function getColor () {
    if (this.initialColorFormat === 'number') {
      return this.colorPicker.getHexNumber()
    }
    return this.colorPicker.getHexString()
  };

  Colorpicker.prototype._closePicker = function _closePicker () {
    this.isOpened = false;
    removeClass(this.$el, 'guigui-colorpicker--opened');
    this.onEndInteraction();
  };

  Colorpicker.prototype.invalidate = function invalidate () {
    this.colorPicker.setColor(this._value);
    this.onColorPickerUpdate();
  };

  /* =============================================================================
    Events
  ============================================================================= */
  Colorpicker.prototype.onTextChange = function onTextChange () {
    this.colorPicker.setColor(this.$text.value);
  };

  Colorpicker.prototype.onColorPickerClick = function onColorPickerClick () {
    this.isOpened = !this.isOpened;
    if (this.isOpened) {
      this.onStartInteraction();
      addClass(this.$el, 'guigui-colorpicker--opened');
      this.$picker.addEventListener('mouseleave', this.onPickerMouseLeave);
    } else {
      this._closePicker();
    }
  };

  Colorpicker.prototype.onPickerMouseLeave = function onPickerMouseLeave () {
    this.$picker.removeEventListener('mouseleave', this.onPickerMouseLeave);
    if (this.colorPicker.choosing) {
      window.addEventListener('mouseup', this.onFinishedInteracting);
    } else {
      this._closePicker();
    }
  };

  Colorpicker.prototype.onFinishedInteracting = function onFinishedInteracting () {
    window.removeEventListener('mouseup', this.onFinishedInteracting);
    this._closePicker();
  };

  Colorpicker.prototype.onColorPickerUpdate = function onColorPickerUpdate () {
    var hexString = this.colorPicker.getHexString();
    var formatedColor = this.getColor();
    this._value = formatedColor;
    this.$state.style.background = hexString;
    this.$text.value = hexString;
    this.$text.style.color = this.colorPicker.isDark() ? 'white' : 'black';
    if (this.isThreejsColor) {
      this._targetObject[this._targetProperty].setHex(formatedColor);
    } else {
      this._targetObject[this._targetProperty] = formatedColor;
    }
    this.emit('update', formatedColor);
  };

  return Colorpicker;
}(Component));

var Folder = (function (Renderable$$1) {
  function Folder (folderName, options, domString) {
    if ( domString === void 0 ) { domString = undefined; }

    options.classNames = options.classNames || ['guigui-folder'];

    domString = domString ||
      ("\n      <div class=\"guigui-folder-head\">\n        <h2 class=\"guigui-folder-label\">" + folderName + "</h2>\n        <div class=\"guigui-folder-toggle\">\n          <div class=\"guigui-folder-toggle-line\"></div>\n          <div class=\"guigui-folder-toggle-line\"></div>\n        </div>\n      </div>\n      <div class=\"guigui-folder-content\"></div>\n    ");

    Renderable$$1.call(this, options, domString);

    this.toggle = this.toggle.bind(this);

    this.folderName = folderName;
    this.components = [];
    this.folders = [];

    this.$content = this.$el.querySelector('.' + options.classNames[0] + '-content');
    this.$head = this.$el.querySelector('.' + options.classNames[0] + '-head');
    this.$head.addEventListener('click', this.toggle);
  }

  if ( Renderable$$1 ) { Folder.__proto__ = Renderable$$1; }
  Folder.prototype = Object.create( Renderable$$1 && Renderable$$1.prototype );
  Folder.prototype.constructor = Folder;

  Folder.prototype.toggle = function toggle () {
    toggleClass(this.$el, this.classNames[0] + '--opened');
  };

  Folder.prototype.close = function close () {
    removeClass(this.$el, this.classNames[0] + '--opened');
  };

  Folder.prototype.open = function open () {
    addClass(this.$el, this.classNames[0] + '--opened');
  };

  Folder.prototype.addFolder = function addFolder (name, options) {
    if ( options === void 0 ) { options = {}; }

    var folder = new Folder(name, options);
    this.folders.push(folder);
    folder.appendTo(this.$content);
    return folder
  };

  Folder.prototype.add = function add (object, property, array, options) {
    var component = createComponent(object, property, array, options);
    this.components.push(component);
    component.appendTo(this.$content);
    return component
  };

  Folder.prototype.addColor = function addColor (object, property, options) {
    var component = new Colorpicker(object, property, options);
    this.components.push(component);
    component.appendTo(this.$content);
    return component
  };

  Folder.prototype.addColorPicker = function addColorPicker () {
    var arguments$1 = arguments;

    var args = [], len = arguments.length;
    while ( len-- ) { args[ len ] = arguments$1[ len ]; }

    return (ref = this).addColor.apply(ref, args)
    var ref;
  };

  return Folder;
}(Renderable));

var Panel = (function (Folder$$1) {
  function Panel (name) {
    if ( name === void 0 ) { name = ''; }

    var domString = "\n      <div class=\"guigui-panel-head\">\n        <h2 class=\"guigui-panel-label\">" + name + "</h2>\n      </div>\n      <div class=\"guigui-panel-content\"></div>\n    ";
    Folder$$1.call(
      this, name,
      {
        classNames: ['guigui-panel', 'guigui-panel--opened']
      },
      domString
    );
  }

  if ( Folder$$1 ) { Panel.__proto__ = Folder$$1; }
  Panel.prototype = Object.create( Folder$$1 && Folder$$1.prototype );
  Panel.prototype.constructor = Panel;

  return Panel;
}(Folder));

var CloseButton = (function (Renderable$$1) {
  function CloseButton ($container, containerClass) {
    var domString = "\n      <div class=\"guigui-toggle-line\"></div>\n      <div class=\"guigui-toggle-line\"></div>\n    ";

    Renderable$$1.call(
      this, {
        classNames: ['guigui-toggle']
      },
      domString
    );

    this.toggle = this.toggle.bind(this);
    this.$container = $container;
    this.containerClass = containerClass;

    this.$el.addEventListener('click', this.toggle);
  }

  if ( Renderable$$1 ) { CloseButton.__proto__ = Renderable$$1; }
  CloseButton.prototype = Object.create( Renderable$$1 && Renderable$$1.prototype );
  CloseButton.prototype.constructor = CloseButton;

  CloseButton.prototype.toggle = function toggle () {
    toggleClass(this.$el, this.classNames[0] + '--opened');
    toggleClass(this.$container, this.containerClass + '--opened');
  };

  return CloseButton;
}(Renderable));

__$styleInject(".guigui-toggle--opened .guigui-toggle-line {\n    -webkit-transform: translate3d(-50%, -50%, 1px) rotate(45deg);\n            transform: translate3d(-50%, -50%, 1px) rotate(45deg);\n}.guigui-toggle--opened .guigui-toggle-line:first-child {\n    -webkit-transform: translate3d(-50%, -50%, 1px) rotate(135deg);\n            transform: translate3d(-50%, -50%, 1px) rotate(135deg);\n}.guigui-panel-label {\n    font-size: 14px;\n    line-height: 21px;\n}.guigui-folder-label {\n    font-size: 13px;\n}.guigui-folder--opened > .guigui-folder-content {\n    display: block;\n}.guigui-folder-label {\n    margin: 0;\n    text-align: center;\n    -webkit-user-select: none;\n       -moz-user-select: none;\n        -ms-user-select: none;\n            user-select: none;\n}.guigui-panel--opened > .guigui-panel-content {\n    display: block;\n}.guigui-panel, .guigui-folder, .guigui-component, .guigui-toggle {\n  border: 1px solid #111;\n  box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.06);\n  background: linear-gradient(rgba(255, 255, 255, 0.0196078), rgba(255, 255, 255, 0)) rgb(41, 44, 51);\n}\n\n.guigui {\n  position: absolute;\n  z-index: 999;\n  top: 10px;\n  right: 10px;\n  width: calc(100% - 20px);\n  color: white;\n}\n\n.guigui-container {\n  margin-top: 30px;\n  display: none;\n}\n\n.guigui-container--opened {\n  display: block;\n}\n\n.guigui-panel, .guigui-folder, .guigui-component {\n  box-sizing: border-box;\n  padding: 5px;\n  position: relative;\n}\n\n.guigui-panel, .guigui-folder {\n  background: linear-gradient(rgba(255, 255, 255, 0.0196078), rgba(255, 255, 255, 0)) rgb(34, 37, 43);\n}\n\n.guigui-panel {\n  width: 300px;\n  float: right;\n  margin: 10px 0 0 10px;\n}\n\n.guigui-panel > .guigui-panel-content {\n    display: none;\n}\n\n.guigui-panel-label {\n    margin: 0;\n    text-align: center;\n    width: 100%;\n    -webkit-user-select: none;\n       -moz-user-select: none;\n        -ms-user-select: none;\n            user-select: none;\n}\n\n.guigui-folder {\n  margin: 5px 0;\n}\n\n.guigui-folder > .guigui-folder-content {\n    margin-top: 5px;\n    display: none;\n}\n\n.guigui-folder-head {\n    padding: 1px 0;\n}\n\n.guigui-component {\n  margin-top: 3px;\n  height: 17px;\n  box-sizing: content-box;\n}\n\n.guigui-component + .guigui-component {\n  margin-top: -1px;\n}\n\n.guigui {\n  font-family: Arial, sans-serif;\n  color: rgb(187, 189, 192)\n}\n\n.guigui-folder-label, .guigui-panel-label {   \n    font-weight: normal;\n}\n.guigui-toggle {\n  position: absolute;\n  top: 0px;\n  right: 0px;\n  width: 30px;\n  height: 30px\n}\n.guigui-toggle-line {\n    transition: -webkit-transform 0.5s cubic-bezier(0.190, 1.000, 0.220, 1.000);\n    transition: transform 0.5s cubic-bezier(0.190, 1.000, 0.220, 1.000);\n    transition: transform 0.5s cubic-bezier(0.190, 1.000, 0.220, 1.000), -webkit-transform 0.5s cubic-bezier(0.190, 1.000, 0.220, 1.000);\n}\n.guigui-toggle, .guigui-panel-head, .guigui-folder-head {\n  cursor: pointer;\n}\n.guigui-folder-toggle, .guigui-panel-toggle {\n  position: absolute;\n}\n.guigui-panel-toggle {\n  top: 11px;\n  right: 11px;\n  width: 14px;\n  height: 14px;\n}\n.guigui-folder-toggle {\n  top: 7px;\n  right: 7px;\n  width: 12px;\n  height: 12px;\n}\n.guigui-toggle-line, .guigui-folder-toggle-line, .guigui-panel-toggle-line {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate3d(-50%, -50%, 1px);\n          transform: translate3d(-50%, -50%, 1px);\n  width: 2px;\n  height: 100%;\n  background: rgb(61, 119, 235)\n}\n.guigui-toggle-line:first-child, .guigui-folder-toggle-line:first-child, .guigui-panel-toggle-line:first-child {\n    -webkit-transform: translate3d(-50%, -50%, 1px) rotate(90deg);\n            transform: translate3d(-50%, -50%, 1px) rotate(90deg);\n}\n.guigui-toggle-line {\n  height: 60%;\n}\n.guigui-folder > .guigui-folder-head .guigui-folder-toggle-line:last-child{\n  display: block;\n}\n.guigui-folder--opened > .guigui-folder-head .guigui-folder-toggle-line:last-child{\n  display: none;\n}",undefined);

function addPanel (name) {
  if ( name === void 0 ) { name = ''; }

  if (name === '') {
    name = 'Settings';
    if (panels.length > 0) {
      name += ' ' + (panels.length + 1);
    }
  }
  var panel = new Panel(name);
  panels.push(panel);
  panel.appendTo($content);
  return panel
}

function add () {
  var arguments$1 = arguments;

  var args = [], len = arguments.length;
  while ( len-- ) { args[ len ] = arguments$1[ len ]; }

  return (ref = getFirstPanel()).add.apply(ref, args)
  var ref;
}

function addColor () {
  var arguments$1 = arguments;

  var args = [], len = arguments.length;
  while ( len-- ) { args[ len ] = arguments$1[ len ]; }

  return (ref = getFirstPanel()).addColor.apply(ref, args)
  var ref;
}

function addFolder () {
  var arguments$1 = arguments;

  var args = [], len = arguments.length;
  while ( len-- ) { args[ len ] = arguments$1[ len ]; }

  return (ref = getFirstPanel()).addFolder.apply(ref, args)
  var ref;
}

function addColorPicker () {
  var arguments$1 = arguments;

  var args = [], len = arguments.length;
  while ( len-- ) { args[ len ] = arguments$1[ len ]; }

  return (ref = getFirstPanel()).addColor.apply(ref, args)
  var ref;
}

function getPanel (index) {
  if (index < panels.length) {
    return panels[index]
  }
  return null
}

function getFirstPanel () {
  return getPanel(0) || addPanel()
}

var panels = [];
var $el = createElement('div', 'guigui');
var $content = createElement('div', 'guigui-container');
var closeButton = new CloseButton($content, 'guigui-container');

console.log('GUIGUI');

appendElement($el);
appendElement($content, $el);
closeButton.appendTo($el);

var guigui = {
  addPanel: addPanel,
  addFolder: addFolder,
  add: add,
  addColor: addColor,
  addColorPicker: addColorPicker,
  getPanel: getPanel
};

var $title = document.querySelector('h1');
var $subject = document.querySelector('.subject');
$subject.x = 0;
$subject.y = 0;
$subject.visible = true;
$subject.shape = 'square';

function moveSubject () {
  $subject.style.transform = "translate(" + ($subject.x) + "px, " + ($subject.y) + "px)";
}

function toggleVisible (visible) {
  $subject.style.display = visible ? 'block' : 'none';
}

function changeShape () {
  $subject.style.borderRadius = $subject.shape === 'circle' ? '50px' : '0px';
}

$subject.wizz = function () {
  $subject.style.top = ((Math.random() * 80 + 10)) + "%";
  $subject.style.left = ((Math.random() * 80 + 10)) + "%";
};

guigui.add($title, 'innerHTML', {label: 'title'});
guigui.add($subject, 'x', {min: -200, max: 200, step: 1}).on('update', moveSubject);
guigui.add($subject, 'y', {min: -200, max: 200, step: 1}).on('update', moveSubject);
guigui.add($subject, 'shape', ['square', 'circle']).on('update', changeShape);
guigui.addColorPicker($subject.style, 'background', {label: 'color'});
guigui.add($subject, 'visible').on('update', toggleVisible);
guigui.add($subject, 'wizz');
