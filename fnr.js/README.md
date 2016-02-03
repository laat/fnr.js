# fnr.js
[![travis][travis-image]][travis-url]
[![npm][npm-image]][npm-url]
[![js-standard-style][standard-style-image]][standard-style-url]

[travis-image]: https://img.shields.io/travis/laat/fnr.js.svg?style=flat
[travis-url]: https://travis-ci.org/laat/fnr.js
[npm-image]: https://img.shields.io/npm/v/fnr.js.svg?style=flat
[npm-url]: https://npmjs.org/package/fnr.js
[standard-style-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat
[standard-style-url]: https://github.com/feross/standard

## Install

```
$ npm install --save fnr.js
```

## Usage

```javascript
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

MIT © [Sigurd Fosseng](github.com/laat)
