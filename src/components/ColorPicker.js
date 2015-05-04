'use strict';

var bindAll = require('lodash.bindall');
var Component = require('../base/Component');
var classes = require('dom-classes');
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
    '<div class="gg-ColorPicker-label">' + this.labelText + '</div>',
    '<div class="gg-ColorPicker-state">',
      '<div class="gg-ColorPicker-text">#FF0000</div>',
    '</div>'
  ].join('\n');

  // manage dom
  classes.add(this.$el, 'gg-ColorPicker');
  this.$el.innerHTML = this.template;

  this.$text = this.$el.querySelector('.gg-ColorPicker-text');
  this.$state = this.$el.querySelector('.gg-ColorPicker-state');

  this.colorPicker = new SimpleColorPicker({
    el: this.$el,
    color: this.targetObject[this.targetProperty],
    background: '#30343c'
  });
  this.$picker = this.colorPicker.$el;
  this.colorPicker.onChange(this.onColorPickerUpdate);


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
  classes.remove(this.$picker, 'isOpened');
};

/* =============================================================================
  Events
============================================================================= */
ColorPicker.prototype.onColorPickerClick = function() {
  classes.toggle(this.$picker, 'isOpened');
  if(classes.has(this.$picker, 'isOpened')) {
    this.$picker.addEventListener('mouseleave', this.onPickerMouseLeave);
  }
  else {
    this.$picker.removeEventListener('mouseleave', this.onPickerMouseLeave);
  }
};

ColorPicker.prototype.onPickerMouseLeave = function() {
  this.$picker.removeEventListener('mouseleave', this.onPickerMouseLeave);
  if(this.colorPicker.choosing) {
    window.addEventListener('mouseup', this.onFinishedInteracting);
  }
  else {
    this._closePicker();
  }
};

ColorPicker.prototype.onFinishedInteracting = function() {
  window.removeEventListener('mouseup', this.onFinishedInteracting);
  this._closePicker();
};

ColorPicker.prototype.onColorPickerUpdate = function() {
  var hexString = this.colorPicker.getHexString();
  this.$state.style.background = hexString;
  this.$text.innerHTML = hexString;
  this.$text.style.color = this.colorPicker.isDark() ? 'white' : 'black';
  this.targetObject[this.targetProperty] = hexString;
  this.emit('update', hexString);
};

module.exports = ColorPicker;