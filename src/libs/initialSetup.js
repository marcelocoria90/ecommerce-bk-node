/* eslint-disable no-useless-return */
/* eslint-disable padded-blocks */
import RolesModel from '../models/Roles.model.js'
export const createRoles = async () => {
  try {
    const count = await RolesModel.estimatedDocumentCount()
    if (count > 0) return

    const values = await Promise.all([
      new RolesModel({ name: 'user' }).save(),
      new RolesModel({ name: 'moderator' }).save(),
      new RolesModel({ name: 'admin' }).save()
    ])

    console.log(values)

  } catch (e) {
    console.log(e)
  }
}
