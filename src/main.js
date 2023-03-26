import 'dotenv/config'
import express from 'express'
import  { apiRouter } from './router/apiRouter.js'

const app = express()

app.use('/api', apiRouter)



export default app