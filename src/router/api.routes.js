import express, { Router } from 'express'
import { productsRouter } from './products.routes.js'
import { cartsRouter } from './carts.routes.js'
import { messagesRouter } from './messages.routes.js'

export const apiRouter = Router()

apiRouter.use(express.json())
apiRouter.use(express.urlencoded({ extended: true }))

apiRouter.use('/products', productsRouter)
apiRouter.use('/carts', cartsRouter)
apiRouter.use('/messages', messagesRouter)
