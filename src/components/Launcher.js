var Component = require('../base/Component');
var css = require('../utils/styles/css');
var computeLauncherStyle = require('../styles/components/launcher');
var variablesThemes = require('../styles/variables');


function Launcher(object, property, options) {
  Component.call(this, object, property, options);

  this.onButtonClick = this.onButtonClick.bind(this);
  this.onMouseDown = this.onMouseDown.bind(this);
  this.onMouseUp = this.onMouseUp.bind(this);

  // options
  options = options || {};
  this.targetObject = object;
  this.targetProperty = property;
  this.labelText = options.label || property;
  this.callbackScope = options.scope || this.targetObject;

  // dom template of the component
  this.template = [
    '<div class="gg-launcher-label">' + this.labelText + '<span>()</span></div>'
  ].join('\n');

  // manage dom
  this.$el.className = 'gg-launcher';
  this.$el.innerHTML = this.template;

  // create event listeners
  this.$el.addEventListener('click', this.onButtonClick);
  this.$el.addEventListener('mousedown', this.onMouseDown);
  this.$el.addEventListener('mouseup', this.onMouseUp);
}

Launcher.prototype = Object.create(Component.prototype);
Launcher.prototype.constructor = Launcher;

Launcher.prototype.remove = function() {
  this.$el.removeEventListener('click', this.onButtonClick);
  this.$el.removeEventListener('mousedown', this.onMouseDown);
  this.$el.removeEventListener('mouseup', this.onMouseUp);

  Component.prototype.remove.call(this);
};

/* =============================================================================
  Events
============================================================================= */
Launcher.prototype.onButtonClick = function(e) {
  this.targetObject[this.targetProperty].call(this.callbackScope);
};

Launcher.prototype.onMouseDown = function(e) {
  css(this.$el, {background: variablesThemes[this.theme].lightColor});
};

Launcher.prototype.onMouseUp = function(e) {
  css(this.$el, {background: variablesThemes[this.theme].backgroundMainColor});
};

Launcher.prototype._applyStyles = function(theme) {
  var launcherStyle = computeLauncherStyle(theme);

  css(this.$el, launcherStyle.main);
  css(this.$el, '.gg-launcher-label', launcherStyle.label);
  css(this.$el, 'span', launcherStyle.span);

  Component.prototype._applyStyles.call(this, theme);
};

module.exports = Launcher;
