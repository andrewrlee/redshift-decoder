const fs = require('fs')
const decrypt = require('./src/decrypt')

const text = fs.readFileSync('./text.txt').toString()
const result = decrypt(text)
console.log(result)
