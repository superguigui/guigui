var ComponentContainer = require('./ComponentContainer');
var css = require('../utils/styles/css');
var folderStyle = require('../styles/folder');

function Folder(labelText, autoOpen) {
  ComponentContainer.call(this);

  this.toggle = this.toggle.bind(this);

  // options
  this.labelText = labelText;
  this.isOpened = autoOpen === true;

  this.$el.className = 'gg-folder';

  this.template = [
    '<div class="gg-folder-head">',
      '<div class="gg-folder-title">' + this.labelText + '</div>',
      '<div class="gg-folder-openindicator">',
        '<div class="gg-folder-openindicator--vertical"></div>',
        '<div class="gg-folder-openindicator--horizontal"></div>',
      '</div>',
    '</div>',
    '<div class="gg-folder-content"></div>'
  ].join('\n');

  this.$el.innerHTML = this.template;

  this.$head = this.$el.querySelector('.gg-folder-head');
  this.$content = this.$el.querySelector('.gg-folder-content');
  this.$vertical = this.$el.querySelector('.gg-folder-openindicator--vertical');

  css(this.$el, folderStyle.main);
  css(this.$content, folderStyle.content);
  css(this.$head, folderStyle.head);
  css(this.$head, '.gg-folder-title', folderStyle.title);
  css(this.$el, '.gg-folder-openindicator', folderStyle.indicator);
  css(this.$el, '.gg-folder-openindicator--vertical', folderStyle.vertical);
  css(this.$el, '.gg-folder-openindicator--horizontal', folderStyle.horizontal);

  this.$head.addEventListener('click', this.toggle);
}

Folder.prototype = Object.create(ComponentContainer.prototype);
Folder.prototype.constructor = Folder;

Folder.prototype.toggle = function(e) {
  if(this.isOpened) this.close();
  else this.open();
};

Folder.prototype.open = function() {
  this.isOpened = true;
  css(this.$content, {display: 'block'});
  css(this.$vertical, {display: 'none'});
};

Folder.prototype.close = function() {
  this.isOpened = false;
  css(this.$content, {display: 'none'});
  css(this.$vertical, {display: 'block'});
};

Folder.prototype.remove = function() {
  ComponentContainer.prototype.remove.call(this);
  this.$head.removeEventListener('click', this.toggle);
  this.$head = null;
  this.$content = null;
};

module.exports = Folder;
