import Component from '../Component'
import {isObject, isArray} from '../utils/types'
import '../styles/components/select.css'

export default class Select extends Component {
  constructor (object, property, array, options = {}) {
    let {label = property} = options

    const currentValue = object[property]

    if (!isArray(array)) {
      throw new Error('Select cannot work without an array')
    }

    array = array.map(item => {
      if (isObject(item) && item.name && item.value) return item
      else return {name: item, value: item}
    })

    const selectOptions = array
      .map(({value, name}) => {
        const selected = value === currentValue ? 'selected' : ''
        return `<option ${selected} value="${value}">${name}</option>`
      })
      .join('')
    const domString = `
      <div class="guigui-select-label">${label}</div>
      <select>
        ${selectOptions}
      </select>
    `

    super(object, property, {classNames: ['guigui-select']}, domString)

    this.onSelectChange = this.onSelectChange.bind(this)

    this.isSelect = true
    this.$select = this.$el.querySelector('select')
    this.value = currentValue
    this.$select.addEventListener('change', this.onSelectChange)
  }

  onSelectChange (e) {
    this.value = this.$select.value
  }

  get value () {
    return this.$select.value
  }

  set value (value) {
    this.$select.value = value
    this._value = value
    this._targetObject[this._targetProperty] = value
    this.emit('update', this.sliderValue)
  }
}
