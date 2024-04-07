const express = require('express')
const app = express.Router()
const CategoriesFromDB = require('../models/category')

app.get('/:categoryID', async (req, res) => {
  try {
    const id = req.params.categoryID
    const oneCategory = await CategoriesFromDB.findById(id)
    res.send(oneCategory)
  } catch (err) {
    res.status(404)
    res.send('category not found or you don\'t put category ID in the request')
  }
})

app.get('/', async (req, res) => {
  try {
    const category = await CategoriesFromDB.find()
    const sortedCategory = category.toSorted((a, b) => {
      return a.name.localeCompare(b.name)
    })
    res.send(sortedCategory)
  } catch (err) {
    res.status(404).send('categories not found')
  }
})

app.post('/', async (req, res) => {
  try {
    const newCategory = new CategoriesFromDB({ name: req.body.name })
    await newCategory.save()
    res.send('the category added successfully')
  } catch (err) {
    res.status(500).send(err.message)
  }
})

app.put('/:categoryID', async (req, res) => {
  try {
    const id = req.params.categoryID
    await CategoriesFromDB.findByIdAndUpdate(id, { name: req.body.name })
    res.send('the category updated successfully')
  } catch (err) {
    res.status(404).send('Cannot update not found category  ' + err.message)
  }
})

app.delete('/:categoryID', async (req, res) => {
  try {
    const id = req.params.categoryID
    await CategoriesFromDB.findByIdAndDelete(id)
    res.send('the category deleted successfully')
  } catch (err) {
    res.status(404).send('Cannot delete category ')
  }
})

module.exports = app
