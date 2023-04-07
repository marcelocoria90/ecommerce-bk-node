import { productsDb } from '../models/products.model.js'
import { Product } from '../entities/Product.js'

class ProductManager {
  #productsDb
  constructor () {
    this.#productsDb = productsDb
  }

  async save (data) {
    try {
      const product = new Product(data)
      const result = await this.#productsDb.create(product.datos())
      return result
    } catch (e) {
      throw new Error(e.message)
    }
  }

  async getList () {
    try {
      const result = await this.#productsDb.find().lean()
      return result
    } catch (e) {
      throw new Error(e.message)
    }
  }

  async getItemById (pid) {
    try {
      const result = await this.#productsDb.findById(pid).lean()
      return result
    } catch (e) {
      throw new Error(e.message)
    }
  }
}

export const productManager = new ProductManager()
