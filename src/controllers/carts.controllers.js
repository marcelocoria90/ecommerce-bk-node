// import { cartFile } from '../dao/manager/cartFile.manager.js'
import { request, response } from 'express'
import { cartManager as CM } from '../dao/manager/carts.manager.js'

const createCart = async (req = request, res = response) => {
  try {
    let result

    const data = req.body
    console.log('DATA:::')
    console.log(req.body.cid)
    const { cid, _id } = data
    console.log('CID:::🚩')
    console.log(cid)
    console.log('_ID:::🚩')
    console.log(_id)
    const _cartExist = await CM.getCartById(cid)
    console.log('EXISTE CART:: 🚩', _cartExist)

    if (_cartExist) {
      console.log('EXISTE EL CART🚩')
      if (Array.isArray(_id)) {
        result = await CM.createProductCart(cid, _id)
      } else {
        console.log('NO ES ARRAY')
        const prod = []
        prod.push(_id)
        result = await CM.createProductCart(cid, prod) /* await cartFile.createCart(data) */
      }
      res.status(201).json(result)
    } else {
      console.log('NO EXISTE EL CART🚩')
      result = await CM.createCart(_id)
      res.status(201).json(result)
    }
    throw new Error('SERVICE_ERROR')
  } catch (e) {
    res.status(404).json(e.message)
  }
}

const getCartById = async (req, res) => {
  try {
    const { cid } = req.params
    const cart = await CM.getCartById(cid)/* cartFile.getCartById(cid) */
    res.status(200).json(cart)
  } catch (e) {
    res.status(404).json(e.message)
  }
}

const createProductCart = async (req, res) => {
  try {
    const { cid } = req.params
    const data = req.body
    const cart = await CM.createProductCart(cid, data)/* cartFile.createProductCart(cid, pid) */
    res.status(200).json(cart)
  } catch (e) {
    res.status(404).json(e.message)
  }
}

const deleteProductCart = async (req, res) => {
  try {
    const { cid, pid } = req.params
    const cart = await CM.deleteProductCart(cid, pid)/* cartFile.deleteProductCart(cid, pid) */
    res.status(200).json(cart)
  } catch (e) {
    res.status(404).json(e.message)
  }
}

const updatedCart = async (req, res) => {
  try {
    const { cid } = req.params
    const data = req.body
    const cart = await CM.updatedCart(cid, data)/* cartFile.updatedCart(cid, data) */
    res.status(200).json(cart)
  } catch (e) {
    res.status(404).json(e.message)
  }
}

const updatedProductCart = async (req, res) => {
  try {
    const { cid, pid } = req.params
    const data = req.body
    const cart = await CM.updatedProductCart(cid, pid, data)/* cartFile.updatedProductCart(cid, pid, data) */
    res.status(200).json(cart)
  } catch (e) {
    res.status(404).json(e.message)
  }
}

const deleteProductsCart = async (req, res) => {
  try {
    const { cid } = req.params
    const cart = await CM.deleteProductsCart(cid)/* cartFile.deleteProductsCart(cid) */
    res.status(200).json(cart)
  } catch (e) {
    res.status(404).json(e.message)
  }
}

export { createCart, getCartById, createProductCart, deleteProductCart, updatedCart, updatedProductCart, deleteProductsCart }
