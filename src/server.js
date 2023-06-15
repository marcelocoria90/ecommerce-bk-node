import app from './app/app.js'
import { cnx } from './db/mongoose.js'
import { PORT } from './config/server.config.js'

const port = PORT || 3000
app.listen(port, () => {
  console.log(`🚀 Server listening on port ${port} 🚀`)
})

cnx()
