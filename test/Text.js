import test from 'ava';
import Text from 'components/Text';

test('create simple Text with label', t => {
  const obj = {a: 'foo'};
  const s1 = new Text(obj, 'a', {label: 'hello'});
  t.true(s1.isText);
  const htmllabel = s1.$el.querySelector('.guigui-text-label').innerHTML;
  t.is(htmllabel, 'hello');
});

test('create Text with no options', t => {
  const obj = {a: 'foo'};
  const s1 = new Text(obj, 'a');
  t.true(s1.isText);
});

test('updates Text value', t => {
  const obj = {a: 'foo'};
  const s1 = new Text(obj, 'a');

  t.is(s1.value, 'foo');
  s1.$input.value = 'foobar';
  t.is(obj.a, 'foo');
  s1.onInputChange();
  t.is(s1.value, 'foobar');
  t.is(obj.a, 'foobar');
});
