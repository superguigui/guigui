var assert = require('assert')
var prefix = require('..')

describe('prefix', function(){
  it ('should not prefix things which don\'t need prefixes', function(){
    assert(prefix('border') == 'border')
  })

  it('should format dashed properties', function(){
    assert(prefix('background-color') == 'backgroundColor')
  })

  it ('may return a prefixed dom style for css3 style like transform', function(){
    assert(prefix('transform') in possibilities('transform'))
  })

  it('should memoize results', function(){
    assert(prefix('border') == 'border')
    assert(prefix('border') == 'border')
    assert(prefix('transform') in possibilities('transform'))
    assert(prefix('transform') in possibilities('transform'))
  })

  it ('should return key as is if it can\'t find a correct key', function(){
    assert(prefix('some invalid key') == 'some invalid key')
  })
})

describe('dash', function(){
  var transformPossibilites = {
    '-webkit-transform': null,
    '-moz-transform': null,
    '-ms-transform': null,
    '-o-transform': null,
    'transform': null
  }

  it('should create a dasherized string', function(){
    assert(prefix.dash('transform') in transformPossibilites)
  })

  it('should work if invoked many times', function(){
    assert(prefix.dash('transform') in transformPossibilites)
    assert(prefix.dash('transform') == prefix.dash('transform'))
  })
})

function possibilities(key){
  return 'Moz O ms Webkit'.split(' ').map(function(pre){
    return pre + capitalize(key)
  }).concat(key).reduce(function(o, k){
    o[k] = true
    return o
  }, {})
}

function capitalize(str){
  return str.charAt(0).toUpperCase() + str.slice(1)
}
