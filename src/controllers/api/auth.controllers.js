import jwt from 'jsonwebtoken'
import { User } from '../../models/User.model.js'
import RolesModel from '../../models/Roles.model.js'
import { JWT_SECRET } from '../../config/server.config.js'
import { userRepository } from '../../repositories/user.repository.js'
// import User from '../../classes/User.js'

export const authControllers = (_req, res) => {
  return res.status(200).json({
    Rutes: 'Auth',
    status: 200,
    enable: [
      '/', '/signup', '/signin'
    ]
  })
}

export const signupHandler = async (req, res) => {
  try {
    const { username, email, password, roles } = req.body
    const passEncrypt = await userRepository.encryptPass(password)

    console.log('🚩email')
    console.log(email)

    const newUser = new User({
      username,
      email,
      pass: passEncrypt
    })

    if (roles) {
      const foundRoles = await RolesModel.find({ name: { $in: roles } })
      newUser.roles = foundRoles.map((role) => role._id)
    } else {
      const role = await RolesModel.findOne({ name: 'user' })
      newUser.roles = [role._id]
    }
    console.log('🚩newUser')
    console.log(newUser.dto())

    // const savedUser = await newUser.save()
    const savedUser = await userRepository.create(newUser.dto())

    const token = jwt.sign({ id: savedUser._id }, JWT_SECRET, {
      expiresIn: 1200 // 20 minutes
    })

    return res.status(200).json({ token })
  } catch (e) {
    console.log(e)
    // throw new Error(e)
    return res.status(500).json(e.message)
  }
}

export const signinHandler = async (req, res) => {
  try {
    const { username, password } = req.body
    const userFound = await userRepository.readOne({ username }) // User.findOne({ email: req.body.email }).populate('roles')

    console.log('🚩userFound')
    console.log(userFound)

    if (!userFound) return res.status(400).json({ message: 'User not found' })

    console.log('🚩matchPassword')
    const matchPassword = await userRepository.comparePassword(password, { username })

    if (!matchPassword) {
      return res.status(401).json({
        token: null,
        message: 'Credentials invalid'
      })
    }

    const token = jwt.sign({ id: userFound._id }, JWT_SECRET, {
      expiresIn: 21600 // 6 hours
    })

    res.json({ token })
  } catch (e) {
    console.log('🚩CATH')
    console.log(e)
    return res.status(500).json(e.message)
  }
}
