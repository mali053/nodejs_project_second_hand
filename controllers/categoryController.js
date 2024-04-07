const categoryService = require('../services/categoryService')

const getAllCategories = async (req, res) => {
  try {
    const category = await categoryService.getAllCategories()
    res.send(category)
  } catch (err) {
    res.status(404).send('categories not found')
  }
}

const getCategoryById = async (req, res) => {
  try {
    const id = req.params.categoryID
    const oneCategory = await categoryService.getCategoryById(id)
    if (!oneCategory) {
      res.status(404).send('Category not found or you didn\'t provide a category ID in the request')
      return
    }
    res.send(oneCategory)
  } catch (err) {
    res.status(500).send('Internal Server Error')
  }
}

const addCategory = async (req, res) => {
  try {
    const name = req.body.name
    const addCategory = await categoryService.addCategory(name)
    res.send('the category added successfully: ' + addCategory)
  } catch (err) {
    res.status(500).send(err.message)
  }
}

const updateCategory = async (req, res) => {
  try {
    const id = req.params.categoryID
    const updatedCategory = await categoryService.updateCategory(id, req.body.name)
    res.send('The category updated successfully: ' + updatedCategory)
  } catch (err) {
    res.status(404).send('Cannot update not found category: ' + err.message)
  }
}

const deleteCategory = async (req, res) => {
  try {
    const id = req.params.categoryID
    await categoryService.deleteCategory(id)
    res.send('the category deleted successfully')
  } catch (err) {
    res.status(404).send('Cannot delete category ')
  }
}

module.exports = {
  getAllCategories,
  getCategoryById,
  addCategory,
  updateCategory,
  deleteCategory
}
