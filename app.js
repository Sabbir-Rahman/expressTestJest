const express  = require("express")
const app = express()
const port = 5000

var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')

var indexRouter = require('./routers/index')
var usersRouter = require('./routers/users')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/users',usersRouter)



// app.listen(port, () => {
//     console.log(`Server is running on ${port}`)
// })

module.exports = app
