import Folder from '../Folder';

export default class FolderContainer {
  constructor () {
    this.folders = [];
  }

  addFolder (name) {
    const folder = new Folder(name);
    this.folders.push(folder);
    return folder;
  }

  render () {
    
  }
}