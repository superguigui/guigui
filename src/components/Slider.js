'use strict';

var bindAll = require('lodash.bindall');
var transform = require('dom-transform');
var numeral = require('numeral');
var classes = require('dom-classes');
var Component = require('../base/Component');
var offset = require('../utils/dom/offset');
var clamp = require('../utils/maths/clamp');
var toPrecision = require('../utils/maths/toPrecision');


function Slider(object, property, options) {
  Component.call(this);

  // options
  options = options || {};
  this.targetObject = object;
  this.targetProperty = property;
  this.min = options.min || 0;
  this.max = options.max || 100;
  this.step = options.step || 1;
  this.labelText = options.label || property;

  // const (lol)
  this.textValueSlowingFactor = 0.1;

  // bind methods to scope (only if needed)
  bindAll(this, 'onSliderStartDrag', 'onSliderStopDrag', 'onSliderDrag', 'onTextStartDrag', 'onTextStopDrag', 'onTextDrag', 'onTextKeyDown', 'onTextChange');

  // dom template of the component
  this.template = [
    '<div class="label">' + this.labelText + '</div>',
    '<div class="container">',
      '<div class="background"></div>',
      '<div class="handle"></div>',
      '<div class="indice min">' + this.min + '</div>',
      '<div class="indice max">' + this.max + '</div>',
    '</div>',
    '<input type="text" class="value" value="0"/>'
  ].join('\n');

  // manage dom
  classes.add(this.$el, 'slider');
  this.$el.innerHTML = this.template;

  this.$container = this.$el.querySelector('.container');
  this.$handle = this.$el.querySelector('.handle');
  this.$background = this.$el.querySelector('.background');
  this.$value = this.$el.querySelector('.value');

  // create event listeners
  this.$container.addEventListener('mousedown', this.onSliderStartDrag);
  this.$value.addEventListener('mousedown', this.onTextStartDrag);
  this.$value.addEventListener('keydown', this.onTextKeyDown);
  this.$value.addEventListener('change', this.onTextChange);

  // set initial value
  this.value = this.targetObject[this.targetProperty];
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
  this.onSliderDrag(e);
  window.addEventListener('mouseup', this.onSliderStopDrag);
  window.addEventListener('mousemove', this.onSliderDrag);
  e.preventDefault();
};

Slider.prototype.onSliderStopDrag = function() {
  window.removeEventListener('mouseup', this.onSliderStopDrag);
  window.removeEventListener('mousemove', this.onSliderDrag);
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
  this.targetObject[this.targetProperty] = this.sliderValue;
  return this;
};

Slider.prototype.updateText = function() {
  this.$value.value = numeral(this.sliderValue).format(this.step.toString());
  return this;
};

Slider.prototype.updateSlider = function() {
  transform(this.$handle, {
    scaleX: (1 - (this.sliderValue - this.min) / (this.max - this.min))
  });
  return this;
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
      this.updateTarget().updateSlider().updateText();
      this.emit('update', this.sliderValue);
    }
  }
});

module.exports = Slider;
