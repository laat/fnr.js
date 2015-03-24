# fnr.js
Genererer og validerer fødselsnummer

```
npm install fnr.js
```

## Usage

``` js
var fnr = require('fnr.js')

// generer på en dato

var gen = fnr.generator(new Date);
gen.next(); // {done: false, value: "<fødselsnummer>"}
gen.next(); // {done: false, value: "<annet fødselsnummer>"}

// valider et fnr
fnr.valider("01018600100"); // false

// kombo
fnr.valider(gen.next().value);
```

## License

MIT
