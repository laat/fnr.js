import { beregnKontrollsiffer } from './kontrollsiffer'

export function beregnKontrollsiffer1 (fodselsnummer) {
  var kontrollSiffer1Multiplikatorer = [ 3, 7, 6, 1, 8, 9, 4, 5, 2 ]
  return beregnKontrollsiffer(fodselsnummer, kontrollSiffer1Multiplikatorer)
}

export function beregnKontrollsiffer2 (fodselsnummer) {
  var kontrollSiffer2Multiplikatorer = [ 5, 4, 3, 2, 7, 6, 5, 4, 3, 2 ]
  return beregnKontrollsiffer(fodselsnummer, kontrollSiffer2Multiplikatorer)
}

export function valider (fnr) {
  return parseInt(fnr[9], 10) === beregnKontrollsiffer1(fnr) &&
  parseInt(fnr[10], 10) === beregnKontrollsiffer2(fnr)
}
