module.exports = function getOffset(elem) {
  var offset = {left: 0, top:0};
  if (elem.offsetParent) {
    do {
      offset.left += elem.offsetLeft;
      offset.top += elem.offsetTop;
    } while (elem = elem.offsetParent);
  }
  return offset;
};