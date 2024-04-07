const express = require('express')
const app = express.Router()
const categoryController = require('../controllers/categoryController')

app.get('/', categoryController.getAllCategories)
app.get('/:categoryID', categoryController.getCategoryById)
app.post('/', categoryController.addCategory)
app.put('/:categoryID', categoryController.updateCategory)
app.delete('/:categoryID', categoryController.deleteCategory)

module.exports = app