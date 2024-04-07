const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const mongoDB = 'mongodb://localhost:27017/my_database'

main().catch((err) => console.log(err))

async function main () {
  await mongoose.connect(mongoDB)
  console.log('mongoDB connected')
}

const category = require('./controllers/categoryController')
const product = require('./controllers/productController')
const userRoute = require('./routes/userRoute')
const middleware = require('./middleware/logMiddleware')
const { loggedIn } = require('./middleware/auth')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(middleware)
app.use('/user', userRoute)
app.use(loggedIn)
app.use('/category', category)
app.use('/product', product)

app.use((err, req, res, next) => {
  res.status(500).send('יש בעיה בשרת כרגע נסה שוב מאוחר יותר ' + err.message)
})

app.listen(3000, () => {
  console.log('listening on http://localhost:3000')
})
