import { Router } from 'express'
import { createCart, getCartById, createProductCart } from '../controllers/cartsController.js'

export const cartsRouter = Router()

cartsRouter.get('/:cid', getCartById)
cartsRouter.post('/:cid/product', createProductCart)
cartsRouter.post('/', createCart)