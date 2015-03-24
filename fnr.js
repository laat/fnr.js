exports.valider = function valider(fnr) {
    if (typeof fnr !== 'string') {
        throw 'fødselsnummer er ikke en streng';
    }

    if(fnr.split('').filter(function(d){
        return !isNaN(parseInt(d, 10));
    }).length !== 11){
        return false; // er ikke 11 tall lang, fjernet NaN.
    }

    return parseInt(fnr[9], 10) === beregnKontrollsiffer1(fnr) &&
        parseInt(fnr[10], 10) === beregnKontrollsiffer2(fnr);
};


exports.generator = function(dato){
    if (!(dato instanceof Date) || dato.getFullYear() < 1854) {
        throw 'ugyldig dato argument';
    }
    var lopenr = 0;
    if(dato.getFullYear() < 1900) {
        lopenr = 500;
    }else if(dato.getFullYear() < 2000) {
        lopenr = 0;
    }else if(dato.getFullYear() < 2040) {
        lopenr = 500;
    } else {
        throw 'ugyldig dato argument';
    }

    var inkLopenr = function(){
        var aar = dato.getFullYear();
        if(aar < 1900 && lopenr >= 500 && lopenr < 750 ){
            return lopenr++;
        } else if(aar >= 1900 && aar < 1945 && lopenr < 500){
            return lopenr++;
        } else if(aar >= 1945 && aar < 2000 && lopenr < 499){
            return lopenr++;
        } else if(aar >= 1945 && aar < 2000 && lopenr == 499){
            lopenr = 900;
            return 499;
        } else if(aar >= 1945 && aar < 2000 && lopenr >= 900 && lopenr < 1000){
            return lopenr++;
        } else if(aar >= 2000 && aar < 2040 && lopenr >= 500 && lopenr < 1000){
            return lopenr++;
        }
    };

    var harFlereLopenr = function(){
        var aar = dato.getFullYear();
        if(aar < 1900 && lopenr < 750 && lopenr >= 500){
            return true;
        } else if(aar >= 1900 && aar < 1945 && lopenr < 500){
            return true;
        } else if(aar >= 1945 && aar < 2000 && lopenr < 499){
            return true;
        } else if(aar >= 1945 && aar < 2000 && lopenr == 499){
            return true;
        } else if(aar >= 1945 && aar < 2000 && lopenr >= 900 && lopenr < 1000){
            return true;
        } else if(aar >= 2000 && aar < 2040 && lopenr >= 500 && lopenr < 1000){
            return true;
        }
        return false;
    };

    var generer = function(){
        var fnr = "";
        while(harFlereLopenr() && fnr === "") {
            var fnrStart = fodselsnummerFormatDato(dato) + format3d(inkLopenr());

            k1 = beregnKontrollsiffer1(fnrStart);
            if(k1 === 10) continue;
            fnrStart = fnrStart + k1.toString();

            k2 = beregnKontrollsiffer2(fnrStart);
            if(k2 === 10) continue;

            fnr = fnrStart + k2.toString();
        }
        return fnr;
    };

    var harNeste = function(){
        var lopenrTmp = lopenr;
        var nyttFnr = generer();
        lopenr = lopenrTmp;
        return nyttFnr !== '';
    };

    return {
        next: function(){
            var value = generer();
            var done = !harNeste();
            return {done: done, value: value};
        }
    };
};

// kontrollsiffere
function beregnKontrollsiffer(fodselsnummer, multiplikatorTabell){
    var sum = 0;
    for(var i = 0; i<multiplikatorTabell.length; i++){
        sum += parseInt(fodselsnummer[i], 10) * multiplikatorTabell[i];
    }
    var rest = sum % 11;

    if(rest === 0) return 0;
    return 11-rest;
}

function beregnKontrollsiffer1(fodselsnummer) {
    var kontrollSiffer1Multiplikatorer = [ 3, 7, 6, 1, 8, 9, 4, 5, 2 ];
    return beregnKontrollsiffer(fodselsnummer, kontrollSiffer1Multiplikatorer);
}


function beregnKontrollsiffer2(fodselsnummer) {
    var kontrollSiffer2Multiplikatorer = [ 5, 4, 3, 2, 7, 6, 5, 4, 3, 2 ];
    return beregnKontrollsiffer(fodselsnummer, kontrollSiffer2Multiplikatorer);
}


// helpers
function fodselsnummerFormatDato(dato) { //ddMMyy
    var dd = dato.getDate(),
    mm = dato.getMonth()+1,
    yy = dato.getFullYear() % 100;

    if(dd<10) dd = '0'+dd;
    if(mm<10) mm = '0'+mm;
    if(yy<10) yy = '0'+yy;

    return dd.toString()+mm.toString()+yy.toString();
}


function format3d(value) { // naïve String.format("%03d", value);
    if(value < 10) return '00'+value;
    if(value < 100) return '0'+value;
    if(value < 1000) return value.toString();
    throw 'too high value, should not happen';
}
