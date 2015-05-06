'use strict';

require('./css/style.css');

var bindAll = require('lodash.bindall');
var ComponentContainer = require('./base/ComponentContainer');
var Folder = require('./base/Folder');
var classes = require('dom-classes');

function Guigui() {
  ComponentContainer.call(this);

  this.minWidth = 210;

  bindAll(this, 'onToggleClick', 'onResizeStartDrag', 'onResizeStopDrag', 'onResizeDrag');

  this.template = [
    '<div class="head">',
      '<div class="close-button">',
        '<div class="content">',
          '<div class="vertical"></div>',
          '<div class="horizontal"></div>',
        '</div>',
      '</div>',
    '</div>',
    '<div class="main-content"></div>',
    '<div class="resize-zone"></div>'
  ].join('\n');

  this.$el.innerHTML = this.template;
  classes.add(this.$el, 'Guigui');
  classes.add(this.$el, 'opened');
  this.appendTo(document.body);

  this.$closeButton = this.$el.querySelector('.close-button');
  this.$content = this.$el.querySelector('.main-content');
  this.$resize = this.$el.querySelector('.resize-zone');

  this.$closeButton.addEventListener('click', this.onToggleClick);
  this.$resize.addEventListener('mousedown', this.onResizeStartDrag);

}

Guigui.prototype = Object.create(ComponentContainer.prototype);
Guigui.prototype.constructor = Guigui;

Guigui.prototype.addFolder = function(name) {
  var folder = new Folder(name);
  folder.appendTo(this.$content);
  return folder;
};

Guigui.prototype.onResizeStartDrag = function(e) {
  this.resizeStartX = e.clientX;
  this.resizeWidth = this.$el.offsetWidth;
  window.addEventListener('mouseup', this.onResizeStopDrag);
  window.addEventListener('mousemove', this.onResizeDrag);
  e.preventDefault();
};

Guigui.prototype.onResizeStopDrag = function() {
  window.removeEventListener('mouseup', this.onResizeStopDrag);
  window.removeEventListener('mousemove', this.onResizeDrag);
};

Guigui.prototype.onResizeDrag = function(e) {
  var delta = this.resizeStartX - e.clientX;
  var width = this.resizeWidth + delta;

  this.$el.style.width = Math.max(this.minWidth, width) + 'px';
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