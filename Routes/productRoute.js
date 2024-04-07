const express = require('express')
const app = express.Router()
const productController = require('../controllers/productController')

app.get('/:categoryId', productController.getProductById)
app.get('/:categoryId/:productId', productController.getProductByIdAndCategoryId)
app.post('/', productController.addProduct)
app.put('/:productId', productController.updateProduct)
app.delete('/:productId', productController.deleteProduct)

module.exports = app