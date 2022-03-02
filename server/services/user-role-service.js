const UserRoleRepository = require('../repositories/user-role-repository')

class UserRoleService {
  async create(userId, roleId) {
    // const findRole = await RoleRepository.findRole(userRole)
    // if (findRole) {
    //   return
    // }
    const role = await UserRoleRepository.create(userId, roleId)
    return role
  }
}

module.exports = new UserRoleService()
