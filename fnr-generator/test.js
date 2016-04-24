/* eslint-env mocha */
import 'babel-polyfill';
import generator from './fnr-generator.js';
import data from 'fnr-testdata';
import { assert } from 'chai';
import { valider } from 'fnr.js';

describe('Generator', () => {
  it('skal generere bare riktige på dato', () => {
    const forDato = [...generator(new Date('2015-03-24'))];
    assert.sameMembers(data.mulige_24_03_2015, forDato, 'bare riktige på dato');
  });
  it('alle på dato skal være gyldige', () => {
    for (const fnr of generator(new Date('2015-01-01'))) {
      assert(valider(fnr));
    }
  });
});
