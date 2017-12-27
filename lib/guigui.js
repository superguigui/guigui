'use strict';

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

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var SimpleColorPicker = _interopDefault(require('simple-color-picker'));

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
  var classes = [], len = arguments.length - 1;
  while ( len-- > 0 ) classes[ len ] = arguments[ len + 1 ];

  var $el = document.createElement(tagName);
  addClasses.apply(void 0, [ $el ].concat( classes ));
  return $el
}

function appendElement (element, parent) {
  if ( parent === void 0 ) parent = document.body;

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
  var classNames = [], len = arguments.length - 1;
  while ( len-- > 0 ) classNames[ len ] = arguments[ len + 1 ];

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
  if ( options === void 0 ) options = {};
  if ( domString === void 0 ) domString = '';

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
    if ( options === void 0 ) options = {};
    if ( domString === void 0 ) domString = '';

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

  if ( Renderable$$1 ) Component.__proto__ = Renderable$$1;
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
    if ( options === void 0 ) options = {};

    var label = options.label; if ( label === void 0 ) label = property;

    var domString = "\n      <div class=\"guigui-toggler-label\">" + label + "</div>\n      <div class=\"guigui-toggler-state\">\n        <div class=\"guigui-toggler-handle\"></div>\n      </div>\n    ";

    Component$$1.call(this, object, property, {classNames: ['guigui-toggler']}, domString);

    this.onTogglerClick = this.onTogglerClick.bind(this);

    this.labelText = label;
    this.isSelected = false;
    this.isToggler = true;

    this.value = this._targetObject[this._targetProperty] === true;

    this.$el.addEventListener('click', this.onTogglerClick);
  }

  if ( Component$$1 ) Toggler.__proto__ = Component$$1;
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
    if ( options === void 0 ) options = {};

    var step = options.step; if ( step === void 0 ) step = 1;
    var min = options.min; if ( min === void 0 ) min = 0;
    var max = options.max; if ( max === void 0 ) max = 100;
    var watch = options.watch; if ( watch === void 0 ) watch = false;
    var label = options.label; if ( label === void 0 ) label = property;

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

  if ( Component$$1 ) Slider.__proto__ = Component$$1;
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
    if ( options === void 0 ) options = {};

    var label = options.label; if ( label === void 0 ) label = property;
    var scope = options.scope; if ( scope === void 0 ) scope = object;

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

  if ( Component$$1 ) Launcher.__proto__ = Component$$1;
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
    if ( options === void 0 ) options = {};

    var label = options.label; if ( label === void 0 ) label = property;

    var currentValue = object[property];

    var domString = "\n      <div class=\"guigui-text-label\">" + label + "</div>\n      <input type=\"text\" class=\"guigui-text-value\" value=\"" + currentValue + "\"/>\n    ";

    Component$$1.call(this, object, property, {classNames: ['guigui-text']}, domString);

    this.onInputChange = this.onInputChange.bind(this);

    this.isText = true;
    this.$input = this.$el.querySelector('input');
    this.value = currentValue;
    this.$input.addEventListener('input', this.onInputChange);
  }

  if ( Component$$1 ) Text.__proto__ = Component$$1;
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
    if ( options === void 0 ) options = {};

    var label = options.label; if ( label === void 0 ) label = property;

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

  if ( Component$$1 ) Select.__proto__ = Component$$1;
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
    if ( options === void 0 ) options = {};

    var label = options.label; if ( label === void 0 ) label = property;

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

  if ( Component$$1 ) Colorpicker.__proto__ = Component$$1;
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
    if ( domString === void 0 ) domString = undefined;

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

  if ( Renderable$$1 ) Folder.__proto__ = Renderable$$1;
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
    if ( options === void 0 ) options = {};

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
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    return (ref = this).addColor.apply(ref, args)
    var ref;
  };

  return Folder;
}(Renderable));

var Panel = (function (Folder$$1) {
  function Panel (name) {
    if ( name === void 0 ) name = '';

    var domString = "\n      <div class=\"guigui-panel-head\">\n        <h2 class=\"guigui-panel-label\">" + name + "</h2>\n      </div>\n      <div class=\"guigui-panel-content\"></div>\n    ";
    Folder$$1.call(
      this, name,
      {
        classNames: ['guigui-panel', 'guigui-panel--opened']
      },
      domString
    );
  }

  if ( Folder$$1 ) Panel.__proto__ = Folder$$1;
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

  if ( Renderable$$1 ) CloseButton.__proto__ = Renderable$$1;
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
  if ( name === void 0 ) name = '';

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
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return (ref = getFirstPanel()).add.apply(ref, args)
  var ref;
}

function addColor () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return (ref = getFirstPanel()).addColor.apply(ref, args)
  var ref;
}

function addFolder () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return (ref = getFirstPanel()).addFolder.apply(ref, args)
  var ref;
}

function addColorPicker () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

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

appendElement($el);
appendElement($content, $el);
closeButton.appendTo($el);

module.exports = {
  addPanel: addPanel,
  addFolder: addFolder,
  add: add,
  addColor: addColor,
  addColorPicker: addColorPicker,
  getPanel: getPanel
};
