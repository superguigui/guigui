var SimpleColorPicker = require('simple-color-picker');
var Component = require('../base/Component');
var isNumber = require('../utils/is-number');
var css = require('../utils/styles/css');
var colorpickerStyle = require('../styles/components/colorpicker');

function ColorPicker(object, property, options) {
  Component.call(this, object, property, options);

  this.onColorPickerClick = this.onColorPickerClick.bind(this);
  this.onColorPickerUpdate = this.onColorPickerUpdate.bind(this);
  this.onPickerMouseLeave = this.onPickerMouseLeave.bind(this);
  this.onFinishedInteracting = this.onFinishedInteracting.bind(this);
  this.onTextChange = this.onTextChange.bind(this);

  // options
  options = options || {};
  this.targetObject = object;
  this.targetProperty = property;
  this.labelText = options.label || property;
  this.callbackScope = options.scope || this.targetObject;
  this.initialColorFormat = isNumber(this.targetObject[this.targetProperty]) ? 'number' : 'string';

  this.isOpened = false;

  // dom template of the component
  this.template = [
    '<div class="gg-ColorPicker-label">' + this.labelText + '</div>',
    '<div class="gg-ColorPicker-state">',
      '<input type="text" class="gg-ColorPicker-text" value="#FF0000"/>',
    '</div>'
  ].join('\n');

  // manage dom
  this.$el.className = 'gg-ColorPicker';
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

  this.$text.value = this.colorPicker.color.toHexString();


  css(this.$el, colorpickerStyle.main);
  css(this.$el, '.gg-ColorPicker-label', colorpickerStyle.label);
  css(this.$state, colorpickerStyle.state);
  css(this.$text, colorpickerStyle.text);
  css(this.$el, '.Scp', colorpickerStyle.scp.main);
  css(this.$el, '.Scp-saturation', colorpickerStyle.scp.saturation);
  css(this.$el, '.Scp-brightness', colorpickerStyle.scp.brightness);
  css(this.$el, '.Scp-sbSelector', colorpickerStyle.scp.sbSelector);
  css(this.$el, '.Scp-hue', colorpickerStyle.scp.hue);
  css(this.$el, '.Scp-hSelector', colorpickerStyle.scp.hSelector);

  this.onTextChange();

  // create event listeners
  this.$state.addEventListener('click', this.onColorPickerClick);
  this.$text.addEventListener('change', this.onTextChange);
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
  if (this.initialColorFormat === 'number') {
    return this.colorPicker.getHexNumber();
  }
  return this.colorPicker.getHexString();
};

ColorPicker.prototype._closePicker = function() {
  this.isOpened = false;
  css(this.$picker, {display: 'none'});
  this.onEndInteraction();
};

ColorPicker.prototype.invalidate = function() {
  Component.prototype.invalidate.call(this);
  this.colorPicker.setColor(this._value);
  this.onColorPickerUpdate();
};

/* =============================================================================
  Events
============================================================================= */
ColorPicker.prototype.onTextChange = function() {
  this.colorPicker.setColor(this.$text.value);
};

ColorPicker.prototype.onColorPickerClick = function() {
  this.isOpened = !this.isOpened;
  if (this.isOpened) {
    this.onStartInteraction();
    css(this.$picker, {display: 'block'});
    this.$picker.addEventListener('mouseleave', this.onPickerMouseLeave);
  }
  else {
    this._closePicker();
  }
};

ColorPicker.prototype.onPickerMouseLeave = function() {
  this.$picker.removeEventListener('mouseleave', this.onPickerMouseLeave);
  if (this.colorPicker.choosing) {
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
  var formatedColor = this.getColor();
  this._value = formatedColor;
  this.$state.style.background = hexString;
  this.$text.value = hexString;
  this.$text.style.color = this.colorPicker.isDark() ? 'white' : 'black';
  this.targetObject[this.targetProperty] = formatedColor;
  this.emit('update', formatedColor);
};

module.exports = ColorPicker;
