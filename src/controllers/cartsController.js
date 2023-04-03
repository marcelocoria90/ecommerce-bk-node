import { CartService } from '../services/CartService.js'

const path = './database/carts.json'
const cartService = new CartService(path)

const createCart = async (req, res) => {
  try {
    const data = req.body
    const newCart = await cartService.createCart(data)
    res.status(201).json(newCart)
  } catch (e) {
    res.status(404).json(e.message)
  }
}

const getCartById = async (req, res) => {
  try {
    const { cid } = req.params
    const cart = await cartService.getCartById(cid)
    res.status(200).json(cart)
  } catch (e) {
    res.status(404).json(e.message)
  }
}

const createProductCart = async (req, res) => {
  try {
    const { cid } = req.params
    const { pid } = req.body
    const cart = await cartService.createProductCart(cid, pid)
    res.status(200).json(cart)
  } catch (e) {
    res.status(404).json(e.message)
  }
}

export { createCart, getCartById, createProductCart }
