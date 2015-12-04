import { beregnKontrollsiffer1, beregnKontrollsiffer2 } from 'fnr.js'

export default function Generator (dato) {
  if (!(dato instanceof Date) || dato.getFullYear() < 1854) {
    throw new Error('Ugyldig dato argument')
  }
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
    if (aar < 1900 && lopenr >= 500 && lopenr < 750) {
      return lopenr++
    } else if (aar >= 1900 && aar < 1945 && lopenr < 500) {
      return lopenr++
    } else if (aar >= 1945 && aar < 2000 && lopenr < 499) {
      return lopenr++
    } else if (aar >= 1945 && aar < 2000 && lopenr === 499) {
      lopenr = 900
      return 499
    } else if (aar >= 1945 && aar < 2000 && lopenr >= 900 && lopenr < 1000) {
      return lopenr++
    } else if (aar >= 2000 && aar < 2040 && lopenr >= 500 && lopenr < 1000) {
      return lopenr++
    }
    throw new Error('Kunne ikke øke løpenummeret')
  }

  var harFlereLopenr = function () {
    var aar = dato.getFullYear()
    if (aar < 1900 && lopenr < 750 && lopenr >= 500) {
      return true
    } else if (aar >= 1900 && aar < 1945 && lopenr < 500) {
      return true
    } else if (aar >= 1945 && aar < 2000 && lopenr < 499) {
      return true
    } else if (aar >= 1945 && aar < 2000 && lopenr === 499) {
      return true
    } else if (aar >= 1945 && aar < 2000 && lopenr >= 900 && lopenr < 1000) {
      return true
    } else if (aar >= 2000 && aar < 2040 && lopenr >= 500 && lopenr < 1000) {
      return true
    }
    return false
  }

  var generer = function () {
    var fnr = ''
    while (harFlereLopenr() && fnr === '') {
      var fnrStart = fodselsnummerFormatDato(dato) + padNumber(inkLopenr(), 2)

      var k1 = beregnKontrollsiffer1(fnrStart)
      if (k1 === 10) continue
      fnrStart = fnrStart + k1.toString()

      var k2 = beregnKontrollsiffer2(fnrStart)
      if (k2 === 10) continue

      fnr = fnrStart + k2.toString()
    }
    return fnr
  }

  var harNeste = function () {
    var lopenrTmp = lopenr
    var nyttFnr = generer()
    lopenr = lopenrTmp
    return nyttFnr !== ''
  }

  return {
    next: function () {
      var value = generer()
      var done = !harNeste()
      return {done: done, value: value}
    }
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
