import test from 'ava'
import Launcher from '../app/components/Launcher'

class SomeClass {
  constructor() {
    this.a = 2
  }
  getA() {
    return this.a
  }
  changeA() {
    this.a = 3
  }
}

test('create simple Launcher with label', t => {
  const obj = new SomeClass()
  const l1 = new Launcher(obj, 'getA', { label: 'foo' })
  t.true(l1.isLauncher)
  const htmllabel = l1.$el
    .querySelector('.guigui-launcher-label')
    .innerHTML.replace('<span>()</span>', '')
  t.is(htmllabel, 'foo')
})

test('create Launcher with specific scope', t => {
  const obj1 = new SomeClass()
  const obj2 = { fn: obj1.changeA }
  const l1 = new Launcher(obj2, 'fn', { label: 'foo', scope: obj1 })
  t.is(obj1.a, 2)
  l1.onButtonClick()
  t.is(obj1.a, 3)
})

test('create Launcher with no options', t => {
  const obj1 = new SomeClass()
  const l1 = new Launcher(obj1, 'getA')
  const l2 = new Launcher(obj1)
  t.true(l1.isLauncher)
  t.true(l2.isLauncher)
})

test('mousedown on Launcher adds pressed class and mouseup removes it', t => {
  const obj1 = new SomeClass()
  const l1 = new Launcher(obj1, 'getA', { scope: obj1 })
  t.false(l1.$el.classList.contains('guigui-launcher--pressed'))
  l1.onMouseDown()
  t.true(l1.$el.classList.contains('guigui-launcher--pressed'))
  l1.onMouseUp()
  t.false(l1.$el.classList.contains('guigui-launcher--pressed'))
})

test('removing a Launcher', t => {
  const obj1 = new SomeClass()
  const l1 = new Launcher(obj1, 'getA')
  l1.appendTo(document.body)
  t.is(l1.$el.parentNode, document.body)
  l1.remove()
  t.falsy(l1.$el.parentNode)
})
