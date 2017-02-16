import guigui from '../app';

const object = {
  foo0: 0.5,
  foo1: 0.5,
  foo2: 0.5,
  foo3: 0.5,
  foo4: 0.5,
  oof: 0.5,
  bar: false,
  someColor: 0x00ff00,
  bubu: 'bar',
  bibi: 'zaz',
  some: 'text',
  wiz: () => {
    console.log('wiz');
  }
};
const f1 = guigui.addFolder('Some folder');
const c1 = guigui.add(object, 'foo0', {label: 'foooooowwwwwwww', max: 1, step: 0.01});
const c2a = f1.add(object, 'foo1', {step: 0.1});
const c2b = f1.add(object, 'oof');
const c2c = f1.add(object, 'foo2');
const f2 = f1.addFolder('Some other folder');
const f2b = f1.addFolder('Some other folder');
const f2c = f1.addFolder('Some other folder');
const c3 = f2.add(object, 'foo3');
const p1 = guigui.getPanel(0);

guigui.addPanel();

const p2 = guigui.addPanel();
const f3 = p2.addFolder('Test folder');
f3.add(object, 'foo4');

guigui.add(object, 'wiz');
guigui.add(object, 'bar');
guigui.add(object, 'some');
guigui.addColor(object, 'someColor');
guigui.add(object, 'bubu', ['foo', 'bar', 'zaz']);
guigui.add(object, 'bibi', [
  {name: 'foo', value: 'foo'},
  {name: 'bar', value: 'bar'},
  {name: 'zaz', value: 'zaz'}
]);
