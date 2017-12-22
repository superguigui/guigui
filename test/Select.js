import test from 'ava';
import Select from 'components/Select';

test('create simple Select with label', t => {
  const obj = {a: 0};
  const s1 = new Select(obj, 'a', [0, 1, 2], {label: 'hello'});
  t.true(s1.isSelect);
  const htmllabel = s1.$el.querySelector('.guigui-select-label').innerHTML;
  t.is(htmllabel, 'hello');
});

test('create Select without array', t => {
  const obj = {a: 0};
  const error = t.throws(
    () => {
      const s1 = new Select(obj, 'a');
    },
    Error
  );
  t.is(error.message, 'Select cannot work without an array');
});

test('create Select with name value object', t => {
  const obj = {a: 0};
  const s1 = new Select(obj, 'a', [{name: 'zero', value: 0}, {name: 'one', value: 1}]);
  s1.$select.value = 1;
  s1.onSelectChange();
  t.is(obj.a, '1');
  t.is(s1.value, '1');
});

test('changes Select value', t => {
  const obj = {a: 0};
  const s1 = new Select(obj, 'a', [0, 1, 2]);
  s1.$select.value = 1;
  s1.onSelectChange();
  t.is(obj.a, '1');
  t.is(s1.value, '1');
});
