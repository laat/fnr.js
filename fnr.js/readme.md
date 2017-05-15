# fnr.js
[![travis][travis-image]][travis-url]
[![npm][npm-image]][npm-url]

[travis-image]: https://img.shields.io/travis/laat/fnr.js.svg?style=flat
[travis-url]: https://travis-ci.org/laat/fnr.js
[npm-image]: https://img.shields.io/npm/v/fnr.js.svg?style=flat
[npm-url]: https://npmjs.org/package/fnr.js

## Install

```
$ npm install --save fnr.js
```

## Usage

```javascript test
var fnr = require('fnr.js');

fnr.valider('24031599993');
//=> true

fnr.valider('24031599994');
//=> false
```

## Contributing

### Build

```js
npm run build
```

### Test

```js
npm test
```

## License

MIT © [Sigurd Fosseng](https://github.com/laat)
<!-- test-main: "./src/fnr" -->
