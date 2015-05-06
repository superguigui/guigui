'use strict';

// Previous tests
require('./utils/maths');
require('./base/folder');

// What we need for this test
var test = require('tape');

// The stuff i'm testing
var Guigui = require('../src');
var Slider = require('../src/components/Slider');
var Toggle = require('../src/components/Toggler');
var Launcher = require('../src/components/Launcher');
var Folder = require('../src/base/Folder');

var gui = new Guigui();

test('Guigui.add', function(t) {
  t.plan(3);

  var myObject = {
    x: 0,
    visible: false,
    complete: function() {}
  };


  var slider = gui.add(myObject, 'x', { min: -10 });
  var toggler = gui.add(myObject, 'visible');
  var launcher = gui.add(myObject, 'complete');

  t.equal(slider.__proto__, Slider.prototype, 'add autodetect slider');
  t.equal(toggler.__proto__, Toggle.prototype, 'add autodetect toggler');
  t.equal(launcher.__proto__, Launcher.prototype, 'add autodetect launcher');
});

test('Guigui.addFolder', function(t) {
  t.plan(1);

  var folder = gui.addFolder('myFolder');

  t.equal(folder.__proto__, Folder.prototype, 'folder add to stage');
});


test('Guigui.addComponent', function(t) {
  t.plan(1);

  var myObject = {
    x: 0
  };
  var slider = gui.add(myObject, 'x', { min: -10 });

  t.ok(slider.$el.parentNode, 'component add to stage');
});

test('Guigui.remove', function(t) {
  t.plan(1);

  gui.remove();

  t.notOk(gui.$el.parentNode);
});
