const UserRoleModel = require('../models/user-role-model')

class UserRoleRepository {
  async create(userId, roleId) {
    const role = await UserRoleModel.create({ userId, roleId })
    return role
  }
}

module.exports = new UserRoleRepository()
