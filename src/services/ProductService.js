import fs from 'fs/promises'
import { randomUUID } from 'crypto'

export class ProductService {
    #path
    #arrayProducts
    constructor(path) {
        this.#path = path
        this.#arrayProducts = []
    }

    #read (){

    }

    async getProducts() {
        try {
            const data = await fs.readFile(this.path, 'utf-8')
            this.products = JSON.parse(data)
            return {
                success: true,
                data: this.products
            }
        } catch (e) {
            // throw new Error(e.message)
            return {
                success: false,
                error: e.message
            }
        }
    }

    async getProductById(pid) {
        try {
            this.products= await fs.readFile(this.path, 'utf-8')
            const productsObject = JSON.parse(this.products)
            const product = productsObject.find(x => x.id === pid)
            return {
                success: true,
                data: product
            }
        } catch (e) {
            console.log(e)
            return {
                success: false,
                error: e.message
            }
        }
    }

    async createProduct(product) {
        try{
            const json = await fs.readFile(this.path, 'utf-8')
            this.products = JSON.parse(json)
            product.id = randomUUID()
            this.products.push(product)
            const nuevoJson = JSON.stringify(this.products, null, 2)
            await fs.writeFile(this.path, nuevoJson)
            return {
                success: true,
                message: 'Product created'
            }
        } catch (e) {
            console.log(e.message)
            return {
                success: false,
                error: e.message
            }
        }
    }

    async updateProduct(pid, product) {
        try {
            await this.getProducts()
            this.products.forEach(x => {
                if (x.id === pid) {
                    x.title = product.title || x.title
                    x.description = product.description || x.description
                    x.code = product.code || x.code
                    x.price = product.price || x.price
                    x.status = product.status || x.status
                    x.stock = product.stock || x.stock
                    x.category = product.category || x.category
                    x.thumbnail = product.thumbnail || x.thumbnail
                }
            })

            await fs.writeFile(this.path, JSON.stringify(this.products, null, '\t'))
            return {
                success: true,
                message: `Product ${pid} updated`
            }
        } catch (e) {
            return {
                success: false,
                error: e.message
            }
        }
    }

    async deleteProduct(pid) {
        try {
            await this.getProducts()
            if (this.products.find(x => x.id === pid) === undefined) throw new error('No existe el producto')
            this.products = this.products.filter(x => x.id !== pid)
            await fs.writeFile(this.path, JSON.stringify(this.products, null, '\t'))
            return{
                success: true,
                message: `Product ${pid} deleted`
            }
        } catch (e) {
            return {
                success: false,
                error: e.message
            }
        }
    }
}