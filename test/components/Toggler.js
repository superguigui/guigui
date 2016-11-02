var expect = require('chai').expect;
var Toggler = require('../../src/components/Toggler');

describe('Toggler', function() {
  var myObject = {visible: true};
  var tg = new Toggler(myObject, 'visible');

  it('can be added to dom', function() {
    tg.appendTo(document.body);
    expect(tg.$el.parentNode).to.be.ok;
  });

  it('has its value updated on click', function() {
    tg.onTogglerClick({});
    expect(tg.value).to.not.be.ok;
    tg.onTogglerClick({});
    expect(tg.value).to.be.ok;
  });

  it('can be listened for updates', function(done) {
    tg.on('update', function() {
      expect(tg.value).to.not.be.ok;
      done();
    });
    tg.onTogglerClick({});
  });

  it('can be removed from dom', function() {
    tg.remove();
    expect(tg.$el.parentNode).to.not.be.ok;
  });

  it('can watch for value and update properly', function(done) {
    var myObject = {visible: true};
    var tg = new Toggler(myObject, 'visible', {watch: true});
    myObject.visible = false;
    setTimeout(function() {
      expect(tg._value).to.not.be.ok;
      tg.remove();
      done();
    });
  });

});
