import { cartsDb } from '../models/carts.model.js'
import util, { inspect } from 'node:util'

class CartManager {
  #cartsDb
  constructor () {
    this.#cartsDb = cartsDb
  }

  async createCart (prods = []) {
    try {
      // console.log(util.inspect(data, false, 10))
      const newCart = {
        products: prods,
        timestamp: new Date()
      }
      // console.log(newCart)
      const result = await this.#cartsDb.create(newCart)
      // console.log(result)
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
      let result
      console.log('createProductCart::::')
      console.log('cid:::')
      console.log(cid)
      console.log('data:::')
      console.log(data)
      const { products } = await this.#cartsDb.findOne(
        { _id: cid },
        {
          products: { $elemMatch: { _id: data._id } }
        }
      ).lean()
      console.log('carts:::')
      console.log(inspect(products, false, 10))
      // console.log(products)
      if (products) {
        result = await this.#cartsDb.findOneAndUpdate(
          { _id: cid, 'carts.products._id': data._id },
          { $inc: { 'carts.products.$.quantity': 1 } }
        )
        console.log(inspect(result, false, 10))
        if (result) {
          console.log('RESULT CART Y PRODUCT:::')
          console.log(result)
          return result
        } else {
          result = await this.#cartsDb.findOneAndUpdate(
            { _id: cid },
            { $push: { products: data._id } }
          )
          console.log('RESULT:::')
          console.log(result)
          return result
        }
      }
    } catch (e) {
      throw new Error(e.message)
    }
  }

  async deleteProductCart (cid, pid) {
    try {
      const result = await cartsDb.findOneAndUpdate(
        { _id: cid },
        { $pull: { products: { _id: pid } } }
      )
      return result
    } catch (e) {
      throw new Error(e.message)
    }
  }

  async updatedCart (cid, data) {
    try {
      const result = await cartsDb.findOneAndUpdate(
        { _id: cid },
        { $set: { products: data } }
      )
      return result
    } catch (e) {
      throw new Error(e.message)
    }
  }

  async updatedProductCart (cid, pid, data) {
    try {
      const result = await cartsDb.findOneAndUpdate(
        { _id: cid, 'products._id': pid },
        { $set: { 'products.$.quantity': data.quantity } }
      )
      return result
    } catch (e) {
      throw new Error(e.message)
    }
  }

  async deleteProductsCart (cid) {
    try {
      const result = await cartsDb.findOneAndUpdate(
        { _id: cid },
        { $set: { products: [] } }
      )
      return result
    } catch (e) {
      throw new Error(e.message)
    }
  }
}

export const cartManager = new CartManager()
