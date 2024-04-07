const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const mongoDB = process.env.MONGODB_URI;

const connectToDatabase = async () => {
  try {
    await mongoose.connect(mongoDB)
    console.log('MongoDB connected')
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
  }
}

module.exports = connectToDatabase
