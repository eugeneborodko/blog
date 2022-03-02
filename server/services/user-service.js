const bcrypt = require('bcrypt')
const ApiError = require('../exceptions/api-error')
const UserModel = require('../models/user-model')
const TokenRepository = require('../repositories/token-repository')
const userRepository = require('../repositories/user-repository')
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
      throw ApiError.badRequest(`User ${email} already exists`)
    }
    const hashPassword = await bcrypt.hash(password, 3)
    const user = await UserRepository.registration(email, hashPassword)
    return user
  }

  async login(email, password) {
    const user = await UserRepository.checkRegistration(email)
    if (!user) {
      throw ApiError.badRequest(`User with ${email} not found`)
    }
    const isPasswordEqual = await bcrypt.compare(password, user.password)
    if (!isPasswordEqual) {
      throw ApiError.badRequest('Wrong password')
    }
    const tokens = await TokenService.setToken(user)
    return tokens
  }

  async logout(refreshToken) {
    const token = await TokenRepository.removeToken(refreshToken)
    return token
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.unauthorized()
    }
    const userData = TokenService.validateRefreshToken(refreshToken)
    const tokenFromDatabase = await TokenRepository.findToken(refreshToken)
    if (!tokenFromDatabase) {
      throw ApiError.unauthorized()
    }
    const user = await UserRepository.findUser(userData.id)
    const tokens = await TokenService.setToken(user)
    return tokens
  }

  async deleteUser(id) {
    const userData = await userRepository.findUser(id)
    if (!id || !userData) {
      throw ApiError.badRequest('You did not provide an id or user not found')
    }

    const user = await UserRepository.deleteUser(id)
    return user
  }
}

module.exports = new UserService()
