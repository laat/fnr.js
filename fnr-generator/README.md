# fnr-generator
[![travis][travis-image]][travis-url]
[![npm][npm-image]][npm-url]
[![js-standard-style][standard-style-image]][standard-style-url]

[travis-image]: https://img.shields.io/travis/laat/fnr.js.svg?style=flat
[travis-url]: https://travis-ci.org/laat/fnr.js
[npm-image]: https://img.shields.io/npm/v/fnr-generator.svg?style=flat
[npm-url]: https://npmjs.org/package/fnr-generator
[standard-style-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat
[standard-style-url]: https://github.com/feross/standard

## Install

```
$ npm install --save fnr-generator
```

## Usage

```js
var Generator = require('fnr-generator').default;

var generator = new Generator(new Date())

generator.next()
// { done: false, value: '16121550060' }

generator.next()
// { done: false, value: '16121550141' }
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
