/* eslint-env jest */
import data from 'fnr-testdata';
import { valider } from 'fnr.js';
import generator from './fnr-generator';

describe('Generator', () => {
  it('skal generere bare riktige på dato', () => {
    const forDato = [...generator(new Date('2015-03-24'))];
    expect(data.mulige_24_03_2015.sort()).toEqual(forDato.sort());
  });
  it('alle på dato skal være gyldige', () => {
    for (const fnr of generator(new Date('2015-01-01'))) {
      expect(valider(fnr)).toBe(true);
    }
  });
});
