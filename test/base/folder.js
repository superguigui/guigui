// What we need for this test
var test = require('tape');

// The stuff i'm testing
var Guigui = require('../../src');

var gui = new Guigui();

test('Folder', function(t) {
  t.plan(1);

  var folder = gui.addFolder('myFolder');

  t.ok(folder.$el.parentNode, 'folder add to stage');

  // folder.remove();
  
  // t.notOk(folder.$el.parentNode, 'folder remove to stage');
});