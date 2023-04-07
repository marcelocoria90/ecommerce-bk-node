/* eslint-disable no-undef */
import { randomUUID } from 'crypto'
import { FileManager } from './file.manager.js'

const FM = new FileManager('./database/carts.json')

class CartService {
  constructor (path) {
    this.path = path
  }

  async createCart (cart) {
    try {
      console.log(cart)
      const newProducts = []
      cart.products.forEach(x => {
        newProducts.push(x)
      })
      const newCart = {
        id: randomUUID(),
        products: newProducts.map(x => x),
        timestamp: new Date().toLocaleString()
      }
      return await FM.createItem(newCart)
    } catch (e) {
      console.log(e.message)
      return {
        success: false,
        error: e.message
      }
    }
  }

  async getCartById (cid) {
    try {
      const { data } = await FM.getItemById(cid)
      const { products } = data
      const idProducts = []
      products.map(x => {
        return idProducts.push(x.id)
      })
      return {
        success: true,
        data: idProducts
      }
    } catch (e) {
      console.error(e)
      return {
        success: false,
        message: e.message
      }
    }
  }

  async createProductCart (cid, pid) {
    try {
      const { data } = await FM.getList()
      const cart = data.find(x => x.id === cid)
      const { products } = cart
      console.log(products)
      const existProduct = products.find(x => x.id === pid)

      if (!existProduct) {
        products.push({
          id: pid,
          quantity: 1
        })
      } else {
        existProduct.quantity += 1
      }

      console.log(products)

      await FM.save()

      return {
        success: true,
        message: 'Product added to cart'
      }
    } catch (e) {
      console.log(e)
      return {
        success: false,
        message: e.message
      }
    }
  }
}
const path = './database/carts.json'
export const cartFile = new CartService(path)
