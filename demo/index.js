import guigui from '../app'

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
    console.log('wiz')
  }
}
const f1 = guigui.addFolder('Some folder')
guigui.add(object, 'foo0', {label: 'foooooowwwwwwww', max: 1, step: 0.01})
f1.add(object, 'foo1', {step: 0.1})
f1.add(object, 'oof')
f1.add(object, 'foo2')
const f2 = f1.addFolder('Some other folder')
f1.addFolder('Some other folder')
f1.addFolder('Some other folder')
f2.add(object, 'foo3')
guigui.getPanel(0)

guigui.addPanel()

const p2 = guigui.addPanel()
const f3 = p2.addFolder('Test folder')
f3.add(object, 'foo4')
f3.add(object, 'bar')

guigui.add(object, 'wiz')
guigui.add(object, 'bar')
guigui.add(object, 'bar')
guigui.add(object, 'bar')
guigui.add(object, 'bar')
guigui.add(object, 'some')
guigui.addColor(object, 'someColor')
guigui.add(object, 'bubu', ['foo', 'bar', 'zaz']).on('update', () => {
  console.log(object.bubu)
})
guigui.add(object, 'bibi', [
  {name: 'foo', value: 'foo'},
  {name: 'bar', value: 'bar'},
  {name: 'zaz', value: 'zaz'}
])
