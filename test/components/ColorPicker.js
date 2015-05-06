var expect = require('chai').expect;
var classes = require('dom-classes');
var offset = require('../../src/utils/dom/offset');
var ColorPicker = require('../../src/components/ColorPicker');

describe('ColorPicker', function() {
  var myObject = {color: 0xFF0000, stringColor: '#00FF00'};
  var cp = new ColorPicker(myObject, 'color');
  var cpString = new ColorPicker(myObject, 'stringColor');

  it('can be added to dom', function() {
    cp.appendTo(document.body);
    expect(cp.$el.parentNode).to.be.ok;
  });

  it('can be updated by text from keyboard', function() {
    cp.$text.value = '#0000FF';
    cp.onTextChange();
    expect(cp.getColor()).to.equal(0x0000FF);

    cp.$text.value = 'something not a color';
    cp.onTextChange();
    expect(cp.getColor()).to.equal(0x000000);
  });

  it('autodetects type (number or string) and serve correct type with getColor', function() {
    expect(cp.getColor()).to.be.a('number');
    expect(cpString.getColor()).to.be.a('string');
  });

  it('is clickable to open and close actual picker', function() {
    cp.onColorPickerClick();
    expect(classes.has(cp.$picker, 'isOpened')).to.be.ok;
    cp.onColorPickerClick();
    expect(classes.has(cp.$picker, 'isOpened')).to.not.be.ok;
  });

  it('will close when mouse gets out of colorpicker', function() {
    cp.onColorPickerClick();
    expect(classes.has(cp.$picker, 'isOpened')).to.be.ok;
    cp.onPickerMouseLeave();
    expect(classes.has(cp.$picker, 'isOpened')).to.not.be.ok;
    cp.onColorPickerClick();
  });

  it('will not close when mouse gets out of colorpicker and we are dragging in colorPicker', function() {
    var start = offset(cp.colorPicker.$saturation);
    cp.colorPicker._onSaturationMouseDown({clientX: start.left, clientY: start.top, preventDefault: function() {}});
    cp.onPickerMouseLeave();
    expect(classes.has(cp.$picker, 'isOpened')).to.be.ok;
    cp.colorPicker._onSaturationMouseUp();
    cp.onFinishedInteracting();
    expect(classes.has(cp.$picker, 'isOpened')).to.not.be.ok;
  });

  it('can be removed from dom', function() {
    cp.remove();
    expect(cp.$el.parentNode).to.not.be.ok;
  });

});
