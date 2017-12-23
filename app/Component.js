import Renderable from './Renderable'
import emitter from 'component-emitter'

export default class Component extends Renderable {
  constructor (object, property, options = {}, domString = '') {
    options.classNames = options.classNames || []
    options.classNames.push('guigui-component')

    if (!object) {
      throw new Error('Cannot create a component around a non object')
    }

    super(options, domString)

    emitter(this)

    this.onWatch = this.onWatch.bind(this)
    this.isWatched = options.watch === true

    this._targetObject = object
    this._targetProperty = property
    this._value = object[property]

    this.onEndInteraction()
  }

  invalidate () {
    this._value = this._targetObject[this._targetProperty]
  }

  onWatch () {
    if (this._targetObject[this._targetProperty] !== this._value) {
      this.invalidate()
    }
  }

  onStartInteraction () {
    if (this.isWatched) {
      clearInterval(this._watchInterval)
    }
  }

  onEndInteraction () {
    if (this.isWatched) {
      this._watchInterval = setInterval(this.onWatch, 100)
    }
  }
}
