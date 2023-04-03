import { request, response } from 'express'
import { FileManager } from '../services/FileManager.js'
import { Product } from '../entitys/Product.js'

const path = './database/products.json'
const productService = new FileManager(path)

const getProducts = async (req = request, res = response) => {
  try {
    let products = await productService.getList()
    if (req.query.limit) {
      products = products.slice(0, req.query.limit)
    }
    if (!products.success) { throw new Error('SERVICE_ERROR') }
    res.status(200).json(products)
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

const createProduct = async (req, res) => {
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

export { getProducts, getProductById, createProduct, updateProduct, deleteProduct }
