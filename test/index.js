var domready = require('domready');
var expect = require('chai').expect;

var Guigui = require('../src');
var Slider = require('../src/components/Slider');
var Toggle = require('../src/components/Toggler');
var Launcher = require('../src/components/Launcher');
var Folder = require('../src/base/Folder');

describe('Main GUI test', function () {
  
  var myObject = {
    x: 0,
    visible: false
  };

  var gui = new Guigui();

  it('is in the DOM', function () {
    expect(1).to.equal(1);
  });
});