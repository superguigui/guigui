import isValidDomParent from './utils/isValidDomParent';
import {createElement, appendElement} from './utils/dom';
import {warn} from './utils/log';

export default class Renderable {
  constructor(options, domString = '') {
    this.classNames = options.classNames || [];
    this.$el = createElement('div', ...this.classNames);
    this.parent = null;
    this.$el.innerHTML = domString;
  }

  render() {
  }

  appendTo(parent) {
    if (isValidDomParent(parent)) {
      this.parent = parent;
      parent.appendChild(this.$el);
    } else {
      warn(parent + ' is not a valid dom element');
    }
  }

  remove() {
    if (this.parent) {
      this.parent.removeChild(this.$el);
      this.parent = null;
    }
  }
}
