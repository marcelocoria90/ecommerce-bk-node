/* eslint-disable no-unused-expressions */
export class Product {
  #title
  #description
  #code
  #price
  #status
  #stock
  #category
  #thumbnails
  constructor ({ title, description, code, price, status, stock, category, thumbnails }) {
    if (!title) throw new Error('falta un argumento')
    if (!description) throw new Error('falta un argumento')
    if (!code) throw new Error('falta un argumento')
    if (!price) throw new Error('falta un argumento')
    if (!status) throw new Error('falta un argumento')
    if (!stock) throw new Error('falta un argumento')
    if (!category) throw new Error('falta un argumento')

    this.id
    this.#title = title
    this.#description = description
    this.#code = code
    this.#price = price
    this.#status = status
    this.#stock = stock
    this.#category = category
    this.#thumbnails = thumbnails
  }

  get title () { return this.#title }
  get description () { return this.#description }
  get code () { return this.#code }
  get price () { return this.#price }
  get status () { return this.#status }
  get stock () { return this.#stock }
  get category () { return this.#category }
  get thumbnails () { return this.#thumbnails }

  datos () {
    return {
      title: this.#title,
      description: this.#description,
      code: this.#code,
      price: this.#price,
      status: this.#status,
      stock: this.#stock,
      category: this.#category,
      thumbnails: this.#thumbnails
    }
  }
}
