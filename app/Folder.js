import createComponent from './createComponent';
import Renderable from './Renderable';
import {toggleClass, addClass, removeClass} from './utils/dom';
import ColorPicker from './components/Colorpicker';

export default class Folder extends Renderable {
  constructor(folderName, options, domString = undefined) {
    options.classNames = options.classNames || ['guigui-folder'];

    domString = domString ||
      `
      <div class="guigui-folder-head">
        <h2 class="guigui-folder-label">${folderName}</h2>
        <div class="guigui-folder-toggle">
          <div class="guigui-folder-toggle-line"></div>
          <div class="guigui-folder-toggle-line"></div>
        </div>
      </div>
      <div class="guigui-folder-content"></div>
    `;

    super(options, domString);

    this.toggle = this.toggle.bind(this);

    this.folderName = folderName;
    this.components = [];
    this.folders = [];

    this.$content = this.$el.querySelector('.' + options.classNames[0] + '-content');
    this.$head = this.$el.querySelector('.' + options.classNames[0] + '-head');
    this.$head.addEventListener('click', this.toggle);
  }

  toggle() {
    toggleClass(this.$el, this.classNames[0] + '--opened');
  }

  close() {
    removeClass(this.$el, this.classNames[0] + '--opened');
  }

  open() {
    addClass(this.$el, this.classNames[0] + '--opened');
  }

  addFolder(name, options = {}) {
    const folder = new Folder(name, options);
    this.folders.push(folder);
    folder.appendTo(this.$content);
    return folder;
  }

  add(object, property, array, options) {
    const component = createComponent(object, property, array, options);
    this.components.push(component);
    component.appendTo(this.$content);
    return component;
  }

  addColor(object, property, options) {
    const component = new ColorPicker(object, property, options);
    this.components.push(component);
    component.appendTo(this.$content);
    return component;
  }
}
