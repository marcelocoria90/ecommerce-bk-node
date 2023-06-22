import bcrypt from 'bcryptjs'

export class GenericRepository {
  #dao
  constructor (dao) {
    this.#dao = dao
  }

  get dao () { return this.#dao }

  async create (data, options) {
    return await this.#dao.create(data)
  }

  async readOne (criteria, options) {
    return await this.#dao.readOne(criteria)
  }

  async readMany (criteria, options) {
    return await this.#dao.readMany(criteria)
  }

  async updateOne (criteria, newData, options) {
    return await this.#dao.updateOne(criteria, newData)
  }

  async updateMany (criteria, newData, options) {
    return await this.#dao.updateMany(criteria, newData)
  }

  async deleteOne (criteria, options) {
    return await this.#dao.deleteOne(criteria)
  }

  async deleteMany (criteria, options) {
    return await this.#dao.deleteMany(criteria)
  }

  async encryptPass (pass) {
    console.log('🚩encryptPassword')

    console.log('Password: ')
    console.log(pass)

    try {
      const salt = await bcrypt.genSalt(10)
      console.log('Salt: ', salt)
      return await bcrypt.hash(pass, salt)
    } catch (e) {
      console.log(e)
    }
  }

  async comparePassword (recivedPassword, criteria) {
    console.log('🚩comparePassword')

    const userFound = await this.#dao.readOne(criteria)

    console.log('🚩userFound')
    console.log(userFound)

    console.log('🚩password')
    console.log(userFound.pass)

    const result = await bcrypt.compare(recivedPassword, userFound.pass)
    console.log('🚩comparePassword')
    console.log(result)
    return result
  }
}
