var test = require('tape');
var clamp = require('../../src/utils/maths/clamp');
var toPrecision = require('../../src/utils/maths/toPrecision');

test('utils.maths.clamp', function(t) {
  t.plan(6);
  t.equal(clamp(3, 0, 10), 3);
  t.equal(clamp(3, 4, 10), 4);
  t.equal(clamp(11, 4, 10), 10);
  t.equal(clamp(-3, -10, 0), -3);
  t.equal(clamp(-3, -2, 0), -2);
  t.equal(clamp(-3, -20, -5), -5);
});

test('utils.maths.toPrecision', function(t) {
  t.plan(2);
  t.equal(toPrecision(20.12, 0.1), 20.1);
  t.equal(toPrecision(20.12, 0.01), 20.12);
});