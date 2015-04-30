'use strict';

var Emitter = require('component-emitter')

function Component() {
  this.$el = document.createElement('div');
  this.$el.className = 'component';
}

Emitter(Component.prototype);

Component.prototype.appendTo = function($element) {
  $element.appendChild(this.$el);
};

Component.prototype.remove = function() {
  if(this.$el.parentNode) {
    this.$el.parentNode.removeChild(this.$el);
  }
};

module.exports = Component;