import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
// import { productsDb } from './products.model.js'

const schemaCarts = new mongoose.Schema({
  products: {
    type: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'products'
        }
      }
    ],
    required: true
  },
  timestamp: { type: Date, required: false }
}, { versionKey: false })

schemaCarts.pre(/^find/, function (next) {
  this.populate('products._id')
  next()
})

schemaCarts.plugin(mongoosePaginate)

export const cartsDb = mongoose.model('carts', schemaCarts)
