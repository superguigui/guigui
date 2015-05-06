var expect = require('chai').expect;
var Folder = require('../../src/base/Folder');

describe('Folder', function() {
  var fd = new Folder();

  it('can be added to dom', function() {
    fd.appendTo(document.body);
    expect(fd.$el.parentNode).to.be.ok;
  });

  it('can be opened', function() {
    fd.open();
    expect(fd.isOpen).to.be.ok;
  });

  it('can be closed', function() {
    fd.close();
    expect(fd.isOpen).to.not.be.ok;
  });

  it('can be toggled', function() {
    fd.toggle({});
    expect(fd.isOpen).to.be.ok;
    fd.toggle({});
    expect(fd.isOpen).to.not.be.ok;
  });

  it('adds its component to `.content` rather than in itself', function() {
    var myObject = {x: 0};
    var component = fd.add(myObject, 'x');
    expect(component.$el.parentNode).to.equal(fd.$content);
  });

  it('can be removed from dom', function() {
    fd.remove()
    expect(fd.$el).to.not.be.ok;
  });

});