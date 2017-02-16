import test from 'ava';
import {createElement} from 'utils/dom';

test ('dom.createElement', t => {
  const element = createElement('div', 'foo');
  const className = element.getAttribute('class');
  t.is(className, 'foo');
});