import test from 'ava'
import Renderable from '../app/Renderable'

function createRenderable(domString = `<span>bar</span>`, className = 'foo') {
  return new Renderable({ classNames: [className] }, domString)
}

test('create simple renderable', t => {
  const dom = '<span>bar</span>'
  const r1 = createRenderable(dom)
  t.truthy(r1.$el.innerHTML, dom)
  t.is(r1.$el.innerHTML, dom)
})

test('create renderable with no content', t => {
  const r1 = new Renderable()
  t.is(r1.$el.innerHTML, '')
})

test('create renderable with no options', t => {
  const r1 = new Renderable('')
  t.is(r1.$el.innerHTML, '')
})

test('append renderable to body', t => {
  const r1 = createRenderable()
  r1.appendTo(document.body)

  t.is(r1.parent, document.body)
  t.is(r1.$el.parentNode, document.body)
})

test('append renderable to element', t => {
  const parent = document.createElement('div')
  const r1 = createRenderable()
  r1.appendTo(parent)

  t.is(r1.parent, parent)
  t.is(r1.$el.parentNode, parent)
})

test('append renderable to nothing should not be possible', t => {
  const r1 = createRenderable()
  const error = t.throws(() => {
    r1.appendTo()
  }, null)

  t.is(error.message, 'Renderable cannot be added to undefined')
})

test('remove renderable when body is parent', t => {
  const r1 = createRenderable()
  r1.appendTo(document.body)
  r1.remove()

  t.not(r1.parent, document.body)
  t.not(r1.$el.parentNode, document.body)
})

test('remove renderable when element is parent', t => {
  const parent = document.createElement('div')
  const r1 = createRenderable()
  r1.appendTo(parent)
  r1.remove()

  t.not(r1.parent, parent)
  t.not(r1.$el.parentNode, parent)
})

test('remove renderable when it has no parent', t => {
  const r1 = createRenderable()
  r1.remove()

  t.pass()
})

test('render renderable', t => {
  const r1 = createRenderable()
  r1.render()

  t.pass()
})
