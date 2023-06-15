import express, { Router } from 'express'
import { userRouter } from './user.routes.js'
import { authRouter } from './auth.routes.js'
import pkg from '../../../package.json' assert { type: 'json' } 
// import { sessionsRouter } from './sessions.routes.js'

export const apiRouter = Router()

apiRouter.use(express.json())
apiRouter.use(express.urlencoded({ extended: true }))

apiRouter.get('/', (req, res) => {
  res.json({
    message: 'API',
    status: 'OK',
    name: pkg.name,
    author: pkg.author,
    description: pkg.description,
    version: pkg.version
  })
})

apiRouter.use('/usuarios', userRouter)
apiRouter.use('/auth', authRouter)
