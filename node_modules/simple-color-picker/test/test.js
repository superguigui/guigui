'use strict';

var test = require('tape');
var SimpleColorPicker = require('../src');

/* ======================================================================
  Sub Tests
=======================================================================*/

/* ======================================================================
  Create - No options
=======================================================================*/
test('SimpleColorPicker: No options', function(t) {
  t.plan(1);

  var colorPicker = new SimpleColorPicker();
  t.ok(colorPicker, 'instanciation ok');
});


/* ======================================================================
  Create - Options
=======================================================================*/
test('SimpleColorPicker: Options sizes', function(t) {
  t.plan(4);

  var colorPicker = new SimpleColorPicker({
    width: 200,
    height: 210
  });

  t.equal(colorPicker.width, 200, 'width option');
  t.equal(colorPicker.height, 210, 'height option');
  t.equal(colorPicker.$el.style.width, '200px', 'width option style');
  t.equal(colorPicker.$el.style.height, '210px', 'height option style');
});

test('SimpleColorPicker: Options units', function(t) {
  t.plan(4);

  var colorPicker = new SimpleColorPicker({
    width: 30,
    widthUnits: 'vw',
    height: 10,
    heightUnits: 'vh'
  });

  t.equal(colorPicker.width, 30, 'width option');
  t.equal(colorPicker.height, 10, 'height option');
  t.equal(colorPicker.$el.style.width, '30vw', 'width option style');
  t.equal(colorPicker.$el.style.height, '10vh', 'height option style');
});

test('SimpleColorPicker: Options color', function(t) {
  t.plan(2);

  var colorPickerHexNumber = new SimpleColorPicker({
    color: 0x123456
  });

  t.equal(colorPickerHexNumber.getHexString(), '#123456', 'color option hex number');

  var colorPickerHexString = new SimpleColorPicker({
    color: '#0000FF'
  });

  t.equal(colorPickerHexString.getHexString(), '#0000FF', 'color option hex string');
});

test('SimpleColorPicker: Options el', function(t) {
  t.plan(1);

  var div = document.createElement('div');
  var colorPicker = new SimpleColorPicker({
    el: div
  });

  t.equal(colorPicker.$el.parentNode, div, 'el option parent');
});

test('SimpleColorPicker: Options background', function(t) {
  t.plan(2);

  var colorPickerHexNumber = new SimpleColorPicker({
    background: 0xFF0000
  });

  t.equal(colorPickerHexNumber.$el.style.background, 'rgb(255, 0, 0)', 'background option hex number');

  var colorPickerHexString = new SimpleColorPicker({
    background: '#00FF00'
  });

  t.equal(colorPickerHexString.$el.style.background, 'rgb(0, 255, 0)', 'background option hex string');
});

/* ======================================================================
  Methods
=======================================================================*/
test('SimpleColorPicker: Methods setSize', function(t) {
  t.plan(4);

  var colorPicker = new SimpleColorPicker({
    width: 101,
    height: 102
  });
  colorPicker.setSize(203, 204);

  t.equal(colorPicker.width, 203, 'width property');
  t.equal(colorPicker.height, 204, 'height property');
  t.equal(colorPicker.$el.style.width, '203px', 'width style');
  t.equal(colorPicker.$el.style.height, '204px', 'height style');
});

test('SimpleColorPicker: Methods setBackgroundColor', function(t) {
  t.plan(2);

  var colorPicker1 = new SimpleColorPicker();
  colorPicker1.setBackgroundColor(0x123456);
  t.equal(colorPicker1.$el.style.background, 'rgb(18, 52, 86)', 'setBackgroundColor with hex number');

  var colorPicker2 = new SimpleColorPicker();
  colorPicker2.setBackgroundColor('#123456');
  t.equal(colorPicker2.$el.style.background, 'rgb(18, 52, 86)', 'setBackgroundColor with hex string');
});

test('SimpleColorPicker: Methods setNoBackground', function(t) {
  t.plan(1);

  var colorPicker1 = new SimpleColorPicker({
    background: 0x123456
  });
  colorPicker1.setNoBackground();
  t.equal(colorPicker1.$el.style.background, 'none', 'setNoBackground background style');
});

test('SimpleColorPicker: Methods setColor', function(t) {
  t.plan(2);

  var colorPicker1 = new SimpleColorPicker();
  colorPicker1.setColor(0x123456);

  t.equal(colorPicker1.getHexString(), '#123456', 'setColor with hex number');

  var colorPicker2 = new SimpleColorPicker();
  colorPicker2.setColor('#123456');

  t.equal(colorPicker2.getHexString(), '#123456', 'setColor with hex string');
});

test('SimpleColorPicker: Methods getColor', function(t) {
  t.plan(2);

  var c1 = new SimpleColorPicker({
    color: '#123456'
  });
  t.equal(c1.getColor(), '#123456', 'should return hex string when hex string is inputed in setColor or option');

  var c2 = new SimpleColorPicker({
    color: 0x00FF00
  });
  t.equal(c2.getColor(), 0x00FF00, 'should return hex number when hex number is inputed in setColor or option');
});

test('SimpleColorPicker: Methods remove', function(t) {
  t.plan(2);

  var removed = false;
  function myListener() {
    if(removed) {
      t.fail('should not update value after removed');
    }
  }

  var c1 = new SimpleColorPicker();
  c1.onChange(myListener);
  c1.remove();
  removed = true;
  c1.emit('update');
  t.notOk(c1.$el.parentNode, 'should not have a parent anymore no parent inputed');

  var c2 = new SimpleColorPicker({el: document.body});
  c2.remove();
  t.notOk(c2.$el.parentNode, 'should not have a parent anymore');
});

test('SimpleColorPicker: Methods appendTo', function(t) {
  t.plan(1);

  var div = document.createElement('div');
  var colorPicker = new SimpleColorPicker();
  colorPicker.appendTo(div);
  t.equal(colorPicker.$el.parentNode, div, 'should have been appended to div');
});

test('SimpleColorPicker: Methods onChange', function(t) {
  t.plan(2);
  function myListener() {
    t.pass('callback should be called on onChange() call and when color is updated');
  }

  var c1 = new SimpleColorPicker();
  c1.onChange(myListener);
  c1._updateColor();
});

/* ======================================================================
  Getters
=======================================================================*/
test('SimpleColorPicker: Getters', function(t) {
  t.plan(8);
  var c = new SimpleColorPicker({
    color: 0xFF0000
  });

  t.equal(c.getHexString(), '#FF0000', 'getter hexString');
  t.equal(c.getHexNumber(), 0xFF0000, 'getter hexNumber');
  t.deepEqual(c.getRGB(), {r: 255, g: 0, b: 0, a: 1}, 'getter RGB object');
  t.deepEqual(c.getHSV(), {h: 0, s: 1, v: 1, a: 1}, 'getter HSV object');

  c.setColor(0x6683a0);
  t.ok(c.isDark(), 'should be dark');
  t.notOk(c.isLight(), 'should not be light');

  c.setColor(0xF6F3a0);
  t.ok(c.isLight(), 'should be light');
  t.notOk(c.isDark(), 'should not be dark');
});
