import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import { DaoMongoose } from './DaoMongoose.js'

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  first_name: { type: String },
  last_name: { type: String },
  email: { type: String, required: true, unique: true },
  age: { type: Number },
  password: { type: String },
  carts: {
    type: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'carts'
        }
      }
    ],
    required: true
  },
  rol: [
    {
      ref: 'RolesModel',
      type: mongoose.Schema.Types.ObjectId
    }
  ]
}, {
  timestamps: true,
  versionkey: false
})

// userSchema.statics.encryptPassword = async (password) => {
//   console.log('🚩encryptPassword')

//   console.log('Password: ')
//   console.log(password)

//   try {
//     const salt = await bcrypt.genSalt(10)
//     console.log('Salt: ', salt)
//     return await bcrypt.hash(password, salt)
//   } catch (e) {
//     console.log(e)
//   }
// }

userSchema.statics.comparePassword = async (password, recivedPassword) => {
  return await bcrypt.compare(password, recivedPassword)
}

const userModel = mongoose.model('UserSchema', userSchema)

export const usersDao = new DaoMongoose(userModel)

/*
import mongoose from 'mongoose'
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
