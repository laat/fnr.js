/* global describe, it */
var fnr = require('../dist/fnr')
var data = require('fnr-testdata')
var assert = require('chai').assert

describe('Validator', function () {
  it('alle gyldige på dato skal valideres som gyldig', function () {
    data.mulige_24_03_2015.forEach(function (d) {
      assert.isTrue(fnr.valider(d), 'skal være gyldig')
    })
  })
})
