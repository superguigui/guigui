var expect = require('chai').expect;
var ComponentContainer = require('../../src/base/ComponentContainer');
var Toggler = require('../../src/components/Toggler');
var Launcher = require('../../src/components/Launcher');
var Slider = require('../../src/components/Slider');


describe('ComponentContainer', function() {
  var cc = new ComponentContainer();

  it('accepts sliders', function() {
    var myObject = {x: 0};
    var slider = cc.addSlider(myObject, 'x');
    expect(slider).to.be.ok;
  });

  it('accepts launchers', function() {
    var myObject = {toggle: function() {}};
    var launcher = cc.addLauncher(myObject, 'toggle');
    expect(launcher).to.be.ok;
  });

  it('accepts togglers', function() {
    var myObject = {visible: false};
    var toggler = cc.addToggler(myObject, 'visible');
    expect(toggler).to.be.ok;
  });

  it('accepts colorPickers', function() {
    var myObject = {color: 0xFF0000};
    var colorPicker = cc.addColorPicker(myObject, 'color');
    expect(colorPicker).to.be.ok;
  });

  it('autoDetects togglers', function() {
    var myObject = {visible: false};
    var toggler = cc.add(myObject, 'visible');
    expect(toggler).to.be.an.instanceOf(Toggler);
  });

  it('autoDetects slider', function() {
    var myObject = {x: 12};
    var slider = cc.add(myObject, 'x');
    expect(slider).to.be.an.instanceOf(Slider);
  });

  it('autoDetects launcher', function() {
    var myObject = {toggle: function() {}};
    var launcher = cc.add(myObject, 'toggle');
    expect(launcher).to.be.an.instanceOf(Launcher);
  });

  it('doesnt throw errors when calling remove if not previously added', function() {
    cc.remove();
    expect(cc.$el).to.be.ok;
  });

  it('can be removed', function() {
    document.body.appendChild(cc.$el);
    cc.remove();
    expect(cc.$el).to.not.be.ok;
  });

});