#! /usr/bin/env node
const minimist = require('minimist')
const resolve = require('resolve')
const { mapKeys, camelCase } = require('lodash')

const args = minimist(process.argv.slice(2))
const command = args._
delete args._
const flags = mapKeys(args, (v, k) => camelCase(k) )

let shepPath

try {
  shepPath = resolve.sync('shep', { basedir: process.cwd() })
} catch (e) {
  shepPath = './index'
}

const shep = require(shepPath)

if (shep[command]){
  shep[command](flags).catch((err) => { console.log(err.message); process.exit(1)})
} else {
  console.log(`${command} is not a valid command`)
  process.exit(1)
}


// READ IN API.json
// READ IN project package.json
