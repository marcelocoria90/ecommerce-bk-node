/* eslint-disable accessor-pairs */
import { newId } from '../utils/id.js'

export class User {
  #id
  #username
  #email
  #rol
  #carts
  #pass

  constructor ({ id = newId(), username, email, pass, rol = 'user', carts = [] }) {
    this.#id = id
    this.#username = username
    this.#email = email
    this.#rol = rol
    this.#carts = carts
    this.#pass = pass// this.encryptPass(pass)
  }

  /**
   * @param {string} value
   */
  set rol (value) {
    if (value !== 'admin' && value !== 'user') {
      throw new Error('Rol no valido')
    }
    this.#rol = value
  }

  dto () {
    return {
      id: this.#id,
      username: this.#username,
      email: this.#email,
      pass: this.#pass,
      roles: this.#rol,
      carts: this.#carts
    }
  }
}
// Version anterior:
/* import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  roles: [
    {
      ref: 'RolesModel',
      type: mongoose.Schema.Types.ObjectId
    }
  ]
},
{
  timestamps: true,
  versionKey: false
}
)

userSchema.statics.encryptPassword = async (password) => {
  console.log('🚩encryptPassword')

  console.log('Password: ')
  console.log(password)

  try {
    const salt = await bcrypt.genSalt(10)
    console.log('Salt: ', salt)
    return await bcrypt.hash(password, salt)
  } catch (e) {
    console.log(e)
  }
}

userSchema.statics.comparePassword = async (password, recivedPassword) => {
  return await bcrypt.compare(password, recivedPassword)
}

// userSchema.pre('save', async (next) => {
//   const user = this
//   if (!user.isModified('password')) {
//     return next()
//   }
//   const hash = await bcrypt.hash(user.password, 10)
//   user.password = hash
//   next()
// })

export default mongoose.model('UserModel', userSchema)
*/
