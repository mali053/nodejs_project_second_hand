const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const UserFromDB = require('../models/user')

const signup = async (username, password, email, role) => {
  try {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const newUser = new UserFromDB({ username, password: hashedPassword, email, role })
    await newUser.save()
  } catch (err) {
    throw new Error(err.message)
  }
}

const login = async (id, password) => {
  try {
    const user = await UserFromDB.findById(id)
    if (!user) {
      throw new Error('User not found')
    }

    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) {
      throw new Error('Invalid password')
    }

    const token = jwt.sign({ id: user.id, username: user.username }, process.env.TOKEN_SECRET)
    return token
  } catch (err) {
    throw new Error(err.message)
  }
}

module.exports = {
  signup,
  login
}
