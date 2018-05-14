const express = require('express')
const app = express()
const http = require('http')
const port = 8080

app.get('/*', express.static('./'))


http.createServer(app).listen(port, () => {
    console.log('Servidor HTTP http://localhost:' + port)
    console.log('funfando')
})