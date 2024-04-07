const productService = require('../services/productService')

const getProductById = async (req, res) => {
  try {
    const categoryId = req.params.categoryId
    console.log(categoryId);

    const product = await productService.getProductByCategoryId(categoryId)

    res.send(product)
  } catch (err) {
    res.status(404).send('Product not found')
  }
}

const getProductByIdAndCategoryId = async (req, res) => {
  try {
    const productId = req.params.productId
    const categoryId = req.params.categoryId
    const product = await productService.getProductByIdAndCategoryId(productId, categoryId)
    res.send(product)
  } catch (err) {
    res.status(404).send('Product not found or does not belong to the specified category')
  }
}

const addProduct = async (req, res) => {
  try {
    const { name, categoryId } = req.body
    await productService.addProduct(name, categoryId)
    res.status(201).send('Product added successfully')
  } catch (err) {
    console.error(err)
    res.status(500).send(err.message)
  }
}

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.productId
    const { name, categoryId } = req.body
    await productService.updateProduct(productId, name, categoryId)
    res.send('Product updated successfully')
  } catch (err) {
    res.status(404).send('Product not found')
  }
}

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.productId
    await productService.deleteProduct(productId)
    res.send('Product deleted successfully')
  } catch (err) {
    res.status(404).send('Product not found')
  }
}

module.exports = {
  getProductById,
  getProductByIdAndCategoryId,
  addProduct,
  updateProduct,
  deleteProduct
}
