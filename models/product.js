const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ProductSchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  categoryId: { type: Schema.Types.ObjectId, ref: 'Category' }
})

ProductSchema.virtual('url').get(function () {
  return `/product/${this._id}`
})

module.exports = mongoose.model('Product', ProductSchema)
