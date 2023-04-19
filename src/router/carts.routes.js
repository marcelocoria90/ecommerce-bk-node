import { Router } from 'express'
import {
  createCart,
  getCartById,
  createProductCart,
  deleteProductCart,
  updatedCart,
  updatedProductCart,
  deleteProductsCart
} from '../controllers/carts.controllers.js'

export const cartsRouter = Router()

cartsRouter.get('/:cid', getCartById)
cartsRouter.post('/:cid/product', createProductCart)
cartsRouter.post('/', createCart)

cartsRouter.delete('/:cid/product/:pid', deleteProductCart)
cartsRouter.put('/:cid', updatedCart)
cartsRouter.put('/:cid/product/:pid', updatedProductCart)
cartsRouter.delete('/:cid', deleteProductsCart)
