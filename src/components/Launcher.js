'use strict';

var bindAll = require('lodash.bindall');
var classes = require('dom-classes');
var Component = require('../base/Component');


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
  bindAll(this, 'onButtonClick');

  // dom template of the component
  this.template = [
    '<div class="label">' + this.labelText + '<span>()</span></div>'
  ].join('\n');

  // manage dom
  classes.add(this.$el, 'launcher');
  this.$el.innerHTML = this.template;

  // create event listeners
  this.$el.addEventListener('click', this.onButtonClick);
}

Launcher.prototype = Object.create(Component.prototype);
Launcher.prototype.constructor = Launcher;

Launcher.prototype.remove = function() {
  this.$el.removeEventListener('click', this.onButtonClick);

  Component.prototype.remove.call(this);
};

/* ============================================================================= 
  Events
============================================================================= */
Launcher.prototype.onButtonClick = function(e) {
  this.targetObject[this.targetProperty].call(this.callbackScope);
};

module.exports = Launcher;