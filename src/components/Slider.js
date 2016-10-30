var Component = require('../base/Component');
var offset = require('../utils/dom/offset');
var clamp = require('../utils/maths/clamp');
var toPrecision = require('../utils/maths/toPrecision');
var format = require('../utils/maths/format');
var css = require('../utils/styles/css');
var sliderStyle = require('../styles/components/slider');

function Slider(object, property, options) {
  Component.call(this, object, property, options);

  this.onSliderStartDrag = this.onSliderStartDrag.bind(this);
  this.onSliderStopDrag = this.onSliderStopDrag.bind(this);
  this.onSliderDrag = this.onSliderDrag.bind(this);
  this.onTextStartDrag = this.onTextStartDrag.bind(this);
  this.onTextStopDrag = this.onTextStopDrag.bind(this);
  this.onTextDrag = this.onTextDrag.bind(this);
  this.onTextKeyDown = this.onTextKeyDown.bind(this);
  this.onTextChange = this.onTextChange.bind(this);

  // options
  options = options || {};
  this.min = options.min || 0;
  this.max = options.max || 100;
  this.step = options.step || 1;
  this.labelText = options.label || property;
  this.isWatched = options.watch === true;

  // const (lol)
  this.textValueSlowingFactor = 0.1;
  this.sliderValue = 0;

  // dom template of the component
  this.template = [
    '<div class="gg-slider-label">' + this.labelText + '</div>',
    '<div class="gg-slider-container">',
      '<div class="gg-slider-background"></div>',
      '<div class="gg-slider-handle"></div>',
      '<div class="gg-slider-indice gg-slider-indice--min">' + this.min + '</div>',
      '<div class="gg-slider-indice gg-slider-indice--max">' + this.max + '</div>',
    '</div>',
    '<input type="text" class="gg-slider-value" value="0"/>'
  ].join('\n');

  // manage dom
  this.$el.className = 'gg-slider';
  this.$el.innerHTML = this.template;

  this.$container = this.$el.querySelector('.gg-slider-container');
  this.$handle = this.$el.querySelector('.gg-slider-handle');
  this.$background = this.$el.querySelector('.gg-slider-background');
  this.$value = this.$el.querySelector('.gg-slider-value');

  css(this.$el, sliderStyle.main);
  css(this.$el, '.gg-slider-label', sliderStyle.label);
  css(this.$container, sliderStyle.container);
  css(this.$value, sliderStyle.value);
  css(this.$background, sliderStyle.background);
  css(this.$container, '.gg-slider-handle', sliderStyle.handle);
  css(this.$container, '.gg-slider-indice--min', sliderStyle.min);
  css(this.$container, '.gg-slider-indice--max', sliderStyle.max);

  // create event listeners
  this.$container.addEventListener('mousedown', this.onSliderStartDrag);
  this.$value.addEventListener('mousedown', this.onTextStartDrag);
  this.$value.addEventListener('keydown', this.onTextKeyDown);
  this.$value.addEventListener('change', this.onTextChange);

  // set initial value
  this.value = this._targetObject[this._targetProperty];

  if (this.isWatched) {

  }
}

Slider.prototype = Object.create(Component.prototype);
Slider.prototype.constructor = Slider;

Slider.prototype.remove = function() {
  this.$container.removeEventListener('mousedown', this.onSliderStartDrag);
  this.$value.removeEventListener('mousedown', this.onTextStartDrag);
  this.$value.removeEventListener('keydown', this.onTextKeyDown);
  this.$value.removeEventListener('change', this.onTextChange);
  this.onSliderStopDrag();
  this.onTextStopDrag();

  Component.prototype.remove.call(this);
};

/* =============================================================================
  Slider Dragging
============================================================================= */
Slider.prototype.onSliderStartDrag = function(e) {
  this.onStartInteraction();
  this.onSliderDrag(e);
  window.addEventListener('mouseup', this.onSliderStopDrag);
  window.addEventListener('mousemove', this.onSliderDrag);
  e.preventDefault();
};

Slider.prototype.onSliderStopDrag = function() {
  window.removeEventListener('mouseup', this.onSliderStopDrag);
  window.removeEventListener('mousemove', this.onSliderDrag);
  this.onEndInteraction();
};

Slider.prototype.onSliderDrag = function(e) {
  var ratio = (e.clientX - offset(this.$handle).left) / this.$background.offsetWidth;
  this.value = this.min + (this.max - this.min) * ratio;
};

/* =============================================================================
  Text Dragging
============================================================================= */
Slider.prototype.onTextStartDrag = function(e) {
  this.startY = e.clientY;
  this.startValue = this.value;
  window.addEventListener('mouseup', this.onTextStopDrag);
  window.addEventListener('mousemove', this.onTextDrag);
};

Slider.prototype.onTextStopDrag = function() {
  window.removeEventListener('mouseup', this.onTextStopDrag);
  window.removeEventListener('mousemove', this.onTextDrag);
};

Slider.prototype.onTextDrag = function(e) {
  var delta = this.startY - e.clientY;
  this.value = this.startValue + delta * this.step * this.textValueSlowingFactor;
  e.preventDefault();
};

Slider.prototype.onTextKeyDown = function(e) {
  if (e.keyCode === 38) {
    this.value += this.step;
  }
  else if (e.keyCode === 40) {
    this.value -= this.step;
  }
  else {
    return;
  }
  e.preventDefault();
};

Slider.prototype.onTextChange = function() {
  if (this.$value.value.match(/^[+-]?\d+(\.\d+)?$/g)) {
    this.value = Number(this.$value.value);
  }
  else {
    this.value = this.sliderValue;
  }
};

/* =============================================================================
  Updaters
============================================================================= */
Slider.prototype.updateTarget = function() {
  this._targetObject[this._targetProperty] = this.sliderValue;
  return this;
};

Slider.prototype.updateText = function() {
  if (!isNaN(this.sliderValue)) {
    this.$value.value = format(this.sliderValue, this.step.toString());
  }
  return this;
};

Slider.prototype.updateSlider = function() {
  css(this.$handle, {transform: 'scaleX(' + (1 - (this.sliderValue - this.min) / (this.max - this.min)) + ')'});
  return this;
};

Slider.prototype.invalidate = function() {
  Component.prototype.invalidate.call(this);
  this.value = this._value;
};

/* =============================================================================
  Getters Setters
============================================================================= */
Object.defineProperties(Slider.prototype, {
  value: {
    get: function() {
      return this.sliderValue;
    },
    set: function(value) {
      this.sliderValue = clamp(toPrecision(value, this.step), this.min, this.max);
      this._value = this.sliderValue;
      this.updateTarget().updateSlider().updateText();
      this.emit('update', this.sliderValue);
    }
  }
});

module.exports = Slider;
