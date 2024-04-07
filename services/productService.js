const ProductsFormDB = require('../models/product')

const getProductByCategoryId = async (categoryId) => {
  try {
    const products = await ProductsFormDB.find({ categoryId })
    return products
  } catch (err) {
    throw new Error('Product not found')
  }
}

const getProductByIdAndCategoryId = async (productId, categoryId) => {
  try {
    const product = await ProductsFormDB.findById(productId)
    if (!product || product.categoryId !== categoryId) {
      throw new Error('Product not found or does not belong to the specified category')
    }
    return product
  } catch (err) {
    throw new Error('Product not found')
  }
}

const addProduct = async (name, categoryId) => {
  try {
    const newProduct = new ProductsFormDB({ name, categoryId })
    await newProduct.save()
  } catch (err) {
    throw new Error(err.message)
  }
}

const updateProduct = async (productId, newName, newCategoryId) => {
  try {
    await ProductsFormDB.findByIdAndUpdate(productId, { name: newName, categoryId: newCategoryId })
  } catch (err) {
    throw new Error('Product not found')
  }
}

const deleteProduct = async (productId) => {
  try {
    await ProductsFormDB.findByIdAndDelete(productId)
  } catch (err) {
    throw new Error('Product not found')
  }
}

module.exports = {
  getProductByCategoryId,
  getProductByIdAndCategoryId,
  addProduct,
  updateProduct,
  deleteProduct
}
