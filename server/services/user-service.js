const bcrypt = require('bcrypt')
const UserModel = require('../models/user-model')
const UserRepository = require('../repositories/user-repository')
const TokenService = require('./token-service')
const UserDto = require('../dtos/user-dto')

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
    const user = await UserRepository.create(email, hashPassword)
    const userDto = new UserDto(user)
    const tokens = await TokenService.generateToken({ ...userDto })

    const refreshToken = TokenService.saveToken(tokens.refreshToken, userDto.id)

    return {
      ...tokens,
      user: userDto,
    }
  }
}

module.exports = new UserService()
