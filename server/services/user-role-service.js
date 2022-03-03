const UserRoleRepository = require('../repositories/user-role-repository')

class UserRoleService {
  async create(userId, roleId) {
    const role = await UserRoleRepository.create(userId, roleId)
    return role
  }

  async findUserById(userId) {
    const user = await UserRoleRepository.findUserById(userId)
    return user
  }
}

module.exports = new UserRoleService()
