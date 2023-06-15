import 'dotenv/config'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

import { createRoles } from '../libs/initialSetup.js'

import { apiRouter } from '../routers/api/index.routes.js'
// import { webRouter } from './routers/web/index.js'

const app = express()
createRoles()

app.use(morgan('dev'))

app.use(cors())
app.use(express.json())

app.use('/api', apiRouter)
// app.use('/web', webRouter)

export default app
