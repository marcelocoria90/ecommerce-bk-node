import { Router } from 'express'
import { authControllers, signinHandler, signupHandler } from '../../controllers/api/auth.controllers.js'
import { auth } from '../../middlewares/authJwt.middleware.js'
import { validatorSchema } from '../../middlewares/validator.middleware.js'
import { registerSchema, loginSchema } from '../../schemas/auth.schema.js'

export const authRouter = Router()

authRouter.use((req, res, next) => {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept'
  )
  next()
})

// GET
authRouter.get('/', auth, authControllers)

// POST
authRouter.post('/signup', validatorSchema(registerSchema), signupHandler)
authRouter.post('/signin', validatorSchema(loginSchema), signinHandler)
