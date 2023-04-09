import express, { Router } from 'express'
import { renderProducts } from '../controllers/product.controllers.js'
import { renderMessages } from '../controllers/message.controller.js'

export const viewRouter = Router()

viewRouter.use(express.json())
viewRouter.use(express.urlencoded({ extended: true }))

viewRouter.get('/', renderProducts)

viewRouter.get('/productos', (req, res, next) => {
  res.render('altaProductos', { pageTitle: 'Carga de Productos 🗃️' })
})

viewRouter.get('/chat', renderMessages)
