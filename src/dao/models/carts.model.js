import mongoose from 'mongoose'
// import { productsDb } from './products.model.js'

const schemaCarts = new mongoose.Schema({
  products: { type: [], required: true },
  timestamp: { type: Date, required: false }
}, { versionKey: false })

export const cartsDb = mongoose.model('carts', schemaCarts)
