import app from './src/app/main.js'
import { Server as SocketIOServer } from 'socket.io'
import { messagesManager } from './src/dao/manager/messages.manager.js'

const PORT = process.env.PORT || 8081

const httpServer = app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT} 🚀`)
})

const io = new SocketIOServer(httpServer)

io.on('connection', async clientSocket => {
  console.log(`🚀 Client connected: ${clientSocket.id} 🚀`)

  clientSocket.on('nuevoMensaje', async mensaje => {
    // console.log('🚀 Mensaje recibido 🚀', mensaje)
    await messagesManager.save(mensaje)
    const messages = await messagesManager.getList()

    const messagesFront = messages.map(m => ({
      ...m
    }))

    io.sockets.emit('actualizarMensajes', messagesFront)
  })

  clientSocket.on('nuevoUsuario', async newUser => {
    clientSocket.broadcast.emit('nuevoUsuario', newUser)
  })

  const messages = await messagesManager.getList()
  const messagesFront = messages.map(m => ({
    ...m
  }))
  io.sockets.emit('actualizarMensajes', messagesFront)
})
