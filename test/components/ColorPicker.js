var expect = require('chai').expect;
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
    expect(cp.isOpened).to.be.ok;
    cp.onColorPickerClick();
    expect(cp.isOpened).to.not.be.ok;
  });

  it('will close when mouse gets out of colorpicker', function() {
    cp.onColorPickerClick();
    expect(cp.isOpened).to.be.ok;
    cp.onPickerMouseLeave();
    expect(cp.isOpened).to.not.be.ok;
    cp.onColorPickerClick();
  });

  it('will not close when mouse gets out of colorpicker and we are dragging in colorPicker', function() {
    var start = offset(cp.colorPicker.$saturation);
    cp.colorPicker._onSaturationMouseDown({clientX: start.left, clientY: start.top, preventDefault: function() {}});
    cp.onPickerMouseLeave();
    expect(cp.isOpened).to.be.ok;
    cp.colorPicker._onSaturationMouseUp();
    cp.onFinishedInteracting();
    expect(cp.isOpened).to.not.be.ok;
  });

  it('can be removed from dom', function() {
    cp.remove();
    expect(cp.$el.parentNode).to.not.be.ok;
  });

  it('can watch for value and update properly', function(done) {
    var myObject = {color: 0xFF0000, colorString: '#0000FF'};
    var cp1 = new ColorPicker(myObject, 'color', {watch: true});
    var cp2 = new ColorPicker(myObject, 'colorString', {watch: true});
    myObject.color = 0x00FF00;
    myObject.colorString = '#00FFFF';
    setTimeout(function() {
      expect(cp1._value).to.equal(0x00FF00);
      expect(cp2._value).to.equal('#00FFFF');
      cp1.remove();
      cp2.remove();
      done();
    });
  });

  it('can handle three.js colors', function() {
    var myColor = 0xFF0000;
    var myObject = {
      color: {
        isColor: true,
        getHex: function () { return myColor },
        setHex: function (value) { myColor = value }
      }
    };
    var cp1 = new ColorPicker(myObject, 'color');
    expect(cp1._value).to.equal(0xFF0000);
  });

});
