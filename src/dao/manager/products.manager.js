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
      console.log(product)
      const result = await this.#productsDb.create(product.datos())
      return result
    } catch (e) {
      throw new Error(e.message)
    }
  }

  async getList (options) {
    try {
      const { page = 1, limit = 10, sort = 1, cat, disp = false } = options

      const catQuery = cat ? { category: cat } : {}
      const dispQuery = disp ? { status: disp } : {}

      const query = { $and: [catQuery, dispQuery] }

      const optionsPaginations = {
        sort: { price: sort },
        page,
        limit,
        lean: true
      }

      const result = await this.#productsDb.paginate(query, optionsPaginations)

      // console.log(result)

      const context = {
        status: result.status,
        payload: result.docs,
        totalPages: result.totalPages,
        prevPage: result.hasPrevPage,
        nextPage: result.hasNextPage,
        page: result.page,
        limit: result.limit,
        prevLink: result.prevPage,
        nextLink: result.nextPage
      }

      return context
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
