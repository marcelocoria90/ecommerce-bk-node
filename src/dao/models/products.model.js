import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

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

schemaProducts.plugin(mongoosePaginate)

export const productsDb = mongoose.model('products', schemaProducts)
