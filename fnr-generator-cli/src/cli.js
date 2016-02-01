#!/usr/bin/env node

var doc = `
Usage:
  fnr-gen [--age=<years>] [--date=<date>]
`
import 'babel-polyfill'
import { docopt } from 'docopt'
import moment from 'moment'
import generator from 'fnr-generator'

var args = docopt(doc, { version: require('../package.json').version })

let date
if (args['--age']) {
  date = moment().subtract(args['--age'], 'years')
} else if (args['--date']) {
  date = moment(moment(args['--date'], 'DD-MM-YYYY'))
} else {
  date = moment()
}

[...generator(new Date(date))].forEach(x => console.log(x))
