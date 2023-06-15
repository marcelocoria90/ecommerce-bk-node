import mongoose from 'mongoose'

export const ROLES = ['admin', 'user', 'moderator']

const roleSchema = new mongoose.Schema(
  {
    name: String
  },
  {
    versionKey: false
  }
)

export default mongoose.model('RolesModel', roleSchema)
