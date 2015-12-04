export function beregnKontrollsiffer (fodselsnummer, multiplikatorTabell) {
  var sum = 0
  for (var i = 0; i < multiplikatorTabell.length; i++) {
    sum += parseInt(fodselsnummer[i], 10) * multiplikatorTabell[i]
  }
  var rest = sum % 11

  if (rest === 0) return 0
  return 11 - rest
}
