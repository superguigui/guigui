'use strict';

var bindAll = require('lodash.bindall');
var Component = require('../base/Component');
var classes = require('dom-classes');


function Toggler(object, property, options) {
  Component.call(this);


  // TODO check that object.property is a function

  // options
  options = options || {};
  this.targetObject = object;
  this.targetProperty = property;
  this.labelText = options.label || property;
  this.callbackScope = options.scope || this.targetObject;


  // bind methods to scope (only if needed)
  bindAll(this, 'onTogglerClick');

  // dom template of the component
  this.template = [
    '<div class="label">' + this.labelText + '</div>',
    '<div class="state">',
      '<div class="handle"></div>',
    '</div>',
  ].join('\n');

  // manage dom
  classes.add(this.$el, 'toggler');
  this.$el.innerHTML = this.template;

  if(this.targetObject[this.targetProperty] === true) {
    classes.add(this.$el, 'on');
  }

  // create event listeners
  this.$el.addEventListener('click', this.onTogglerClick);
}

Toggler.prototype = Object.create(Component.prototype);
Toggler.prototype.constructor = Toggler;

Toggler.prototype.remove = function() {
  this.$el.removeEventListener('click', this.onTogglerClick);
  Component.prototype.remove.call(this);
};

/* ============================================================================= 
  Events
============================================================================= */
Toggler.prototype.onTogglerClick = function(e) {
  this.toggleValue();
};

Toggler.prototype.toggleValue = function() {
  this.value = !this.value;
};

/* =============================================================================
  Getters Setters
============================================================================= */
Object.defineProperties(Toggler.prototype, {
  value: {
    get: function() {
      return classes.has(this.$el, 'on');
    },
    set: function(value) {
      if(value) {
        classes.add(this.$el, 'on')
      }
      else {
        classes.remove(this.$el, 'on') 
      }
      this.targetObject[this.targetProperty] = value;
      this.emit('update', value);
    }
  }
});

module.exports = Toggler;