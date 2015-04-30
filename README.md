[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

# gui-gui

GUI tool in commonjs for tweaking stuff. Inspired from dat.GUI, made mainly as an exercise and to answer my needs.

Development in progress, go away!

## Install
From npm but not yet, I told you to go away!

## Getting started
```javascript
var Gui = require('gui-gui');

var someObject = {
  x: 0
};

var gui = new Gui();

gui.add(someObject, 'x', {
  label: 'x', 
  min: -200, 
  max: 200, 
  step: 1
}).on('update', function(value) {
  // some stuff when slider value is updated
});
```

## Available components

### Slider
A slider to manipulate numerical values

### Toggler

### Launcher

### ColorPicker

### Select