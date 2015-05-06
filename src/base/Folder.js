'use strict';

var bindAll = require('lodash.bindall');
var ComponentContainer = require('./ComponentContainer');
var classes = require('dom-classes');

function Folder(labelText, autoOpen) {
  ComponentContainer.call(this);

  // options
  this.labelText = labelText;

  classes.add(this.$el, 'folder');
  classes.add(this.$el, 'component');

  this.isOpen = autoOpen === true;

  bindAll(this, 'toggle');

  this.template = [
    '<div class="head">',
      '<div class="title">' + this.labelText + '</div>',
      '<div class="open-indicator">',
        '<div class="vertical"></div>',
        '<div class="horizontal"></div>',
      '</div>',
    '</div>',
    '<div class="content"></div>'
  ].join('\n');

  this.$el.innerHTML = this.template;

  this.$head = this.$el.querySelector('.head');
  this.$content = this.$el.querySelector('.content');

  this.$head.addEventListener('click', this.toggle);
}

Folder.prototype = Object.create(ComponentContainer.prototype);
Folder.prototype.constructor = Folder;

Folder.prototype.toggle = function(e) {
  if(this.isOpen) this.close();
  else this.open();
};

Folder.prototype.open = function() {
  this.isOpen = true;
  classes.add(this.$el, 'opened');
};

Folder.prototype.close = function() {
  this.isOpen = false;
  classes.remove(this.$el, 'opened');
};

Folder.prototype.addComponent = function(component) {
  component.appendTo(this.$content);
};

Folder.prototype.remove = function() {
  this.$head.removeEventListener('click', this.toggle);
  this.$head = null;
  this.$content = null;
  ComponentContainer.prototype.remove.call(this);
};

module.exports = Folder;