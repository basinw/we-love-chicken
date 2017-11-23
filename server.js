require('dotenv').config()

// -----------------------
//   IMPORT DEPENDENCIES
// -----------------------
const express = require('express')
require('express-group-routes')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const path = require('path')
const mysql = require('mysql')

// ----------------------
//     INITIAL SERVER
// ----------------------
const server = express()
server.use(cors())
server.use(cookieParser())
server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())

let credentials
try{
	credentials = require('./credentials') //CREATE THIS FILE YOURSELF
}catch(e){
	//heroku support
	credentials = require('./server/credential')
}

// Setup MySQL Connection
let connection  = mysql.createConnection(credentials)
// Connect to MySQL DB
connection.connect()

// Get the Routes for our API
// API V.1
let apiRouter = require('./server/routes')(express, connection)

// const routes = require('./server/routes.js')
server.use('/api/v1', apiRouter)

if (process.env.NODE_ENV === 'PRODUCTION') {
    server.use(express.static(path.resolve(__dirname, '.', 'build')))
    server.get('/*', function (req, res) {
      res.sendFile(path.join(__dirname, 'build', 'index.html'))
    })
}

var port = 3001
if (process.env.PORT !== undefined){
    port = process.env.PORT
}
var app = server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
})

module.exports = server