'use strict';

var test = require('tape');
var Guigui = require('../../src');

var gui = new Guigui();

test('Folder', function(t) {
  t.plan(1);

  var folder = gui.addFolder('myFolder');

  t.ok(folder.$el.parentNode, 'folder added to stage');
});