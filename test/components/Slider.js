var expect = require('chai').expect;
var offset = require('../../src/utils/dom/offset');
var Slider = require('../../src/components/Slider');

describe('Slider', function() {
  var myObject = {x: 0};
  var sl = new Slider(myObject, 'x', {min: 0, max: 1, step: 0.01});

  it('can be added to dom', function() {
    sl.appendTo(document.body);
    expect(sl.$el.parentNode).to.be.ok;
  });

  it('has proper getters and setters for its value', function() {
    expect(sl.value).to.equal(0);
    sl.value = 0.5;
    expect(sl.value).to.equal(0.5);
  });

  it('is draggable horitontally (slider) to change value', function() {
    sliderDragX(sl, [0, 10000]);
    expect(sl.value).to.equal(1);
    sliderDragX(sl, [10, -100]);
    expect(sl.value).to.equal(0);
  });

  it('is draggable vertically (text) to change value', function() {
    textDragY(sl, [0, -100]);
    expect(sl.value).to.equal(0.1);
  });

  it('is editable (text) with up and down arrows', function() {
    textKeyDown(sl, 38);
    expect(sl.value).to.equal(0.11);
    textKeyDown(sl, 40);
    expect(sl.value).to.equal(0.1);
    textKeyDown(sl, 39);
    expect(sl.value).to.equal(0.1);
  });

  it('is editable (text)', function() {
    sl.$value.value = '0.2';
    sl.onTextChange();
    expect(sl.value).to.equal(0.2);

    sl.$value.value = 'some string';
    sl.onTextChange();
    expect(sl.value).to.equal(0.2);

    sl.$value.value = '12';
    sl.onTextChange();
    expect(sl.value).to.equal(1);
  });

  it('can be removed from dom', function() {
    sl.remove();
    expect(sl.$el.parentNode).to.not.be.ok;
  });

  it('can be removed even when not previously added', function() {
    var slider = new Slider(myObject, 'x');
    slider.remove();
    expect(slider.$el.parentNode).to.not.be.ok;
  });

});

/* ================================================================================ 
  Utils
================================================================================ */
function sliderDragX(slider, deltas) {
  var start = offset(slider.$handle).left;
  slider.onSliderStartDrag({clientX: deltas[0] + start, preventDefault: function() {}});
  for (var i = 1, l = deltas.length; i < l; i++) {
    slider.onSliderDrag({clientX: deltas[i] + start});
  }
  slider.onSliderStopDrag();
}

function textDragY(slider, deltas) {
  slider.onTextStartDrag({clientY: deltas[0]});
  for (var i = 1, l = deltas.length; i < l; i++) {
    slider.onTextDrag({clientY: deltas[i], preventDefault: function() {}});
  }
  slider.onTextStopDrag();
}

function textKeyDown(slider, keyCode) {
  slider.onTextKeyDown({keyCode: keyCode, preventDefault: function() {}});
}