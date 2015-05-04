'use strict';

require('./css/style.css');

var bindAll = require('lodash.bindall');
var ComponentContainer = require('./base/ComponentContainer');
var Folder = require('./base/Folder');
var classes = require('dom-classes');

function Guigui() {
  ComponentContainer.call(this);

  bindAll(this, 'onToggleClick');

  this.template = [
    '<div class="head">',
      '<div class="close-button">',
        '<div class="content">',
          '<div class="vertical"></div>',
          '<div class="horizontal"></div>',
        '</div>',
      '</div>',
    '</div>',
    '<div class="main-content"></div>'
  ].join('\n');

  this.$el.innerHTML = this.template;
  classes.add(this.$el, 'Guigui');
  classes.add(this.$el, 'opened');
  document.body.appendChild(this.$el);

  this.$closeButton = this.$el.querySelector('.close-button');
  this.$content = this.$el.querySelector('.main-content');

  this.$closeButton.addEventListener('click', this.onToggleClick);

}

Guigui.prototype = Object.create(ComponentContainer.prototype);
Guigui.prototype.constructor = Guigui;

Guigui.prototype.addFolder = function(name) {
  var folder = new Folder(name);
  this.$content.appendChild(folder.$el);
  return folder;
};

Guigui.prototype.addComponent = function(component) {
  component.appendTo(this.$content);
};

Guigui.prototype.onToggleClick = function() {
  classes.toggle(this.$el, 'opened');
};

Guigui.prototype.remove = function() {
  this.$el.parentNode.removeChild(this.$el);
};

module.exports = Guigui;