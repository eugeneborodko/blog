const UserModel = require('../models/user-model')

class UserRepository {
  async getAll() {
    const users = await UserModel.findAll()
    return users
  }

  async checkRegistration(email) {
    const user = await UserModel.findOne({ where: { email } })
    return user
  }

  async registration(email, password) {
    const user = await UserModel.create({ email, password })
    return user
  }

  async checkLogin(email) {
    const candidate = await UserModel.findOne({ where: { email } })
    return candidate
  }

  async findUser(id) {
    const user = await UserModel.findOne({ where: { id } })
    return user
  }

  async deleteUser(id) {
    const user = await UserModel.findOne({ where: { id } })
    await UserModel.destroy({ where: { id } })
    return user
  }
}

module.exports = new UserRepository()
