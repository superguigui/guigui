import Renderable from './Renderable';
import {toggleClass} from './utils/dom';

export default class CloseButton extends Renderable {
  constructor($container, containerClass) {
    const domString = `
      <div class="guigui-toggle-line"></div>
      <div class="guigui-toggle-line"></div>
    `;

    super(
      {
        classNames: ['guigui-toggle']
      },
      domString
    );

    this.toggle = this.toggle.bind(this);
    this.$container = $container;
    this.containerClass = containerClass;

    this.$el.addEventListener('click', this.toggle);
  }

  toggle() {
    toggleClass(this.$el, this.classNames[0] + '--opened');
    toggleClass(this.$container, this.containerClass + '--opened');
  }
}
