import 'dotenv/config'
import express from 'express'
import { apiRouter } from '../router/api.routes.js'
import { viewRouter } from '../router/views.routes.js'
import { engine } from 'express-handlebars'
import { cnx } from '../database/mongoose.js'

const app = express()

app.engine('handlebars', engine())
app.set('views', './views')
app.set('view engine', 'handlebars')

app.use(express.static('./public'))
app.use(express.json())

cnx()

app.use('/api', apiRouter)
app.use('/', viewRouter)

export default app
