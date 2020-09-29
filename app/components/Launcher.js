import Component from '../Component'
import { addClass, removeClass } from '../utils/dom'
import '../styles/components/launcher.css'

export default class Launcher extends Component {
  constructor(object, property, options = {}) {
    let { label = property, scope = object } = options

    const domString = `
      <div class="guigui-launcher-label">${label}<span>()</span></div>
    `

    super(object, property, { classNames: ['guigui-launcher'] }, domString)

    this.onButtonClick = this.onButtonClick.bind(this)
    this.onMouseDown = this.onMouseDown.bind(this)
    this.onMouseUp = this.onMouseUp.bind(this)

    this.isLauncher = true
    this.labelText = label
    this.callbackScope = scope

    this.$el.addEventListener('click', this.onButtonClick)
    this.$el.addEventListener('mousedown', this.onMouseDown)
  }

  remove() {
    this.$el.removeEventListener('click', this.onButtonClick)
    this.$el.removeEventListener('mousedown', this.onMouseDown)
    window.removeEventListener('mouseup', this.onMouseUp)
    super.remove()
  }

  onButtonClick() {
    this._targetObject[this._targetProperty].call(this.callbackScope)
  }

  onMouseDown() {
    addClass(this.$el, 'guigui-launcher--pressed')
    window.addEventListener('mouseup', this.onMouseUp)
  }

  onMouseUp() {
    window.removeEventListener('mouseup', this.onMouseUp)
    removeClass(this.$el, 'guigui-launcher--pressed')
  }
}
