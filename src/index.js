var ComponentContainer = require('./base/ComponentContainer');
var Folder = require('./base/Folder');
var css = require('./utils/styles/css');
var guiguiStyle = require('./styles/guigui');
var computeCloseStyle = require('./styles/close');
var resizeStyle = require('./styles/resize');
var variables = require('./styles/variables');
var isNumber = require('./utils/is-number');

/**
 * Creates a gui container that you can add components and folders to
 */
function Guigui(options) {
  ComponentContainer.call(this);

  options = options || {};

  this.theme = variables[options.theme] !== undefined ? options.theme : 'dark';
  this.topPosition = options.top || 10;
  this.rightPosition = options.right || 10;
  this.leftPosition = options.left || 'auto';
  this.closeButtonPosition = {right: 0, left: 'auto'};
  this.resizePosition = {right: 'auto', left: '-5'};
  this.alignedToLeft = false;
  this.container = options.container || document.body;

  if (isNumber(this.topPosition)) {
    this.topPosition += 'px';
  }

  if (isNumber(this.rightPosition)) {
    this.rightPosition += 'px';
  }

  if (isNumber(this.leftPosition)) {
    this.leftPosition += 'px';
    this.closeButtonPosition.right = 'auto';
    this.closeButtonPosition.left = 0;
    this.resizePosition.left = 'auto';
    this.resizePosition.right = '-5px';
    this.alignedToLeft = true;
  }

  this.toggle = this.toggle.bind(this);
  this._onResizeStartDrag = this._onResizeStartDrag.bind(this);
  this._onResizeStopDrag = this._onResizeStopDrag.bind(this);
  this._onResizeDrag = this._onResizeDrag.bind(this);

  this.minWidth = 210;
  this.isOpened = false;
  this.folders = [];

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
  this.appendTo(this.container);

  this.$closeButton = this.$el.querySelector('.gg-closebutton');
  this.$closeButtonCross = this.$el.querySelector('.gg-closebutton-content');
  this.$content = this.$el.querySelector('.gg-maincontent');
  this.$resize = this.$el.querySelector('.gg-resizezone');

  this.$closeButton.addEventListener('click', this.toggle);
  this.$resize.addEventListener('mousedown', this._onResizeStartDrag);

  this._applyStyles();

  this.open();
}

Guigui.prototype = Object.create(ComponentContainer.prototype);
Guigui.prototype.constructor = Guigui;

/**
 * Add a folder to main gui
 * @param {string} name label for this folder
 * @return {Folder} returns the folder just created
 * @memberof Guigui
 */
Guigui.prototype.addFolder = function(name) {
  var folder = new Folder(name, this.theme);
  folder.appendTo(this.$content);
  this.folders.push(folder);
  folder._applyStyles(this.theme);
  return folder;
};

/**
 * Opens the main gui
 */
Guigui.prototype.open = function() {
  this.isOpened = true;
  css(this.$content, {display: 'block'});
  css(this.$closeButtonCross, {transform: 'rotate(45deg)'});
};

/**
 * Closes the main gui
 */
Guigui.prototype.close = function() {
  this.isOpened = false;
  css(this.$content, {display: 'none'});
  css(this.$closeButtonCross, {transform: 'rotate(0deg)'});
};

/**
 * Either closes or opens the main gui depending on current state
 */
Guigui.prototype.toggle = function() {
  if(this.isOpened) this.close();
  else this.open();
};

/**
 * Removes main gui from DOM and proceeds to destroy its child components and folders
 */
Guigui.prototype.remove = function() {
  for (var i = 0, l = this.folders.length; i < l; i++) {
    this.folders[i].remove();
  }
  this.$closeButton.removeEventListener('click', this.toggle);
  this.$resize.removeEventListener('mousedown', this._onResizeStartDrag);
  window.removeEventListener('mouseup', this._onResizeStopDrag);
  window.removeEventListener('mousemove', this._onResizeDrag);
  ComponentContainer.prototype.remove.call(this);
};

/* =============================================================================
  Events
============================================================================= */
Guigui.prototype._applyStyles = function() {
  var closeStyle = computeCloseStyle(this.theme);

  css(this.$el, guiguiStyle);
  css(this.$el, {top: this.topPosition, right: this.rightPosition, left: this.leftPosition});
  css(this.$resize, resizeStyle);
  css(this.$resize, this.resizePosition);
  css(this.$el, '.gg-head', {height: '38px'});
  css(this.$closeButton, closeStyle.main);
  css(this.$closeButton, this.closeButtonPosition);
  css(this.$closeButton, '.gg-closebutton-content', closeStyle.content);
  css(this.$closeButton, '.gg-closebutton-content--vertical', closeStyle.vertical);
  css(this.$closeButton, '.gg-closebutton-content--horizontal', closeStyle.horizontal);

  for (var i = 0, l = this.folders.length; i < l; i++) {
    this.folders[i]._applyStyles(this.theme);
  }

  ComponentContainer.prototype._applyStyles.call(this);
};

Guigui.prototype._onResizeStartDrag = function(e) {
  this.resizeStartX = e.clientX;
  this.resizeWidth = this.$el.offsetWidth;
  window.addEventListener('mouseup', this._onResizeStopDrag);
  window.addEventListener('mousemove', this._onResizeDrag);
  e.preventDefault();
};

Guigui.prototype._onResizeStopDrag = function() {
  window.removeEventListener('mouseup', this._onResizeStopDrag);
  window.removeEventListener('mousemove', this._onResizeDrag);
};

Guigui.prototype._onResizeDrag = function(e) {
  var delta = this.resizeStartX - e.clientX;
  var width = this.alignedToLeft ? this.resizeWidth - delta : this.resizeWidth + delta;
  this.$el.style.width = Math.max(this.minWidth, width) + 'px';
};

module.exports = Guigui;
