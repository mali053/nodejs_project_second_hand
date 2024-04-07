const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UserSchema = new Schema({
  username: { type: String, required: true, maxLength: 100 },
  password: { type: String, required: true, minLength: 5 },
  email: { type: String },
  role: { type: String }
})

UserSchema.virtual('url').get(function () {
  return `/user/${this._id}`
})

module.exports = mongoose.model('User', UserSchema)