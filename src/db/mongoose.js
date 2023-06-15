import mongoose from 'mongoose'
import { CNX_STR, DB } from '../config/mongodb.config.js'

export const cnx = async () => {
  try {
    await mongoose
      .connect(CNX_STR, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: DB
      })
      .then(() => {
        console.log('⚡MongoDB connected⚡')
        console.log(`🍃 Connected to ${DB} 🍃`)
      }).catch(err => console.log(err))
  } catch (e) {
    console.log(e)
  }
}
