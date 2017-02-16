import Folder from '../Folder';

export default addFolder (list, folderName) {
  const folder = new Folder(folderName);
  const newlist = list.slice(0);
  newlist.push(folder);
  return newlist;
}
