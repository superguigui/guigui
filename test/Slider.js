import test from 'ava';
import Slider from 'components/Slider';

function changeSliderValueFromInput(slider, value) {
  const input = slider.$el.querySelector('.guigui-slider-value')
  const e = new window.Event('change')
  input.value = value
  input.dispatchEvent(e)
}

function changeSliderValueFromKeyboard(slider, keyCode) {
  const input = slider.$el.querySelector('.guigui-slider-value')
  const e = new window.KeyboardEvent('keydown', {keyCode})
  input.dispatchEvent(e)
}

function startTextDrag(slider, clientY = 0) {
  const input = slider.$el.querySelector('.guigui-slider-value')
  const e = new window.MouseEvent('mousedown', {clientY})
  input.dispatchEvent(e)
}

function startBarDrag(slider, clientX = 0) {
  const bar = slider.$el.querySelector('.guigui-slider-container')
  const e = new window.MouseEvent('mousedown', {clientX})
  bar.dispatchEvent(e)
}

function drag(clientX = 0, clientY = 0) {
  const e = new window.MouseEvent('mousemove', {clientX, clientY})
  window.dispatchEvent(e)
}

function stopDrag(clientX = 0, clientY = 0) {
  const e = new window.MouseEvent('mouseup', {clientX, clientY})
  window.dispatchEvent(e)
}

test('create simple Slider', t => {
  const obj = {a: 0};
  const s1 = new Slider(obj, 'a', {min: 0, max: 1, step: 0.1, label: 'hello'});
  t.true(s1.isSlider);
  const htmllabel = s1.$el.querySelector('.guigui-slider-label').innerHTML;
  t.is(htmllabel, 'hello');
  s1.value = 1
  t.is(s1.value, 1)
  s1.value = NaN
  t.is(s1.value, 1)
});

test('manually change Slider value from input', t => {
  const obj = {a: 0};
  const s1 = new Slider(obj, 'a');
  changeSliderValueFromInput(s1, 'toto')
  t.is(s1.value, 0)
  changeSliderValueFromInput(s1, 1)
  t.is(s1.value, 1)
});

test('manually change Slider value on watch mode', t => {
  const obj = {a: 0};
  const s1 = new Slider(obj, 'a', {watch: true});
  obj.a = 1
  setTimeout(() => {
    t.is(s1.value, 1)
  }, 150)
});

test('update Slider with arrow keys (up and down)', t => {
  const obj = {a: 0};
  const s1 = new Slider(obj, 'a', {step: 0.1});
  changeSliderValueFromKeyboard(s1, 39)
  t.is(s1.value, 0)
  changeSliderValueFromKeyboard(s1, 38)
  t.is(s1.value, 0.1)
  changeSliderValueFromKeyboard(s1, 40)
  t.is(s1.value, 0)
});

test('update Slider by dragging text', t => {
  const obj = {a: 0};
  const s1 = new Slider(obj, 'a', {step: 1});
  startTextDrag(s1, 10)
  t.is(s1.startY, 10)
  drag(0, 0)
  t.is(s1.value, 1)
  stopDrag()
});

test('update Slider by dragging bar', t => {
  const obj = {a: 0};
  const s1 = new Slider(obj, 'a', {step: 1});
  s1.$background.style.width = 100 + 'px' // jsdom fix
  startBarDrag(s1, 0)
  t.is(s1.value, 0)
  drag(10, 0)
  t.is(s1.value, 10)
  stopDrag()
});

test('removing a Slider', t => {
  const obj = {a: 0};
  const s1 = new Slider(obj, 'a', {step: 1});
  s1.appendTo(document.body);
  t.is(s1.$el.parentNode, document.body);
  s1.remove();
  t.falsy(s1.$el.parentNode);
});

// test('create Select without array', t => {
//   const obj = {a: 0};
//   const error = t.throws(
//     () => {
//       const s1 = new Select(obj, 'a');
//     },
//     Error
//   );
//   t.is(error.message, 'Select cannot work without an array');
// });

// test('create Select with name value object', t => {
//   const obj = {a: 0};
//   const s1 = new Select(obj, 'a', [{name: 'zero', value: 0}, {name: 'one', value: 1}]);
//   s1.$select.value = 1;
//   s1.onSelectChange();
//   t.is(obj.a, '1');
//   t.is(s1.value, '1');
// });

// test('changes Select value', t => {
//   const obj = {a: 0};
//   const s1 = new Select(obj, 'a', [0, 1, 2]);
//   s1.$select.value = 1;
//   s1.onSelectChange();
//   t.is(obj.a, '1');
//   t.is(s1.value, '1');
// });
