import guigui from 'guigui'

console.log('guigui demo')

const $title = document.querySelector('h1')
const $subject = document.querySelector('.subject')
$subject.x = 0
$subject.y = 0
$subject.visible = true
$subject.shape = 'square'

function moveSubject () {
  $subject.style.transform = `translate(${$subject.x}px, ${$subject.y}px)`
}

function toggleVisible (visible) {
  $subject.style.display = visible ? 'block' : 'none'
}

function changeShape () {
  $subject.style.borderRadius = $subject.shape === 'circle' ? '50px' : '0px'
}

$subject.wizz = () => {
  $subject.style.top = `${(Math.random() * 80 + 10)}%`
  $subject.style.left = `${(Math.random() * 80 + 10)}%`
}

guigui.add($title, 'innerHTML', {label: 'title'})
guigui.add($subject, 'x', {min: -200, max: 200, step: 1}).on('update', moveSubject)
guigui.add($subject, 'y', {min: -200, max: 200, step: 1}).on('update', moveSubject)
guigui.add($subject, 'shape', ['square', 'circle']).on('update', changeShape)
guigui.addColorPicker($subject.style, 'background', {label: 'color'})
guigui.add($subject, 'visible').on('update', toggleVisible)
guigui.add($subject, 'wizz')
