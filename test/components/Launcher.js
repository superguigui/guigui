var expect = require('chai').expect;
var Launcher = require('../../src/components/Launcher');
var variablesThemes = require('../../src/styles/variables');
var Color = require('color');


describe('Launcher', function() {
  var variables = variablesThemes[variablesThemes.theme];
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

  it('changes color when mousedown', function() {
    lc.onMouseDown({});
    expect(styleColorToHex(lc.$el.style.background)).to.equal(variables.lightColor.toUpperCase());
    expect(styleColorToHex(lc.$el.style.background)).to.not.equal(styleColorToHex('rgb(0, 0, 255)'));
    expect(styleColorToHex(lc.$el.style.background)).to.not.equal(styleColorToHex('#FF0000'));
  });

  it('changes color back to normal when mouseup', function() {
    lc.onMouseUp({});
    expect(Color(lc.$el.style.background).hexString()).to.equal(variables.backgroundMainColor.toUpperCase());
  });
});

/* ================================================================================
  Utils
================================================================================ */
function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? '0' + hex : hex;
}

function rgbToHex(r, g, b) {
  return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function styleColorToHex(color) {
  if (color.indexOf('#') === 0) {
    return color.toUpperCase();
  }
  else {
    color = color.replace('rgb(', '');
    color = color.replace(')', '');
    color = color.split(', ');
    return rgbToHex(parseInt(color[0], 10), parseInt(color[1], 10), parseInt(color[2], 10)).toUpperCase();
  }
}
