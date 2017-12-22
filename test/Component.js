import test from 'ava';
import Component from 'Component';

test('create simple Component', t => {
  const obj = {foo: 'bar'};
  const c1 = new Component(obj, 'foo');
  t.is(c1._value, 'bar');
});

test('create Component with an object but no property', t => {
  const obj = {foo: 'bar'};
  const c1 = new Component(obj);
  t.is(c1._value, undefined);
});

test('create Component with a property but no object', t => {
  const error = t.throws(
    () => {
      const c1 = new Component(null, 'foo', {classNames: ['bar']}, '<div></div>');
    },
    Error
  );
  t.is(error.message, 'Cannot create a component around a non object');
});

test('create Component with nothing', t => {
  const error = t.throws(
    () => {
      const c1 = new Component();
    },
    Error
  );
  t.is(error.message, 'Cannot create a component around a non object');
});

test.cb('update value of watchable Component', t => {
  const obj = {foo: 'bar'};
  const c1 = new Component(obj, 'foo', {watch: true});
  obj.foo = 16;
  setTimeout(
    () => {
      t.is(c1._value, obj.foo);
      c1.onWatch();
      obj.foo = 17;
      c1.onWatch();
      t.end();
    },
    200
  );
});

test.cb('update value of watchable Component during interaction', t => {
  const obj = {foo: 'bar'};
  const c1 = new Component(obj, 'foo', {watch: true});
  c1.onStartInteraction();
  obj.foo = 40;
  t.is(c1._value, 'bar');
  c1.onEndInteraction();
  setTimeout(
    () => {
      t.is(c1._value, 40);
      t.end();
    },
    200
  );
});

test.cb('update value of non watchable Component during interaction', t => {
  const obj = {foo: 'bar'};
  const c1 = new Component(obj, 'foo');
  c1.onStartInteraction();
  obj.foo = 40;
  t.is(c1._value, 'bar');
  c1.onEndInteraction();
  setTimeout(
    () => {
      t.is(c1._value, 'bar');
      t.end();
    },
    200
  );
});
