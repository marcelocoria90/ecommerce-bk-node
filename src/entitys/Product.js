export class Product {
  constructor ({ title, description, code, price, status, stock, category, thumbnails }) {
    if (!title) throw new Error('falta un argumento')
    if (!description) throw new Error('falta un argumento')
    if (!code) throw new Error('falta un argumento')
    if (!price) throw new Error('falta un argumento')
    if (!status) throw new Error('falta un argumento')
    if (!stock) throw new Error('falta un argumento')
    if (!category) throw new Error('falta un argumento')

    this.id = 0
    this.title = title
    this.description = description
    this.code = code
    this.price = price
    this.status = status
    this.stock = stock
    this.category = category
    this.thumbnails = thumbnails
  }
}
