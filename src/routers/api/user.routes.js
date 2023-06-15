import { Router } from 'express'
import * as userController from '../../controllers/api/user.controllers.js'
import { auth } from '../../middlewares/authJwt.middleware.js'
import { validatorSchema } from '../../middlewares/validator.middleware.js'
import { registerSchema } from '../../schemas/auth.schema.js'

export const userRouter = Router()

// GET
userRouter.get('/', auth, userController.getAll)

// POST
userRouter.post('/', [auth, validatorSchema(registerSchema)], userController.createUser)
