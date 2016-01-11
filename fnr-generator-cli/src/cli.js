#!/usr/bin/env node
var doc = `
Usage:
  fnr-gen [--age=<years>] [--date=<date>]
`
import { docopt } from 'docopt'
import moment from 'moment'
var args = docopt(doc, { version: require('../package.json').version })

let date
if (args['--age']) {
  date = moment().subtract(args['--age'], 'years')
} else if (args['--date']) {
  date = moment(moment(args['--date'], 'DD-MM-YYYY'))
} else {
  date = moment()
}

var Generator = require('fnr-generator').default
var generator = new Generator(new Date(date))

var fnrs = []
var next

while ((next = generator.next()).done === false) {
  fnrs.push(next.value)
}

fnrs.forEach(x => console.log(x))
