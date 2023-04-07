import mongoose from 'mongoose'

const schemaProducts = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  code: { type: String, required: true },
  price: { type: Number, required: true },
  status: { type: Boolean, required: true },
  stock: { type: Number, required: true },
  category: { type: String, required: true },
  thumbnails: { type: String, required: true }
}, { versionKey: false })

export const productsDb = mongoose.model('products', schemaProducts)
