/* global describe, it */
var Generator = require('./dist/fnr-generator').default
var data = require('fnr-testdata')
var assert = require('chai').assert

function generate (dato) {
  var gen = new Generator(dato)
  var fnrs = []
  var har = true
  while (har) {
    var f = gen.next()
    har = !f.done
    fnrs.push(f.value)
  }
  return fnrs
}

describe('Generator', function () {
  it('skal generere bare riktige på dato', function () {
    assert.sameMembers(data.mulige_24_03_2015, generate(new Date('2015-03-24')), 'bare riktige på dato')
  })
})
