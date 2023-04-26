import { request, response } from 'express'
import { FileManager } from '../dao/manager/file.manager.js'
import { Product } from '../dao/entities/Product.js'
import { productManager as PM } from '../dao/manager/products.manager.js'
import { cartManager as CM } from '../dao/manager/carts.manager.js'

const path = './database/products.json'
const productService = new FileManager(path)

const getProducts = async (req = request, res = response) => {
  try {
    const options = req.query
    console.log(options)
    const products = await PM.getList(options)/* await productService.getList() */

    // if (options.limit) {
    //   products = products.slice(0, options.limit)
    // }
    // if (!products.success) { throw new Error('SERVICE_ERROR') }
    res.status(200).json(products)
  } catch (e) {
    res.status(500).json({ ERROR: `${e.message}` })
  }
}

const renderProducts = async (req = request, res = response) => {
  try {
    const cart = await CM.createCart()
    const products = await PM.getList(req)
    console.log('RENDER_CART:: 🚩', cart)
    const { payload } = products
    const cartId = cart._id
    console.log('🚩🚩', cartId)
    res.render('productos', { payload, cartId })
  } catch (e) {
    res.status(500).json({ ERROR: `${e.message}` })
  }
}

const getProductById = async (req = request, res = response) => {
  try {
    const product = await productService.getItemById(req.params.pid)
    if (!product.success) { throw new Error('SERVICE_ERROR') }
    res.status(200).json(product)
  } catch (e) {
    res.status(500).json(e)
  }
}

const newProduct = async (req, res, next) => {
  try {
    const data = req.body
    console.log(data)
    const result = await PM.save(data)
    console.log(result)
    res.json(result)
  } catch (e) {
    res.status(404).json(e.message)
    next()
  }
}

const createProduct = async (req, res, next) => {
  try {
    const product = new Product({
      ...req.body
    })
    const newProduct = await productService.createItem(product)
    console.log(newProduct.success)
    if (!newProduct.success) { throw new Error('SERVICE_ERROR') }
    res.status(200).json(newProduct)
  } catch (e) {
    res.status(404).json(e.message)
  }
}

const updateProduct = async (req, res) => {
  try {
    const product = new Product({
      ...req.body
    })
    const updatedProduct = await productService.updateItem(req.params.pid, product)
    if (!updatedProduct.success) { throw new Error('SERVICE_ERROR') }
    res.status(200).json(updatedProduct)
  } catch (e) {
    res.status(404).json(e.message)
  }
}

const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await productService.deleteProduct(req.params.pid)
    if (!deletedProduct.success) { throw new Error('SERVICE_ERROR') }
    res.status(200).json(deletedProduct)
  } catch (e) {
    res.status(404).json(e.message)
  }
}

export {
  getProducts,
  getProductById,
  createProduct,
  newProduct,
  updateProduct,
  deleteProduct,
  renderProducts
}
