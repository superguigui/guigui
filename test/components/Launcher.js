var expect = require('chai').expect;
var Launcher = require('../../src/components/Launcher');

describe('Launcher', function() {
  var myObject = {toggle: function() {}};
  var lc = new Launcher(myObject, 'toggle');

  it('can be added to dom', function() {
    lc.appendTo(document.body);
    expect(lc.$el.parentNode).to.be.ok;
  });

  it('can be removed from dom', function() {
    lc.remove();
    expect(lc.$el.parentNode).to.not.be.ok;
  });

  it('calls callback when click', function(done) {
    var sourceObject = {toggle: function() {
      done();
      expect(1).to.equal(1);
    }};
    var launcher = new Launcher(sourceObject, 'toggle');
    launcher.onButtonClick({});
  });

});
