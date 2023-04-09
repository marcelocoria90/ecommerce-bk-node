import { Router } from 'express'
import { newMessage } from '../controllers/message.controller.js'

export const messagesRouter = Router()

messagesRouter.post('/', newMessage)
