#!/usr/bin/env node
'use strict';

var _docopt = require('docopt');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var doc = '\nUsage:\n  fnr-gen [--age=<years>] [--date=<date>]\n';

var args = (0, _docopt.docopt)(doc, { version: require('../package.json').version });

var date = undefined;
if (args['--age']) {
  date = (0, _moment2.default)().subtract(args['--age'], 'years');
} else if (args['--date']) {
  date = (0, _moment2.default)((0, _moment2.default)(args['--date'], 'DD-MM-YYYY'));
} else {
  date = (0, _moment2.default)();
}

var Generator = require('fnr-generator').default;
var generator = new Generator(new Date(date));

var fnrs = [];
var next;

while ((next = generator.next()).done === false) {
  fnrs.push(next.value);
}

fnrs.forEach(function (x) {
  return console.log(x);
});