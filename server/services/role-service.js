const RoleRepository = require('../repositories/role-repository')

class RoleService {
  async create(userRole) {
    const findRole = await RoleRepository.findRole(userRole)
    if (findRole) {
      return
    }
    const role = await RoleRepository.create(userRole)
    return role
  }
}

module.exports = new RoleService()
