/* global describe, it */
import 'babel-polyfill'
import generator from './fnr-generator.js'
import data from 'fnr-testdata'
import { assert } from 'chai'
import { valider } from 'fnr.js'

describe('Generator', function () {
  it('skal generere bare riktige på dato', function () {
    assert.sameMembers(data.mulige_24_03_2015, [...generator(new Date('2015-03-24'))], 'bare riktige på dato')
  })
  it('alle på dato skal være gyldige', function () {
    for (let fnr of generator(new Date('2015-01-01'))) {
      assert(valider(fnr))
    }
  })
})
