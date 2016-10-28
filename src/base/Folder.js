var bindAll = require('lodash.bindall');
var ComponentContainer = require('./ComponentContainer');
var classes = require('dom-classes');
var css = require('../utils/styles/css');
var folderStyle = require('../styles/folder');
// var closeStyle = require('../styles/close');
// var resizeStyle = require('../styles/resize');

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

  css(this.$el, folderStyle.main);
  css(this.$head, folderStyle.head);
  css(this.$head, '.title', folderStyle.title);
  css(this.$content, folderStyle.content);
  css(this.$el, '.open-indicator', folderStyle.indicator);
  css(this.$el, '.vertical', folderStyle.vertical);
  css(this.$el, '.horizontal', folderStyle.horizontal);
  css(this.$el, '.component', folderStyle.component);

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
  this.$content.style.display = 'block';
};

Folder.prototype.close = function() {
  this.isOpen = false;
  classes.remove(this.$el, 'opened');
  this.$content.style.display = 'none';
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
