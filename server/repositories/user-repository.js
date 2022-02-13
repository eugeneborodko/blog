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

  async registration(email, password) {
    const user = await UserModel.create({ email, password })
    return user
  }

  async checkLogin(email) {
    const candidate = await UserModel.findOne({ where: { email } })
    return candidate
  }
}

module.exports = new UserRepository()
