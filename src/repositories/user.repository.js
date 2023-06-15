import { usersDao } from '../daos/users.dao.mongoose.js'
import { GenericRepository } from './GenericRepository.js'

export const userRepository = new GenericRepository(usersDao)
