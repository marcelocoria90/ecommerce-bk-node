import { Router } from 'express'
import { getProducts, getProductById, newProduct, updateProduct, deleteProduct } from '../controllers/product.controllers.js'

export const productsRouter = Router()

productsRouter.post('/', newProduct)
productsRouter.get('/', getProducts) // 🚩
productsRouter.get('/:pid', getProductById)// 🚩
productsRouter.put('/:pid', updateProduct)
productsRouter.delete('/:pid', deleteProduct)
