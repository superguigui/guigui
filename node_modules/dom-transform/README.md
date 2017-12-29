# dom-transform [![Build Status](https://travis-ci.org/nk-components/dom-transform.svg?branch=master)](https://travis-ci.org/nk-components/dom-transform)

Applies CSS transform properties on an element.

## Installation

With [npm](http://npmjs.org) do:

```bash
$ npm install dom-transform --save
```

Install with [component(1)](http://component.io):

```
$ component install nk-components/dom-transform
```

## API

```js
var transform = require('dom-transform');
var el = document.querySelector('div');

transform(el, {
  x: 12,
  y: 10
});

console.log(transform.get(el, 'transform'))
// > 'translateX(12px) translateY(10px)'

console.log(transform.get(el, 'transform'))
// > {
//  'transform': 'translateX(12px) translateY(10px)',
//  'transformOrigin': ''
// }

transform.reset(el);
// > {
//  'transform': '',
//  'transformOrigin': ''
// }

transform(el, {
  translate3d: [10, 10, 10],
  origin: [0, 0]
});
```

Supported properties:
* `translate`:
  - default: `px`

* `translate3d`:
  - default: `px`

* `translateX`:
  - alias: `x`
  - default: `px`

* `translateY`:
  - alias: `y`
  - default: `px`

* `translateZ`:
  - alias: `z`
  - default: `px`

* `scale`

* `scale3d`

* `scaleX`

* `scaleY`

* `scaleZ`

* `rotate3d`

* `rotate`:
  - default: `deg`

* `rotateX`:
  - default: `deg`

* `rotateY`:
  - default: `deg`

* `rotateZ`:
  - default: `deg`

* `skew`:
  - default: `deg`

* `skewX`:
  - default: `deg`

* `skewY`:
  - default: `deg`

* `matrix`

* `matrix3d`

* `perspective`:
  - default: `px`

* `origin`

[More information](https://developer.mozilla.org/en-US/docs/Web/CSS/transform)

## License

MIT
