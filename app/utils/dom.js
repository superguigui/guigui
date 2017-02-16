export function createElement(tagName, ...classes) {
  const $el = document.createElement(tagName);
  addClasses($el, ...classes);
  return $el;
}

export function appendElement(element, parent = document.body) {
  parent.appendChild(element);
}

export function offset(elem) {
  var result = {left: 0, top: 0};
  if (elem.offsetParent) {
    do {
      result.left += elem.offsetLeft;
      result.top += elem.offsetTop;
    } while (elem = elem.offsetParent);
  }
  return result;
}

/* ---------------------------------------------------------------------------------
  CLASSES STUFF
--------------------------------------------------------------------------------- */
export function addClasses(element, ...classNames) {
  classNames.forEach(className => addClass(element, className));
}

export function addClass(element, className) {
  if (hasClass(element, className)) return;
  if (element.classList) {
    element.classList.add(className);
  } else {
    element.className += ' ' + className;
  }
}

export function hasClass(element, className) {
  if (element.classList) {
    return element.classList.contains(className);
  } else {
    return new RegExp('(^| )' + className + '( |$)', 'gi').test(element.className);
  }
}

export function removeClass(element, className) {
  if (!hasClass(element, className)) return;
  if (element.classList) {
    element.classList.remove(className);
  } else {
    element.className = element.className.replace(
      new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'),
      ' '
    );
  }
}

export function toggleClass(element, className) {
  if (hasClass(element, className)) {
    removeClass(element, className);
  } else {
    addClass(element, className);
  }
}
