const UserRoleModel = require('../models/user-role-model')

class UserRoleRepository {
  async create(userId, roleId) {
    const role = await UserRoleModel.create({ userId, roleId })
    return role
  }

  async findUserById(userId) {
    const user = await UserRoleModel.findOne({ where: { userId } })
    return user
  }
}

module.exports = new UserRoleRepository()
