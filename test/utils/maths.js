var expect = require('chai').expect;
var clamp = require('../../src/utils/maths/clamp');
var toPrecision = require('../../src/utils/maths/toPrecision');

describe('clamp', function() {
  it('should return input value when inside range', function() {
    expect(clamp(3, 0, 10)).to.equal(3);
    expect(clamp(-3, -10, 0)).to.equal(-3);
  });
  it('should return min when smaller than range', function() {
    expect(clamp(3, 4, 10)).to.equal(4);
    expect(clamp(-3, -2, 0)).to.equal(-2);
  });
  it('should return max when bigger than range', function() {
    expect(clamp(11, 4, 10)).to.equal(10);
    expect(clamp(-3, -20, -5)).to.equal(-5);
  });
});

describe('toPrecision', function() {
  it('should work', function() {
    expect(toPrecision(20.12, 0.1)).to.equal(20.1);
    expect(toPrecision(20.12, 0.01)).to.equal(20.12);
  });
});
