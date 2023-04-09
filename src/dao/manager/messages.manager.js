import { messagesDb } from '../models/messages.model.js'
import { Message } from '../entities/Message.js'

class MessagesManager {
  #messagesDb
  constructor () {
    this.#messagesDb = messagesDb
  }

  async save (data) {
    try {
      const message = new Message(data)
      const result = await this.#messagesDb.create(message.datos())
      return result
    } catch (e) {
      throw new Error(e.message)
    }
  }

  async getList () {
    try {
      const result = await this.#messagesDb.find().lean()
      return result
    } catch (e) {
      throw new Error(e.message)
    }
  }

  async getItemById (pid) {
    try {
      const result = await this.#messagesDb.findById(pid).lean()
      return result
    } catch (e) {
      throw new Error(e.message)
    }
  }
}

export const messagesManager = new MessagesManager()
