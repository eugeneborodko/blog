const UserModel = require('../models/user-model')

class UserRepository {
  async getAll() {
    const users = await UserModel.findAll()
    return users
  }

  async checkRegistration(email) {
    const candidate = await UserModel.findOne({ where: { email } })
    return candidate
  }

  async create(email, password) {
    const user = await UserModel.create({ email, password })
    return user
  }
}

module.exports = new UserRepository()
