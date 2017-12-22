import Component from '../Component';
import {addClass, removeClass} from '../utils/dom';
import '../styles/components/toggler.css';

export default class Toggler extends Component {
  constructor(object, property, options = {}) {
    let {label = property} = options;

    const domString = `
      <div class="guigui-toggler-label">${label}</div>
      <div class="guigui-toggler-state">
        <div class="guigui-toggler-handle"></div>
      </div>
    `;

    super(object, property, {classNames: ['guigui-toggler']}, domString);

    this.onTogglerClick = this.onTogglerClick.bind(this);

    this.labelText = label;
    this.isSelected = false;
    this.isToggler = true;

    this.value = this._targetObject[this._targetProperty] === true;

    this.$el.addEventListener('click', this.onTogglerClick);
  }

  onTogglerClick(e) {
    this.onStartInteraction();
    this.value = !this.value;
    this.onEndInteraction();
  }

  get value() {
    return this.isSelected;
  }

  set value(value) {
    if (value) {
      this.isSelected = true;
      addClass(this.$el, 'guigui-toggler--selected');
    } else {
      this.isSelected = false;
      removeClass(this.$el, 'guigui-toggler--selected');
    }
    this._targetObject[this._targetProperty] = value;
    this.emit('update', value);
  }
}
