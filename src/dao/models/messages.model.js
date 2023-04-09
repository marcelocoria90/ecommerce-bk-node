import mongoose from 'mongoose'
// import { productsDb } from './products.model.js'

const schemaMessages = new mongoose.Schema({
  user: { type: String, required: true },
  message: { type: String, required: false },
  timestamp: { type: String, required: false }
}, { versionKey: false })

export const messagesDb = mongoose.model('messages', schemaMessages)
