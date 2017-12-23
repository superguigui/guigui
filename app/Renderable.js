import { createElement } from './utils/dom'
import { isValidDomParent } from './utils/types'

export default class Renderable {
  constructor (options = {}, domString = '') {
    this.classNames = options.classNames || []
    this.$el = createElement('div', ...this.classNames)
    this.parent = null
    this.$el.innerHTML = domString
  }

  render () {}

  appendTo (parent) {
    if (isValidDomParent(parent)) {
      this.parent = parent
      parent.appendChild(this.$el)
    } else {
      throw new Error('Renderable cannot be added to ' + parent)
    }
  }

  remove () {
    if (this.parent) {
      this.parent.removeChild(this.$el)
      this.parent = null
    }
  }
}
