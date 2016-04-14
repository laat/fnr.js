/* global describe, it */
var fnr = require('../lib/fnr')
var data = require('fnr-testdata')
var assert = require('chai').assert

describe('Validator', function () {
  it('alle gyldige på dato skal valideres som gyldig', function () {
    data.mulige_24_03_2015.forEach(function (d) {
      assert.isTrue(fnr.valider(d), 'skal være gyldig')
    })
  })
  it('11 gyldige 1 ugyldig appended', function () {
    assert.isFalse(fnr.valider('0203169617009'))
  })
  it('lengde 11 med tekst', function () {
    assert.isFalse(fnr.valider('a20316961700'))
  })
})
