var Guigui = require('../src/index.js');

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
  toto: false,
  hexColor: 0x3d77eb,
  changeSquareColor: function() {
    myObject.hexColor = Math.random() * 0xFFFFFF;
  }
};
$marker.style.background = '#3d77eb';
document.body.style.background = '#121212';

/* --------------------------
  Gui Config
*/
var gui = new Guigui({theme: 'dark'});
gui.add(myObject, 'x', {min: -200, max: 200, watch: true}).on('update', onUpdateScaleOrPosition);
gui.add(myObject, 'y', {min: -200, max: 200, step: 1, watch: true}).on('update', onUpdateScaleOrPosition);
gui.add(myObject, 'scale', {min: 0, max: 3, step: 0.1, watch: true}).on('update', onUpdateScaleOrPosition);
gui.addColorPicker(myObject, 'hexColor', {label: 'Hex Color', watch: true}).on('update', onUpdateSquareColor);
gui.add(myObject, 'toto', {watch: true});

var folder = gui.addFolder('Some Folder');
folder.add(myObject, 'changeSquareColor');
folder.addColorPicker(document.body.style, 'background', {watch: true});
folder.add(myObject, 'a', {label: 'alpha', min: 0, max: 1, step: 0.01, watch: true}).on('update', onUpdateOpacity);
folder.add(myObject, 'visible', {watch: true}).on('update', onUpdateVisibility);


// gui.remove();

function onUpdateScaleOrPosition() {
  $marker.style.transform = 'translate(' + myObject.x + 'px, ' + myObject.y + 'px) scale(' + myObject.scale + ')';
}

function onUpdateOpacity(value) {
  $marker.style.opacity = value;
}

function onUpdateVisibility(value) {
  $marker.style.display = value ? 'block' : 'none';
}

function onUpdateSquareColor(value) {
  $marker.style.background = '#' + value.toString(16);
}

function onUpdateBackground() {
  $marker.style.background = myObject.color;
}
