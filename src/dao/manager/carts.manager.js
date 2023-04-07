import { cartsDb } from '../models/carts.model.js'

class CartManager {
  #cartsDb
  constructor () {
    this.#cartsDb = cartsDb
  }

  async save (data) {
    try {
      const newCart = {
        products: data,
        timestamp: new Date()
      }
      const result = await this.#cartsDb.create(newCart)
      return result
    } catch (e) {
      throw new Error(e.message)
    }
  }

  async getCartById (cid) {
    try {
      const carts = await this.#cartsDb.findById(cid).lean()
      return carts
    } catch (e) {
      throw new Error(e.message)
    }
  }

  async createProductCart (cid, data) {
    try {
      const { products } = await cartsDb.findOne(
        { _id: cid },
        {
          products: { $elemMatch: { _id: data._id } }
        }
      )
      if (products.length > 0) {
        const result = await cartsDb.findOneAndUpdate(
          { _id: cid, 'products._id': data._id },
          { $inc: { 'products.$.quantity': 1 } }
        )
        return result
      }
      const result = await cartsDb.findOneAndUpdate(
        { _id: cid },
        { $push: { products: data } }
      )
      return result
    } catch (e) {
      throw new Error(e.message)
    }
  }
}

export const cartManager = new CartManager()
