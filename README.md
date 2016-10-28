[![Build Status](https://travis-ci.org/superguigui/guigui.svg?branch=master)](https://travis-ci.org/superguigui/guigui) [![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

# guigui

GUI tool in commonjs for creative coding projects. 
Inspired from dat.GUI.
Development in progress.
Check out the [demo](https://superguigui.github.io/guigui).

![Snapshot](example/snapshot.png)


## Install
```bash
npm install guigui --save
```

## Getting started
```javascript
var Gui = require('guigui');

var someObject = {
  x: 0
};

var gui = new Gui();

gui.add(someObject, 'x', {
  label: 'position', 
  min: -200, 
  max: 200, 
  step: 1
}).on('update', function(value) {
  // some stuff when slider value is updated
});
```

## Available components
Here's a list of the components you can use 

### Slider
A slider to manipulate numerical values

### Toggler
A button with a truthy and a falsy state to handle booleans. Equivalent to checkbox.

### Launcher
A button to launch a function.

### Colorpicker
To handle colors.

### Folder
A folder to put other components in.


## Motivations
This library was mainly made as an exercise, and also to fill my need for a GUI tool for creative development.
I also encountered various annoying behaviors with dat.GUI that i wished to avoid here :
* Slider value representation should ALWAYS be based on the `step` param.
* Sometimes the colorPicker of dat.GUI will become black when trying to edit the text input.
* Min and Max of slider should be displayed.

## What's next
[x] Resize
[ ] Select component
[ ] Scrolling
[ ] New positionnings (other than top right)
