import { beregnKontrollsiffer } from './kontrollsiffer';

/**
 * Beregner kontrollsiffer 1 i fødselsnummeret.
 */
export function beregnKontrollsiffer1(fodselsnummer) {
  const kontrollSiffer1Multiplikatorer = [3, 7, 6, 1, 8, 9, 4, 5, 2];
  return beregnKontrollsiffer(fodselsnummer, kontrollSiffer1Multiplikatorer);
}

/**
 * Beregner kontrollsiffer 2 i fødselsnummeret.
 */
export function beregnKontrollsiffer2(fodselsnummer) {
  const kontrollSiffer2Multiplikatorer = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];
  return beregnKontrollsiffer(fodselsnummer, kontrollSiffer2Multiplikatorer);
}

/**
 * Validerer et fødselsnummer.
 * @param fnr - fødselsnummer
 */
export function valider(fnr) {
  if (fnr.length !== 11) {
    return false;
  }
  return parseInt(fnr[9], 10) === beregnKontrollsiffer1(fnr) &&
  parseInt(fnr[10], 10) === beregnKontrollsiffer2(fnr);
}
