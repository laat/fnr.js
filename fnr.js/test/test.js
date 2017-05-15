/* eslint-env jest */
const fnr = require('../src/fnr');
const data = require('fnr-testdata');

describe('Validator', () => {
  it('alle gyldige på dato skal valideres som gyldig', () => {
    data.mulige_24_03_2015.forEach((d) => {
      expect(fnr.valider(d)).toBe(true);
    });
  });
  it('11 gyldige 1 ugyldig appended', () => {
    expect(fnr.valider('0203169617009')).toBe(false);
  });
  it('lengde 11 med tekst', () => {
    expect(fnr.valider('a20316961700')).toBe(false);
  });
});
