import Component from '../Component';
import {format, clamp, toPrecision} from '../utils/maths';
import {offset} from '../utils/dom';
import '../styles/components/slider.css';

export default class Slider extends Component {
  constructor(object, property, options = {}) {
    let {
      step = 1,
      min = 0,
      max = 100,
      watch = false,
      label = property,
      minText = format(min, step.toString()),
      maxText = format(max, step.toString())
    } = options;

    const domString = `
      <div class="guigui-slider-label">${label}</div>
      <div class="guigui-slider-container">
        <div class="guigui-slider-background"></div>
        <div class="guigui-slider-handle"></div>
          <div class="guigui-slider-indice guigui-slider-indice--min">${minText}</div>
          <div class="guigui-slider-indice guigui-slider-indice--max">${maxText}</div>
        </div>
        <input type="text" class="guigui-slider-value" value="0"/>
      </div>
    `;

    super(object, property, {watch, classNames: ['guigui-slider']}, domString);

    this.onSliderStartDrag = this.onSliderStartDrag.bind(this);
    this.onSliderStopDrag = this.onSliderStopDrag.bind(this);
    this.onSliderDrag = this.onSliderDrag.bind(this);
    this.onTextStartDrag = this.onTextStartDrag.bind(this);
    this.onTextStopDrag = this.onTextStopDrag.bind(this);
    this.onTextDrag = this.onTextDrag.bind(this);
    this.onTextKeyDown = this.onTextKeyDown.bind(this);
    this.onTextChange = this.onTextChange.bind(this);

    this.step = step;
    this.min = min;
    this.max = max;
    this.labelText = label || property;
    this.isWatched = watch === true;
    this.minText = minText;
    this.maxText = maxText;

    this.textValueSlowingFactor = 0.1;

    this.sliderValue = 0;

    this.$container = this.$el.querySelector('.guigui-slider-container');
    this.$handle = this.$el.querySelector('.guigui-slider-handle');
    this.$background = this.$el.querySelector('.guigui-slider-background');
    this.$value = this.$el.querySelector('.guigui-slider-value');

    // create event listeners
    this.$container.addEventListener('mousedown', this.onSliderStartDrag);
    this.$value.addEventListener('mousedown', this.onTextStartDrag);
    this.$value.addEventListener('keydown', this.onTextKeyDown);
    this.$value.addEventListener('change', this.onTextChange);

    // set initial value
    this.value = this._targetObject[this._targetProperty];
  }

  get value() {
    return this.sliderValue;
  }

  set value(value) {
    this.sliderValue = clamp(toPrecision(value, this.step), this.min, this.max);
    this._value = this.sliderValue;
    this.updateTarget().updateSlider().updateText();
    this.emit('update', this.sliderValue);
  }

  remove() {
    this.$container.removeEventListener('mousedown', this.onSliderStartDrag);
    this.$value.removeEventListener('mousedown', this.onTextStartDrag);
    this.$value.removeEventListener('keydown', this.onTextKeyDown);
    this.$value.removeEventListener('change', this.onTextChange);
    this.onSliderStopDrag();
    this.onTextStopDrag();
    super.remove();
  }

  /* =============================================================================
    Slider Dragging
  ============================================================================= */
  onSliderStartDrag(e) {
    this.onStartInteraction();
    this.onSliderDrag(e);
    window.addEventListener('mouseup', this.onSliderStopDrag);
    window.addEventListener('mousemove', this.onSliderDrag);
    e.preventDefault();
  }

  onSliderStopDrag(e) {
    window.removeEventListener('mouseup', this.onSliderStopDrag);
    window.removeEventListener('mousemove', this.onSliderDrag);
    this.onEndInteraction();
    e.preventDefault();
  }

  onSliderDrag(e) {
    var ratio = (e.clientX - offset(this.$handle).left) / this.$background.offsetWidth;
    this.value = this.min + (this.max - this.min) * ratio;
    e.preventDefault();
  }

  /* =============================================================================
    Text Dragging
  ============================================================================= */
  onTextStartDrag(e) {
    this.startY = e.clientY;
    this.startValue = this.value;
    window.addEventListener('mouseup', this.onTextStopDrag);
    window.addEventListener('mousemove', this.onTextDrag);
    e.preventDefault();
  }

  onTextStopDrag(e) {
    window.removeEventListener('mouseup', this.onTextStopDrag);
    window.removeEventListener('mousemove', this.onTextDrag);
    e.preventDefault();
  }

  onTextDrag(e) {
    var delta = this.startY - e.clientY;
    this.value = this.startValue + delta * this.step * this.textValueSlowingFactor;
    e.preventDefault();
  }

  onTextKeyDown(e) {
    if (e.keyCode === 38) {
      this.value += this.step;
    } else if (e.keyCode === 40) {
      this.value -= this.step;
    } else {
      return;
    }
    e.preventDefault();
  }

  onTextChange() {
    if (this.$value.value.match(/^[+-]?\d+(\.\d+)?$/g)) {
      this.value = Number(this.$value.value);
    } else {
      this.value = this.sliderValue;
    }
  }

  /* =============================================================================
    Updaters
  ============================================================================= */
  updateTarget() {
    this._targetObject[this._targetProperty] = this.sliderValue;
    return this;
  }

  updateText() {
    if (!isNaN(this.sliderValue)) {
      this.$value.value = format(this.sliderValue, this.step.toString());
    }
    return this;
  }

  updateSlider() {
    this.$handle.style.transform = 'scaleX(' +
      (1 - (this.sliderValue - this.min) / (this.max - this.min)) +
      ')';
    return this;
  }

  invalidate() {
    super.invalidate();
    this.value = this._value;
  }
}
