#!/usr/bin/env node
var url = require('url')
var quote = require('shell-quote').quote

function print(key, value) {
  console.log(key + "=" + quote([value]))
}

var parsed = url.parse(process.argv[2])
var split = parsed.auth.split(':', 2)
print("HOST", parsed.host)
print("USER", split[0])
print("PASSWORD", split[1])
print("DATABASE", parsed.pathname.slice(1))
