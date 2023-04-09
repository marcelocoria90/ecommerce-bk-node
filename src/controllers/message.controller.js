import { request, response } from 'express'
// import { Message } from '../dao/entities/Message.js'
import { messagesManager as MM } from '../dao/manager/messages.manager.js'

/**
 * @param {request} req
 * @param {response} res
 * @returns {Promise<void>}
 * @router /chat
 * @description Obtiene los mensajes del chat y los envía al cliente por medio del renderizado de la vista chat
 */
const renderMessages = async (req = request, res = response) => {
  try {
    const messages = await MM.getList()
    res.render('chat', { pageTitle: 'Mensajes 💬', messages })
  } catch (e) {
    res.status(500).json({ ERROR: `${e.message}` })
  }
}

// /**
//  * @param {request} req
//  * @param {response} res
//  * @returns {Promise<void>}
//  * @router /api/messages
//  */
// const getMessages = async (req = request, res = response) => {
//   try {
//     const messages = await MM.getList()
//     res.status(200).json(messages)
//   } catch (e) {
//     res.status(500).json({ ERROR: `${e.message}` })
//   }
// }

// const getProductById = async (req = request, res = response) => {
//   try {
//     const product = await productService.getItemById(req.params.pid)
//     if (!product.success) { throw new Error('SERVICE_ERROR') }
//     res.status(200).json(product)
//   } catch (e) {
//     res.status(500).json(e)
//   }
// }

const newMessage = async (req, res, next) => {
  try {
    const data = req.body
    const result = await MM.save(data)
    // console.log(result)
    res.json(result)
  } catch (e) {
    res.status(404).json(e.message)
    next()
  }
}

// const createProduct = async (req, res, next) => {
//   try {
//     const product = new Product({
//       ...req.body
//     })
//     const newProduct = await productService.createItem(product)
//     console.log(newProduct.success)
//     if (!newProduct.success) { throw new Error('SERVICE_ERROR') }
//     res.status(200).json(newProduct)
//   } catch (e) {
//     res.status(404).json(e.message)
//   }
// }

// const updateProduct = async (req, res) => {
//   try {
//     const product = new Product({
//       ...req.body
//     })
//     const updatedProduct = await productService.updateItem(req.params.pid, product)
//     if (!updatedProduct.success) { throw new Error('SERVICE_ERROR') }
//     res.status(200).json(updatedProduct)
//   } catch (e) {
//     res.status(404).json(e.message)
//   }
// }

// const deleteProduct = async (req, res) => {
//   try {
//     const deletedProduct = await productService.deleteProduct(req.params.pid)
//     if (!deletedProduct.success) { throw new Error('SERVICE_ERROR') }
//     res.status(200).json(deletedProduct)
//   } catch (e) {
//     res.status(404).json(e.message)
//   }
// }

export {
  renderMessages,
  newMessage
//   createProduct,
//   newProduct,
//   updateProduct,
//   deleteProduct,
//   renderProducts
}
