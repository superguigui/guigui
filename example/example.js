'use strict';

// Tools
var domready = require('domready');
var raf = require('raf');
var transform = require('dom-transform');

// guigui
var Guigui = require('../src/index.js');

domready(function() {
  /* --------------------------
    Setup
  */
  var $marker = document.body.querySelector('.marker');
  var myObject = {
    x: 0,
    y: 0,
    scale: 1,
    a: 1,
    visible: true,
    hexColor: 0xFF0000,
    doSomething: function() {
      console.log('your clicked on doSomething you rascal');
    }
  };
  $marker.style.background = '#3d77eb';
  document.body.style.background = '#121212';

  /* --------------------------
    Gui Config
  */
  var gui = new Guigui();

  gui.add(myObject, 'x', {min: -200, max: 200});
  gui.add(myObject, 'y', {min: -200, max: 200, step: 1});
  gui.add(myObject, 'scale', {min: 0, max: 3, step: 0.1});

  gui.addColorPicker(myObject, 'hexColor', {
    label: 'Hex Color'
  }).on('update', function(color) {
    console.log('color', color, myObject.hexColor);
    // $marker.style.background = color;
  });

  var folder = gui.addFolder('Some Folder');
  folder.add(myObject, 'a', {
    label: 'alpha',
    min: 0,
    max: 1,
    step: 0.01
  }).on('update', function(value) {
    $marker.style.opacity = value;
  });
  folder.add(myObject, 'visible', {}).on('update', function(value) {
    $marker.style.display = value ? 'block' : 'none';
  });
  folder.add(myObject, 'doSomething');
  folder.addColorPicker(document.body.style, 'background');

  /* --------------------------
    Some creative code LOL
  */
  function update() {
    raf(update);
    $marker.style.background = myObject.color;
    transform($marker, {
      x: myObject.x,
      y: myObject.y,
      scale: myObject.scale
    });
  }
  raf(update);
});
