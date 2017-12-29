import Folder from './Folder'

export default class Panel extends Folder {
  constructor (name = '') {
    const domString = `
      <div class="guigui-panel-head">
        <h2 class="guigui-panel-label">${name}</h2>
      </div>
      <div class="guigui-panel-content"></div>
    `
    super(
      name,
      {
        classNames: ['guigui-panel', 'guigui-panel--opened']
      },
      domString
    )
  }
}
