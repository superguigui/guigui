'use strict';

var bindAll = require('lodash.bindall');
var classes = require('dom-classes');
var Component = require('../base/Component');
var css = require('../utils/styles/css');
var launcherStyle = require('../styles/components/launcher');
var variables = require('../styles/variables');


function Launcher(object, property, options) {
  Component.call(this);


  // TODO check that object.property is a function

  // options
  options = options || {};
  this.targetObject = object;
  this.targetProperty = property;
  this.labelText = options.label || property;
  this.callbackScope = options.scope || this.targetObject;


  // bind methods to scope (only if needed)
  bindAll(this, 'onButtonClick', 'onMouseDown', 'onMouseUp');

  // dom template of the component
  this.template = [
    '<div class="label">' + this.labelText + '<span>()</span></div>'
  ].join('\n');

  // manage dom
  classes.add(this.$el, 'launcher');
  this.$el.innerHTML = this.template;

  css(this.$el, launcherStyle.main);
  css(this.$el, '.label', launcherStyle.label);
  css(this.$el, 'span', launcherStyle.span);

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
  this.$el.style.background = variables.lightColor;
};

Launcher.prototype.onMouseUp = function(e) {
  this.$el.style.background = variables.backgroundMainColor;
};

module.exports = Launcher;
