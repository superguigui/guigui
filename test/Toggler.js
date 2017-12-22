import test from 'ava';
import Toggler from 'components/Toggler';

test('create simple Toggler with label', t => {
  const obj = {foo: false};
  const t1 = new Toggler(obj, 'foo', {label: 'hello'});
  t.true(t1.isToggler);
  const htmllabel = t1.$el.querySelector('.guigui-toggler-label').innerHTML;
  t.is(htmllabel, 'hello');
});

test('create Toggler with no options', t => {
  const obj = {foo: false};
  const t1 = new Toggler(obj, 'foo');
  t.true(t1.isToggler);
});

test('create Toggler with no property', t => {
  const obj = {foo: false};
  const t1 = new Toggler(obj, null, {label: 'foo'});
  t.true(t1.isToggler);
});

test('activating toggler changes value of target', t => {
  const obj = {foo: true};
  const t1 = new Toggler(obj, 'foo', {label: 'hello'});
  t.true(obj.foo);
  t1.onTogglerClick();
  t.false(obj.foo);
  t1.onTogglerClick();
  t.true(obj.foo);
  t.true(t1.value);

  t1.value = false;

  t.false(obj.foo);

  t1.value = true;

  t.true(obj.foo);
});
