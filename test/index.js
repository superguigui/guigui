var expect = require('chai').expect;
var Guigui = require('../src');
var classes = require('dom-classes');

require('./utils/maths');
require('./base/ComponentContainer');
require('./base/Folder');
require('./components/Slider');
require('./components/Launcher');
require('./components/Toggler');
require('./components/ColorPicker');

describe('Guigui', function() {
  var gui = new Guigui();
  var $el = document.querySelector('.Guigui');

  it('is in the DOM', function() {
    expect($el).to.equal(gui.$el);
  });

  it('contains all the necessary dom elements', function() {
    expect(gui.$content.parentNode).to.equal($el);
    expect(gui.$resize.parentNode).to.equal($el);
    expect(gui.$closeButton.parentNode.parentNode).to.equal($el);
  });

  it('is resizable', function() {
    var startWidth = $el.offsetWidth;
    resizeX(gui, [100, 90, 80]);
    expect($el.offsetWidth).to.equal(startWidth + 20);
  });

  it('has a minimum resize width', function() {
    var startWidth = $el.offsetWidth;
    resizeX(gui, [100, 1000]);
    expect($el.offsetWidth).to.equal(gui.minWidth);
  });

  it('can contain folders', function() {
    var folder1 = gui.addFolder('my first folder');
    var folder2 = gui.addFolder('my second folder');
    var $folders = $el.querySelectorAll('.Guigui .folder');
    expect($folders[0]).to.equal(folder1.$el);
    expect($folders[1]).to.equal(folder2.$el);
  });

  it('adds its component to `.main-content` rather than in itself', function() {
    var myObject = {x: 0};
    var component = gui.add(myObject, 'x');
    var $component = $el.querySelector('.Guigui .slider');
    expect($component.parentNode).to.equal(gui.$content);
  });

  it('is hideable', function() {
    gui.onToggleClick();
    expect(classes.has($el, 'opened')).to.equal(false);
    gui.onToggleClick();
    expect(classes.has($el, 'opened')).to.equal(true);
  });

  it('can be removed', function() {
    gui.remove();
    expect(gui.$el.parentNode).to.not.be.ok;
  });
});

/* ================================================================================ 
  Utils
================================================================================ */
function resizeX(gui, deltas) {
  gui.onResizeStartDrag({clientX: deltas[0], preventDefault: function() {}});
  for (var i = 1, l = deltas.length; i < l; i++) {
    gui.onResizeDrag({clientX: deltas[i]});
  }
  gui.onResizeStopDrag();
}