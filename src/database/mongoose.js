import mongoose from 'mongoose'
import { MONGODB_CNX_STR } from '../config/database.js'

export const cnx = async () => {
  await mongoose
    .connect(MONGODB_CNX_STR, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: 'ecommerce'
    })
    .then(() => {
      console.log('⚡MongoDB connected⚡')
    }).catch(err => console.error(err))
}
