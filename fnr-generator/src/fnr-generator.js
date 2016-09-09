import { beregnKontrollsiffer1, beregnKontrollsiffer2 } from 'fnr.js';

function padNumber(n, width) {
  const s = n.toString();
  return s.length >= width ? s : new Array(width - s.length + 1).join('0') + s;
}

function fodselsnummerFormatDato(dato) { // ddMMyy
  const dd = dato.getDate();
  const mm = dato.getMonth() + 1;
  const yy = dato.getFullYear() % 100;

  return padNumber(dd, 2) + padNumber(mm, 2) + padNumber(yy, 2);
}


function* lopenrGenerator(dato) {
  let lopenr = 0;
  if (dato.getFullYear() < 1900) {
    lopenr = 500;
  } else if (dato.getFullYear() < 2000) {
    lopenr = 0;
  } else if (dato.getFullYear() < 2040) {
    lopenr = 500;
  } else {
    throw new Error('Ugyldig dato argument');
  }

  const inkLopenr = () => {
    const aar = dato.getFullYear();
    if (aar < 1900 && lopenr >= 500 && lopenr < 749) {
      return ++lopenr;
    } else if (aar >= 1900 && aar < 1945 && lopenr < 499) {
      return ++lopenr;
    } else if (aar >= 1945 && aar < 2000 && lopenr < 498) {
      return ++lopenr;
    } else if (aar >= 1945 && aar < 2000 && lopenr === 499) {
      lopenr = 900;
      return 499;
    } else if (aar >= 1945 && aar < 2000 && lopenr >= 900 && lopenr < 999) {
      return ++lopenr;
    } else if (aar >= 2000 && aar < 2040 && lopenr >= 500 && lopenr < 999) {
      return ++lopenr;
    }
    return lopenr;
  };

  do {
    yield lopenr;
  } while (lopenr !== inkLopenr());
}

export default function* generator(dato) {
  if (!(dato instanceof Date) || dato.getFullYear() < 1854) {
    throw new Error('Ugyldig dato argument');
  }
  const fnrDato = fodselsnummerFormatDato(dato);

  for (const lopenr of lopenrGenerator(dato)) {
    let fnr = fnrDato + padNumber(lopenr, 3);
    const k1 = beregnKontrollsiffer1(fnr);
    if (k1 === 10) continue;
    fnr += k1.toString();

    const k2 = beregnKontrollsiffer2(fnr);
    if (k2 === 10) continue;

    fnr += k2.toString();
    yield fnr;
  }
}
