import { request, response } from 'express'
import { ProductService } from '../services/ProductService.js'
import { Product } from '../services/Product.js'

const path = './database/products.json'
const productService = new ProductService(path)

const getProducts = async(req = request, res = response) => {
    try {
        const products = await productService.getProducts()
        if(req.query.limit) {
            products = products.slice(0, req.query.limit)
        }

        if(!products.success){
            console.log(products)
            throw new Error('SERVICE_ERROR')
        }
        res.status(200).json(products)
    } catch (e) {
        res.status(500).json({ERROR: `${e.message}`})
    }
}

const getProductById = async(req = request, res = response) => {
    try {
        console.log(req.params)
        const product = await productService.getProductById(req.params.pid)
        res.status(200).json(product)
    } catch (e) {
        res.status(500).json(e)
    }
}

const createProduct = async(req, res) => {
    try {
        const product = new Product({
            ...req.body
        }) 
        const newProduct = await productService.createProduct(product)
        res.status(200).json(newProduct)
    } catch (e) {
        res.status(404).json(e.message)
    }
}

const updateProduct = async(req, res) => {
    try {
        const product = new Product({
            ...req.body
        })
        const updatedProduct = await productService.updateProduct(req.params.pid, product)
        res.status(200).json(updatedProduct)
    } catch (e) {
        res.status(404).json(e.message)
    }
}

const deleteProduct = async(req, res) => {
    try {
        const deletedProduct = await productService.deleteProduct(req.params.pid)
        res.status(200).json(deletedProduct)
    } catch (e) {
        res.status(404).json(e.message)
    }
}


export { getProducts, getProductById, createProduct, updateProduct, deleteProduct }