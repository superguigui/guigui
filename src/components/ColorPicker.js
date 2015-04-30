'use strict';

var bindAll = require('lodash.bindall');
var Component = require('../base/Component');
var offset = require('../utils/dom/offset');
var clamp = require('../utils/maths/clamp');
var classes = require('dom-classes');
var transform = require('dom-transform');
var Color = require('color');
var SimpleColorPicker = require('simple-color-picker');

function ColorPicker(object, property, options) {
  Component.call(this);


  // options
  options = options || {};
  this.targetObject = object;
  this.targetProperty = property;
  this.labelText = options.label || property;
  this.callbackScope = options.scope || this.targetObject;


  // bind methods to scope (only if needed)
  bindAll(this, 'onColorPickerClick', 'onColorPickerUpdate', 'onPickerMouseLeave', 'onFinishedInteracting');

  // dom template of the component
  this.template = [
    '<div class="label">' + this.labelText + '</div>',
    '<div class="state">',
      '<div class="text">#FF0000</div>',
    '</div>'
  ].join('\n');


  // manage dom
  classes.add(this.$el, 'color-picker');
  this.$el.innerHTML = this.template;
  
  this.colorPicker = new SimpleColorPicker({
    el: this.$el,
    color: this.targetObject[this.targetProperty],
    background: '#30343c'
  });
  this.colorPicker.onChange(this.onColorPickerUpdate);

  this.$picker = this.$el.querySelector('.scp');
  this.$text = this.$el.querySelector('.text');
  this.$state = this.$el.querySelector('.state');

  // create event listeners
  this.$state.addEventListener('click', this.onColorPickerClick);
}

ColorPicker.prototype = Object.create(Component.prototype);
ColorPicker.prototype.constructor = ColorPicker;

ColorPicker.prototype.remove = function() {
  this.$state.removeEventListener('click', this.onColorPickerClick);
  this.$picker.removeEventListener('mouseleave', this.onPickerMouseLeave);
  window.removeEventListener('mouseup', this.onFinishedInteracting);

  Component.prototype.remove.call(this);
};

ColorPicker.prototype.getColor = function() {
  return this.colorPicker.color;
};

ColorPicker.prototype._closePicker = function() {
  classes.remove(this.$picker, 'opened');
};

/* ============================================================================= 
  Events
============================================================================= */
ColorPicker.prototype.onColorPickerClick = function(e) {
  classes.toggle(this.$picker, 'opened');
  if(classes.has(this.$picker, 'opened')) {
    this.$picker.addEventListener('mouseleave', this.onPickerMouseLeave);
  }
  else {
    this.$picker.removeEventListener('mouseleave', this.onPickerMouseLeave);
  }
};

ColorPicker.prototype.onPickerMouseLeave = function(e) {
  this.$picker.removeEventListener('mouseleave', this.onPickerMouseLeave);
  if(this.colorPicker.choosing) {
    window.addEventListener('mouseup', this.onFinishedInteracting);
  }
  else {
    this._closePicker();
  }
};

ColorPicker.prototype.onFinishedInteracting = function(e) {
  window.removeEventListener('mouseup', this.onFinishedInteracting);
  this._closePicker();
};

ColorPicker.prototype.onColorPickerUpdate = function(e) {
  var hexString = this.colorPicker.getHexString();
  this.$state.style.background = hexString;
  this.$text.innerHTML = hexString;
  this.$text.style.color = this.colorPicker.color.dark() ? 'white' : 'black';
  this.targetObject[this.targetProperty] = hexString;
  this.emit('update', hexString)
};

module.exports = ColorPicker;