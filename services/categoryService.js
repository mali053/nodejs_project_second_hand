const CategoriesFromDB = require('../models/category')

const getAllCategories = async () => {
  try {
    const categories = await CategoriesFromDB.find()
    const sortedCategories = categories.sort((a, b) => {
      return a.name.localeCompare(b.name)
    })
    return sortedCategories
  } catch (err) {
    throw new Error('Categories not found')
  }
}

const getCategoryById = async (Id) => {
  try {
    const oneCategory = await CategoriesFromDB.findById(Id)
    return oneCategory
  } catch (err) {
    throw new Error('Internal Server Error')
  }
}

const addCategory = async (name) => {
  try {
    const newCategory = new CategoriesFromDB({ name })
    await newCategory.save()
  } catch (err) {
    throw new Error('Internal Server Error')
  }
}

const updateCategory = async (id, name) => {
  try {
    const updatedCategory = await CategoriesFromDB.findByIdAndUpdate(id, { name })
    return updatedCategory
  } catch (err) {
    throw new Error('Error updating category: ' + err.message)
  }
}

const deleteCategory = async (id) => {
  try {
    await CategoriesFromDB.findByIdAndDelete(id)
    return true
  } catch (err) {
    throw new Error('Error deleting category: ' + err.message)
  }
}

module.exports = {
  getAllCategories,
  getCategoryById,
  addCategory,
  updateCategory,
  deleteCategory
}
