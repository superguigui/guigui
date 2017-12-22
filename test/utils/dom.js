import test from 'ava';
import {
  createElement,
  appendElement,
  offset,
  addClasses,
  addClass,
  hasClass,
  removeClass,
  toggleClass
} from 'utils/dom';

const a = createElement('div', 'foo');
const b = createElement('div', 'foo', 'bar');
const c = {className: 'foo bar'};
const d = createElement('div');
const e = createElement('div');
appendElement(a, b);
appendElement(b, d);
appendElement(e);

test('createElement', t => {
  t.is(a.tagName, 'DIV');
  t.is(a.getAttribute('class'), 'foo');
  t.is(b.getAttribute('class'), 'foo bar');
});

test('appendElement', t => {
  t.is(a.parentNode, b);
});

test('appendElement with no parent provided should add element to body', t => {
  t.is(e.parentNode, document.body);
});

test('offset', t => {
  t.is(offset(b).top, 0);
  t.is(offset(b).left, 0);
  t.is(offset({offsetTop: 30, offsetParent: {offsetTop: 10}}).top, 40);
});

test('addClasses', t => {
  addClasses(a, 'classa', 'classb', 'classc');
  t.is(a.getAttribute('class'), 'foo classa classb classc');
});

test('addClass', t => {
  addClass(b, 'classa');
  addClass(c, 'classa');
  addClass(c, 'classa');
  t.is(b.getAttribute('class'), 'foo bar classa');
  t.is(c.className, 'foo bar classa');
});

test('hasClass', t => {
  addClass(b, 'someclass');
  addClass(c, 'someclass');
  t.true(hasClass(b, 'someclass'));
  t.false(hasClass(b, 'someotherclass'));
  t.true(hasClass(c, 'someclass'));
  t.false(hasClass(c, 'someotherclass'));
});

test('removeClass', t => {
  removeClass(b, 'someclass');
  removeClass(c, 'someclass');
  removeClass(c, 'unknownclass');
  t.false(hasClass(b, 'someclass'));
  t.false(hasClass(c, 'someclass'));
  t.false(hasClass(c, 'unknownclass'));
});

test('toggleClass', t => {
  toggleClass(b, 'someclass');
  t.true(hasClass(b, 'someclass'));
  toggleClass(b, 'someclass');
  t.false(hasClass(b, 'someclass'));
});
