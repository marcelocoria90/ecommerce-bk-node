import fs from 'fs/promises'
import { randomUUID } from 'crypto'

export class FileManager {
  #path
  #arrayObjects
  constructor (path) {
    this.#path = path
    this.#arrayObjects = []
  }

  async #read () {
    try {
      const data = await fs.readFile(this.#path, 'utf-8')
      this.#arrayObjects = JSON.parse(data)
    } catch (e) {
      throw new Error(e.message)
    }
  }

  async #write () {
    try {
      const newJson = JSON.stringify(this.#arrayObjects, null, 2)
      await fs.writeFile(this.#path, newJson)
    } catch (e) {
      throw new Error(e.message)
    }
  }

  async save () {
    try {
      await this.#write()
      return {
        success: true,
        message: 'Item saved'
      }
    } catch (e) {
      console.log(e.message)
      return {
        success: false,
        error: e.message
      }
    }
  }

  async getList () {
    try {
      await this.#read()
      return {
        success: true,
        data: this.#arrayObjects
      }
    } catch (e) {
      console.log(e)
      return {
        success: false,
        error: e.message
      }
    }
  }

  async getItemById (pid) {
    try {
      await this.#read()
      // console.log(this.#arrayObjects)
      const item = this.#arrayObjects.find(x => x.id === pid)
      if (!item) return { success: true, data: `🚩Id ${pid} no encontrado` }
      return {
        success: true,
        data: item
      }
    } catch (e) {
      console.log(e)
      return {
        success: false,
        error: e.message
      }
    }
  }

  async createItem (item) {
    try {
      await this.#read()
      item.id = randomUUID()
      this.#arrayObjects.push(item)
      await this.#write()
      return {
        success: true,
        message: 'Item created'
      }
    } catch (e) {
      console.log(e.message)
      return {
        success: false,
        error: e.message
      }
    }
  }

  async updateItem (pid, item) {
    try {
      await this.#read()
      const data = this.#arrayObjects.find(x => x.id === pid)
      if (!data) return { success: true, data: `🚩Id ${pid} no encontrado` }
      this.#arrayObjects = this.#arrayObjects.map(x => x.id === pid
        ? {
            ...x,
            item
          }
        : x)
      this.#write()
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

  async deleteItem (pid) {
    try {
      await this.#read()
      if (this.#arrayObjects.find(x => x.id === pid) === undefined) throw new Error('Id no encontrado')
      this.#arrayObjects = this.#arrayObjects.filter(x => x.id !== pid)
      await fs.writeFile(this.path, JSON.stringify(this.#arrayObjects, null, '\t'))
      return {
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
