import { beregnKontrollsiffer1, beregnKontrollsiffer2 } from 'fnr.js'

function * lopenrGenerator (dato) {
  var lopenr = 0
  if (dato.getFullYear() < 1900) {
    lopenr = 500
  } else if (dato.getFullYear() < 2000) {
    lopenr = 0
  } else if (dato.getFullYear() < 2040) {
    lopenr = 500
  } else {
    throw new Error('Ugyldig dato argument')
  }

  var inkLopenr = function () {
    var aar = dato.getFullYear()
    if (aar < 1900 && lopenr >= 500 && lopenr < 749) {
      return ++lopenr
    } else if (aar >= 1900 && aar < 1945 && lopenr < 499) {
      return ++lopenr
    } else if (aar >= 1945 && aar < 2000 && lopenr < 498) {
      return ++lopenr
    } else if (aar >= 1945 && aar < 2000 && lopenr === 499) {
      lopenr = 900
      return 499
    } else if (aar >= 1945 && aar < 2000 && lopenr >= 900 && lopenr < 999) {
      return ++lopenr
    } else if (aar >= 2000 && aar < 2040 && lopenr >= 500 && lopenr < 999) {
      return ++lopenr
    }
    return lopenr
  }

  yield lopenr
  while (lopenr !== inkLopenr()) {
    yield lopenr
  }
}

export default function * generator (dato) {
  if (!(dato instanceof Date) || dato.getFullYear() < 1854) {
    throw new Error('Ugyldig dato argument')
  }
  const fnrDato = fodselsnummerFormatDato(dato)

  for (let lopenr of lopenrGenerator(dato)) {
    let fnr = fnrDato + padNumber(lopenr, 3)
    let k1 = beregnKontrollsiffer1(fnr)
    if (k1 === 10) continue
    fnr = fnr + k1.toString()

    var k2 = beregnKontrollsiffer2(fnr)
    if (k2 === 10) continue

    fnr = fnr + k2.toString()
    yield fnr
  }
}

// helpers
function fodselsnummerFormatDato (dato) { // ddMMyy
  var dd = dato.getDate()
  var mm = dato.getMonth() + 1
  var yy = dato.getFullYear() % 100

  return padNumber(dd, 2) + padNumber(mm, 2) + padNumber(yy, 2)
}

function padNumber (n, width) {
  n = n + ''
  return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n
}
