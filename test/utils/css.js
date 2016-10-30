var expect = require('chai').expect;
var css = require('../../src/utils/styles/css');

describe('css', function() {
  it('should return null when nothins is passed as param', function() {
    expect(css(null)).to.be.null;
  });
});
