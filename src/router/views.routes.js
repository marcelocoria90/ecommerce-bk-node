import express, { Router } from 'express'
import { renderProducts } from '../controllers/product.controllers.js'
import { renderMessages } from '../controllers/message.controller.js'

import { registroView } from '../controllers/registro.controller.js'
import { soloAutenticados } from '../middlewares/autenticacionWeb.js'
import { profileView } from '../controllers/perfil.controller.js'
import { loginView } from '../controllers/login.controller.js'

export const viewRouter = Router()

viewRouter.use(express.json())
viewRouter.use(express.urlencoded({ extended: true }))

viewRouter.get('/', (_req, res) => {
  res.redirect('/products')
})

viewRouter.get('/products', renderProducts)

viewRouter.get('/productos', (req, res, next) => {
  res.render('altaProductos', { pageTitle: 'Carga de Productos 🗃️' })
})

viewRouter.get('/chat', renderMessages)

viewRouter.get('/login', loginView)
viewRouter.get('/register', registroView)
viewRouter.get('/profile', soloAutenticados, profileView)
