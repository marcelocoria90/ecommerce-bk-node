import fs from 'fs/promises'
import { randomUUID } from 'crypto'

export class CartService {

    constructor(path) {
        this.path = path
    }

    async createCart(cart) {
        try{
            const json = await fs.readFile(this.path, 'utf-8')
            let products = []
            cart.map(x => {
                products.push(x)
            })

            const cartsObject = JSON.parse(json)

            const newCart = {
                id: randomUUID(),
                products: products,
                timestamp: new Clock()/*new Date().toLocaleString("es-US"),*/
            }

            cartsObject.push(newCart)

            const nuevoJson = JSON.stringify(cartsObject, null, 2)
            await fs.writeFile(this.path, nuevoJson)
            return {
                succsess: true,
                message: 'Cart created'
            }
        } catch (e) {
            console.log(e.message)
            return {
                succsess: false,
                error: e.message
            }
        }
    }

    async getCartById(cid) {
        try {
            const carts = await fs.readFile(this.path,'utf-8')
            const cartsObject = JSON.parse(carts)
            const cart = cartsObject.find(x => x.id === cid)
            const { products } = cart
            return {
                success: true,
                data: products
            }
        } catch (e) {
            console.error(e)
            return{
                success: false,
                message: e.message
            }
        }
    }

    async createProductCart(cid, pid) {
        try {
            const carts = await fs.readFile(this.path,'utf-8')
            const cartsObject = JSON.parse(carts)
            const cart = cartsObject.find(x => x.id === cid)
            const { products } = cart
            
            const existProduct =  products.map(x => {
                if(x.id === pid){
                    x.quantity += 1
                    console.log(x.quantity)
                }else{
                    return true
                }
            })

            if(!existProduct){
                products.push({
                    id: pid,
                    quantity: 1
                })
            }
            console.log(existProduct)
            const nuevoJson = JSON.stringify(cartsObject, null, 2)
            await fs.writeFile(this.path, nuevoJson)

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