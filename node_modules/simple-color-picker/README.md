[![unstable](http://badges.github.io/stability-badges/dist/unstable.svg)](http://github.com/badges/stability-badges)

# simple-color-picker

Simple Color picker in common.js.

[demo](http://superguigui.github.io/simple-color-picker)

## Installation
[![NPM](https://nodei.co/npm/simple-color-picker.png)](https://nodei.co/npm/simple-color-picker/)

## Quickstart
```javascript
var ColorPicker = require('simple-color-picker');

var colorPicker = new ColorPicker();
```

And include `simple-color-picker.css` in your html or import it in your css.

You can retrieve the current color in different formats by using these convenient methods: 
* `colorPicker.getColor(); // output depends on previously inputed color format`
* `colorPicker.getHexString(); // #FFFFFF`
* `colorPicker.getHexNumber(); // 0xFFFFFF`
* `colorPicker.getRGB(); // {r: 255, g: 255, b: 255}`
* `colorPicker.getHSV(); // {h: 0, s: 0, v: 1}`

## Options
Options you can pass to constructor in an object like so :
```javascript
var colorPicker = new ColorPicker({
  color: '#FF0000',
  background: '#454545',
  el: document.body,
  width: 200,
  height: 200
});
```

None of these options are mendatory.

### `color`
The default color that the colorpicker will display. Default is #FFFFFF. It can be a hexadecimal number or an hex String.

### `background`
The background color of the colorpicker. Default is transparent. It can be a hexadecimal number or an hex String.

### `el`
A dom node to add the colorpicker to. You can also use `colorPicker.appendTo(domNode)` afterwards if you prefer.

### `width`
Desired width of the color picker. Default is 175.

### `height`
Desired height of the color picker. Default is 150.

## Methods

### `.appendTo(domElement)`
Add the colorPicker instance to a domElement.

### `.remove()`
Removes colorpicker from is parent and kill all listeners. Call this method for proper destroy.

### `.setColor(color)`
Manually set the current color of the colorpicker. This is the method used on instantiation to convert `color` option to actual color for the colorpicker. Param can be a hexadecimal number or an hex String.

### `.setSize(width, height)`
Set size of the color picker for a given width and height. Note that a padding of 5px will be added if you chose to use the background option of the constructor.

### `.setBackgroundColor(color)`
Set the background color of the colorpicker. It also adds a 5px padding for design purpose. Param can be a hexadecimal number or an hex String.

### `.setNoBackground()`
Removes background of the colorpicker if previously set. It's no use calling this method if you didn't set the `background` option or if you didn't call `setBackgroundColor` previously.

### `.onChange(callback)`
Registers callback to the update event of the colorpicker. ColorPicker inherits from [component/emitter](https://github.com/component/emitter) so you could do the same thing by calling `colorPicker.on('update');`

### `.getColor()`
Main color getter, will return a formatted color string depending on input or a number depending on the last setColor call.

### `.getHexString()`
Returns color as css hex string (ex: '#FF0000').

### `.getHexNumber()`
Returns color as number (ex: 0xFF0000).

### `.getRGB()`
Returns color as {r: 255, g: 0, b: 0} object.

### `.getHSV()`
Returns color as {h: 100, s: 1, v: 1} object.

### `.isDark()`
Returns true if color is perceived as dark.

### `.isLight()`
Returns true if color is perceived as light.
