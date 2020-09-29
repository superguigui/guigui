import test from 'ava'
import Component from '../app/Component'

test('create simple Component', t => {
  const obj = { foo: 'bar' }
  const c1 = new Component(obj, 'foo')
  t.is(c1._value, 'bar')
})

test('create Component with an object but no property', t => {
  const obj = { foo: 'bar' }
  const c1 = new Component(obj)
  t.is(c1._value, undefined)
})

test('create Component with a property but no object', t => {
  const error = t.throws(
    () => new Component(null, 'foo', { classNames: ['bar'] }, '<div></div>'),
    null
  )
  t.is(error.message, 'Cannot create a component around a non object')
})

test('create Component with nothing', t => {
  const error = t.throws(() => new Component(), null)
  t.is(error.message, 'Cannot create a component around a non object')
})

test.cb('update value of watchable Component', t => {
  const obj = { foo: 'bar' }
  const c1 = new Component(obj, 'foo', { watch: true })
  obj.foo = 16
  setTimeout(() => {
    t.is(c1._value, obj.foo)
    c1.onWatch()
    obj.foo = 17
    c1.onWatch()
    t.end()
  }, 200)
})

test.cb('update value of watchable Component during interaction', t => {
  const obj = { foo: 'bar' }
  const c1 = new Component(obj, 'foo', { watch: true })
  c1.onStartInteraction()
  obj.foo = 40
  t.is(c1._value, 'bar')
  c1.onEndInteraction()
  setTimeout(() => {
    t.is(c1._value, 40)
    t.end()
  }, 200)
})

test.cb('update value of non watchable Component during interaction', t => {
  const obj = { foo: 'bar' }
  const c1 = new Component(obj, 'foo')
  c1.onStartInteraction()
  obj.foo = 40
  t.is(c1._value, 'bar')
  c1.onEndInteraction()
  setTimeout(() => {
    t.is(c1._value, 'bar')
    t.end()
  }, 200)
})

test('event management', t => {
  const obj = { foo: 'bar' }
  const c1 = new Component(obj, 'foo')
  const f1 = () => {}
  const f2 = () => {}
  c1.on('update', f1)
  t.truthy(c1._events.update)
  t.is(c1._events.update.length, 1)
  c1.on('update', f2)
  t.is(c1._events.update.length, 2)
  c1.emit('update', 'coucou')
  c1.off('update', f1)
  t.is(c1._events.update.length, 1)
  c1.off('update', f2)
  t.is(c1._events.update.length, 0)
  c1.off('update', f1)
  t.is(c1._events.update.length, 0)
  c1.off('foo', f1)
  t.is(c1._events.update.length, 0)
})
