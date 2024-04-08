const url = require('url')
const adress = 'https://www.example.com/path/to/resource?param1=value1#section'
const parseUrl = new url.URL(adress)

console.log(parseUrl.host)
console.log(parseUrl.pathname)
console.log(parseUrl.search)
console.log(parseUrl.searchParams)
console.log(parseUrl.hash)