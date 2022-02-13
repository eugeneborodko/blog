const bcrypt = require('bcrypt')
const UserModel = require('../models/user-model')
const TokenRepository = require('../repositories/token-repository')
const UserRepository = require('../repositories/user-repository')
const TokenService = require('./token-service')

class UserService {
  async getAll() {
    const users = await UserModel.findAll()
    return users
  }

  async registration(email, password) {
    const candidate = await UserRepository.checkRegistration(email)
    if (candidate) {
      return { message: `User ${email} already exists` }
    }
    const hashPassword = await bcrypt.hash(password, 3)
    const user = await UserRepository.registration(email, hashPassword)
    const tokens = await TokenService.setToken(user)
    return tokens
  }

  async login(email, password) {
    const user = await UserRepository.checkRegistration(email)
    if (!user) {
      return { message: `User with ${email} not found` }
    }
    const isPasswordEqual = await bcrypt.compare(password, user.password)
    if (!isPasswordEqual) {
      return { message: `Wrong password` }
    }
    const tokens = await TokenService.setToken(user)
    return tokens
  }

  async logout(refreshToken) {
    const token = await TokenRepository.removeToken(refreshToken)
    return token
  }
}

module.exports = new UserService()
