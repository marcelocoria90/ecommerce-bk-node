import { User } from '../../models/User.model.js'

import { userRepository } from '../../repositories/user.repository.js'

export const createUser = async (req, res) => {
  try {
    /*
    const { username, email, password, roles } = req.body

    const passEncrypt = await UserModel.encryptPassword(password)
    const newUser = new UserModel({
      username,
      email,
      password: passEncrypt
    })

    if (roles) {
      const foundRoles = await RolesModel.find({ name: { $in: roles } })
      newUser.roles = foundRoles.map((role) => role._id)
    } else {
      const role = await RolesModel.findOne({ name: 'user' })
      newUser.roles = [role._id]
    }

    const savedUser = await newUser.save()

    return res.status(200).json({
      usuario: savedUser.username,
      message: 'Usuario creado correctamente'
    }) */

    const { username, email, pass, rol } = req.body

    const userFound = await userRepository.findOne({ username })

    if (userFound) return res.status(400).json({ message: 'The user already exists' })

    const user = new User(req.body)

    const userCreated = await userRepository.create(user.dto())
    res.status(201).json(userCreated)
  } catch (e) {
    console.log(e)
    return res.status(500).json(e.message)
  }
}

export const getAll = async (_req, res) => {
  return res.status(200).json({
    Rutes: 'api/usuarios',
    status: 200,
    Methods: [
      {
        GET: ['/'],
        POST: ['/']
      }
    ]
  })
}
