var ComponentContainer = require('./base/ComponentContainer');
var Folder = require('./base/Folder');
var css = require('./utils/styles/css');
var guiguiStyle = require('./styles/guigui');
var closeStyle = require('./styles/close');
var resizeStyle = require('./styles/resize');

function Guigui(options) {
  ComponentContainer.call(this);

  options = options || {};

  this.minWidth = 210;

  this.toggle = this.toggle.bind(this);
  this.onResizeStartDrag = this.onResizeStartDrag.bind(this);
  this.onResizeStopDrag = this.onResizeStopDrag.bind(this);
  this.onResizeDrag = this.onResizeDrag.bind(this);

  this.template = [
    '<div class="gg-head">',
      '<div class="gg-closebutton">',
        '<div class="gg-closebutton-content">',
          '<div class="gg-closebutton-content--vertical"></div>',
          '<div class="gg-closebutton-content--horizontal"></div>',
        '</div>',
      '</div>',
    '</div>',
    '<div class="gg-maincontent"></div>',
    '<div class="gg-resizezone"></div>'
  ].join('\n');

  this.$el.innerHTML = this.template;
  this.$el.className = 'gg';
  this.appendTo(document.body);

  this.$closeButton = this.$el.querySelector('.gg-closebutton');
  this.$closeButtonCross = this.$el.querySelector('.gg-closebutton-content');
  this.$content = this.$el.querySelector('.gg-maincontent');
  this.$resize = this.$el.querySelector('.gg-resizezone');

  css(this.$el, guiguiStyle);
  css(this.$resize, resizeStyle);
  css(this.$el, '.gg-head', {height: '38px'});
  css(this.$closeButton, closeStyle.main);
  css(this.$closeButton, '.gg-closebutton-content', closeStyle.content);
  css(this.$closeButton, '.gg-closebutton-content--vertical', closeStyle.vertical);
  css(this.$closeButton, '.gg-closebutton-content--horizontal', closeStyle.horizontal);

  this.$closeButton.addEventListener('click', this.toggle);
  this.$resize.addEventListener('mousedown', this.onResizeStartDrag);

  this.open();
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

Guigui.prototype.open = function(component) {
  this.isOpened = true;
  css(this.$content, {display: 'block'});
  css(this.$closeButtonCross, {transform: 'rotate(45deg)'});
};

Guigui.prototype.close = function(component) {
  this.isOpened = false;
  css(this.$content, {display: 'none'});
  css(this.$closeButtonCross, {transform: 'rotate(0deg)'});
};

Guigui.prototype.toggle = function() {
  if(this.isOpened) this.close();
  else this.open();
};

Guigui.prototype.remove = function() {
  this.$el.parentNode.removeChild(this.$el);
  this.$closeButton.removeEventListener('click', this.toggle);
  this.$resize.removeEventListener('mousedown', this.onResizeStartDrag);
  window.removeEventListener('mouseup', this.onResizeStopDrag);
  window.removeEventListener('mousemove', this.onResizeDrag);
};

module.exports = Guigui;
