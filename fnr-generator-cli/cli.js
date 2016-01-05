#!/usr/bin/env node
var doc = 'Usage: fnr-gen';
var docopt = require('docopt').docopt;
var args = docopt(doc, { version: require('./package.json').version });

var Generator = require('fnr-generator').default;
var generator = new Generator(new Date());

var fnrs = [];
var next;
while ((next = generator.next()).done === false) {
    fnrs.push(next.value);
}
fnrs.forEach(function(x) {console.log(x);});
