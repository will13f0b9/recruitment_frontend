var express = require('express')
var path = require('path')
var serveStatic = require('serve-static')

var app = express()
app.use(serveStatic(path.join(__dirname, 'dist')))

console.log("pre start server.js")
var port = process.env.PORT || 8080
app.listen(port)
console.log('server started ' + port)
