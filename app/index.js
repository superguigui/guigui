import Panel from './Panel';
import Folder from './Folder';
import CloseButton from './CloseButton';
import {createElement, appendElement} from './utils/dom';
import './styles/main.css';

function onCloseButtonToggled() {
  panels.forEach(panel => panel.toggle());
}

function addPanel(name = '') {
  if (name === '') {
    name = 'Settings';
    if (panels.length > 0) {
      name += ' ' + (panels.length + 1);
    }
  }
  const panel = new Panel(name);
  panels.push(panel);
  panel.appendTo($content);
  return panel;
}

function add(...args) {
  return getFirstPanel().add(...args);
}

function addColor(...args) {
  return getFirstPanel().addColor(...args);
}

function addColorPicker(...args) {
  return getFirstPanel().addColor(...args);
}

function addFolder(...args) {
  return getFirstPanel().addFolder(...args);
}

function getPanel(index) {
  if (index < panels.length) {
    return panels[index];
  }
  return null;
}

function getFirstPanel() {
  return getPanel(0) || addPanel();
}

const panels = [];
const $el = createElement('div', 'guigui');
const $content = createElement('div', 'guigui-container');
const closeButton = new CloseButton($content, 'guigui-container');

appendElement($el);
appendElement($content, $el);
closeButton.appendTo($el);

module.exports = {
  addPanel,
  addFolder,
  add,
  addColor,
  addColorPicker,
  getPanel
};
