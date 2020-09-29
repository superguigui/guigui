import Component from '../Component'
import { addClass, removeClass } from '../utils/dom'
import { isNumber, isThreejsColor } from '../utils/types'
import SimpleColorPicker from 'simple-color-picker'
import '../styles/components/colorpicker.css'

export default class Colorpicker extends Component {
  constructor(object, property, options = {}) {
    let { label = property } = options

    const domString = `
      <div class="guigui-colorpicker-label">${label}</div>
      <div class="guigui-colorpicker-state">
        <input type="text" class="guigui-colorpicker-text" value="#FF0000"/>
      </div>
    `

    super(object, property, { classNames: ['guigui-colorpicker'] }, domString)

    this.onColorPickerClick = this.onColorPickerClick.bind(this)
    this.onColorPickerUpdate = this.onColorPickerUpdate.bind(this)
    this.onPickerMouseLeave = this.onPickerMouseLeave.bind(this)
    this.onFinishedInteracting = this.onFinishedInteracting.bind(this)
    this.onTextChange = this.onTextChange.bind(this)

    const value = object[property]

    this.isThreejsColor = isThreejsColor(value)
    this.initialColorFormat =
      isNumber(value) || this.isThreejsColor ? 'number' : 'string'
    this.isOpened = false

    this.$text = this.$el.querySelector('.guigui-colorpicker-text')
    this.$state = this.$el.querySelector('.guigui-colorpicker-state')

    this.colorPicker = new SimpleColorPicker({
      el: this.$el,
      color: this.isThreejsColor
        ? this._targetObject[this._targetProperty].getHex()
        : this._targetObject[this._targetProperty],
      background: '#30343c'
    })
    this.$picker = this.colorPicker.$el
    this.colorPicker.onChange(this.onColorPickerUpdate)

    this.$text.value = this.colorPicker.color.toHexString()

    this.onTextChange()

    this.$state.addEventListener('click', this.onColorPickerClick)
    this.$text.addEventListener('change', this.onTextChange)
  }

  remove() {
    this.$state.removeEventListener('click', this.onColorPickerClick)
    this.$picker.removeEventListener('mouseleave', this.onPickerMouseLeave)
    window.removeEventListener('mouseup', this.onFinishedInteracting)
    super.remove()
  }

  getColor() {
    if (this.initialColorFormat === 'number') {
      return this.colorPicker.getHexNumber()
    }
    return this.colorPicker.getHexString()
  }

  _closePicker() {
    this.isOpened = false
    removeClass(this.$el, 'guigui-colorpicker--opened')
    this.onEndInteraction()
  }

  invalidate() {
    this.colorPicker.setColor(this._value)
    this.onColorPickerUpdate()
  }

  /* =============================================================================
    Events
  ============================================================================= */
  onTextChange() {
    this.colorPicker.setColor(this.$text.value)
  }

  onColorPickerClick() {
    this.isOpened = !this.isOpened
    if (this.isOpened) {
      this.onStartInteraction()
      addClass(this.$el, 'guigui-colorpicker--opened')
      this.$picker.addEventListener('mouseleave', this.onPickerMouseLeave)
    } else {
      this._closePicker()
    }
  }

  onPickerMouseLeave() {
    this.$picker.removeEventListener('mouseleave', this.onPickerMouseLeave)
    if (this.colorPicker.choosing) {
      window.addEventListener('mouseup', this.onFinishedInteracting)
    } else {
      this._closePicker()
    }
  }

  onFinishedInteracting() {
    window.removeEventListener('mouseup', this.onFinishedInteracting)
    this._closePicker()
  }

  onColorPickerUpdate() {
    const hexString = this.colorPicker.getHexString()
    const formatedColor = this.getColor()
    this._value = formatedColor
    this.$state.style.background = hexString
    this.$text.value = hexString
    this.$text.style.color = this.colorPicker.isDark() ? 'white' : 'black'
    if (this.isThreejsColor) {
      this._targetObject[this._targetProperty].setHex(formatedColor)
    } else {
      this._targetObject[this._targetProperty] = formatedColor
    }
    this.emit('update', formatedColor)
  }
}
