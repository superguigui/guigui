var Component = require('../base/Component');
var css = require('../utils/styles/css');
var computeTogglerStyle = require('../styles/components/toggler');


function Toggler(object, property, options) {
  Component.call(this, object, property, options);

  this.onTogglerClick = this.onTogglerClick.bind(this);

  // options
  options = options || {};
  this.targetObject = object;
  this.targetProperty = property;
  this.labelText = options.label || property;
  this.callbackScope = options.scope || this.targetObject;

  this.isSelected = false;

  // dom template of the component
  this.template = [
    '<div class="gg-toggler-label">' + this.labelText + '</div>',
    '<div class="gg-toggler-state">',
      '<div class="gg-toggler-handle"></div>',
    '</div>',
  ].join('\n');

  // manage dom
  this.$el.className = 'gg-toggler';
  this.$el.innerHTML = this.template;

  this.$handle = this.$el.querySelector('.gg-toggler-handle');

  console.log('Togglet', this.targetProperty, this.targetObject[this.targetProperty]);
  if(this.targetObject[this.targetProperty] === true) {
    this.isSelected = true;
    css(this.$handle, {display: 'block'});
  }
  else {
    css(this.$handle, {display: 'none'});
  }

  // create event listeners
  this.$el.addEventListener('click', this.onTogglerClick);
}

Toggler.prototype = Object.create(Component.prototype);
Toggler.prototype.constructor = Toggler;

Toggler.prototype.remove = function() {
  this.$el.removeEventListener('click', this.onTogglerClick);
  Component.prototype.remove.call(this);
};

Toggler.prototype._applyStyles = function(theme) {
  var togglerStyle = computeTogglerStyle(theme);

  css(this.$el, togglerStyle.main);
  css(this.$el, '.gg-toggler-label', togglerStyle.label);
  css(this.$el, '.gg-toggler-state', togglerStyle.state);
  css(this.$handle, togglerStyle.handle);

  Component.prototype._applyStyles.call(this, theme);
};

/* =============================================================================
  Events
============================================================================= */
Toggler.prototype.onTogglerClick = function(e) {
  this.onStartInteraction();
  this.value = !this.value;
  this.onEndInteraction();
};

Toggler.prototype.invalidate = function() {
  Component.prototype.invalidate.call(this);
  this.value = this._value;
};

/* =============================================================================
  Getters Setters
============================================================================= */
Object.defineProperties(Toggler.prototype, {
  value: {
    get: function() {
      return this.isSelected;
    },
    set: function(value) {
      if(value) {
        this.isSelected = true;
        css(this.$handle, {display: 'block'});
      }
      else {
        this.isSelected = false;
        css(this.$handle, {display: 'none'});
      }
      this.targetObject[this.targetProperty] = value;
      this.emit('update', value);
    }
  }
});

module.exports = Toggler;
