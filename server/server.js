const express = require('express')
const mysql = require('mysql')
const myconn = require('express-myconnection')
const path = require('path')
const cors = require('cors')
const app = express()
app.use(myconn(mysql, {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dominguez_rodolfo'
}))
app.use(cors())
app.use(express.static(path.join(__dirname, 'dbimagenes')))
app.use(require('./routes/routes'))
app.listen(8000, () => {
    console.log('server running on', 'http://localhost:' + 8000)
})