const RoleModel = require('../models/role-model')

class RoleRepository {
  async create(userRole) {
    const role = await RoleModel.create({ name: userRole })
    return role
  }

  async findRole(userRole) {
    const role = await RoleModel.findOne({ where: { name: userRole } })
    return role
  }
}

module.exports = new RoleRepository()
