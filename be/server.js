const express = require('express')  // ใช้งาน module express
const app = express()  // สร้างตัวแปร app เป็น instance ของ express
const path = require('path') // เรียกใช้งาน path module
const createError = require('http-errors') // เรียกใช้งาน http-errors module
const port = 3000  // port 

app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

const indexRouter = require('./routes/index')
const blogRouter = require('./routes/blog')
const createCollectionRouter = require('./routes/test_create_collection')

app.use('/', indexRouter)
app.use('/blog', blogRouter)
app.use('/createCollection', createCollectionRouter)

app.listen(port, () => {
    console.log(`> Server is running on port : ${port}`)
})

module.exports = app