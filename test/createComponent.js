import test from 'ava';
import createComponent from 'createComponent';

const obj = {
  bool: true,
  num: 12,
  str: 'foo',
  func: () => {}
};
const toggler = createComponent(obj, 'bool');
const slider = createComponent(obj, 'num');
const text = createComponent(obj, 'str');
const launcher = createComponent(obj, 'func');
const select = createComponent(obj, 'num', [12, 0, 1]);

test('createComponent Toggler', t => {
  t.true(toggler.isToggler);

  t.falsy(toggler.isSlider);
  t.falsy(toggler.isText);
  t.falsy(toggler.isLauncher);
  t.falsy(toggler.isSelect);
});

test('createComponent Slider', t => {
  t.true(slider.isSlider);

  t.falsy(slider.isToggler);
  t.falsy(slider.isText);
  t.falsy(slider.isLauncher);
  t.falsy(slider.isSelect);
});

test('createComponent Text', t => {
  t.true(text.isText);

  t.falsy(text.isToggler);
  t.falsy(text.isSlider);
  t.falsy(text.isLauncher);
  t.falsy(text.isSelect);
});

test('createComponent Launcher', t => {
  t.true(launcher.isLauncher);

  t.falsy(launcher.isToggler);
  t.falsy(launcher.isSlider);
  t.falsy(launcher.isText);
  t.falsy(launcher.isSelect);
});

test('createComponent Select', t => {
  t.true(select.isSelect);

  t.falsy(select.isLauncher);
  t.falsy(select.isToggler);
  t.falsy(select.isSlider);
  t.falsy(select.isText);
});
