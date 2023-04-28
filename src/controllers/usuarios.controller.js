import { usuarioModel } from '../dao/models/usuario.model.js'

export async function postUsuarios (req, res, next) {
  try {
    // console.log(req.body)
    let newUser = req.body

    const rol = newUser.email === process.env.ADMIN_EMAIL && newUser.password === process.env.ADMIN_PASSWORD ? 'admin' : 'user'

    newUser = {
      ...req.body,
      rol
    }
    const usuarioCreado = await usuarioModel.create(newUser)

    req.session.user = {
      name: usuarioCreado.first_name + ' ' + usuarioCreado.last_name,
      email: usuarioCreado.email,
      age: usuarioCreado.age,
      rol
    }

    res.status(201).json(usuarioCreado)
  } catch (error) {
    res.status(500)
    next(error)
  }
}
