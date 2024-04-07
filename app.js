require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const connectToDatabase = require('./services/dbService')
const categoryRoute = require('./routes/categoryRoute')
const productRoute = require('./routes/productRoute')
const userRoute = require('./routes/userRoute')
const middleware = require('./middleware/logMiddleware')
const { loggedIn } = require('./middleware/auth')
const port = process.env.PORT

connectToDatabase().catch((err) => console.log(err))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(middleware)
app.use('/user', userRoute)
app.use(loggedIn)
app.use('/category', categoryRoute)
app.use('/product', productRoute)

app.use((err, req, res, next) => {
  res.status(500).send('יש בעיה בשרת כרגע נסה שוב מאוחר יותר ' + err.message)
})

app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`)
})
