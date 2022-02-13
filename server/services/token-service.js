const jwt = require('jsonwebtoken')
const TokenRepository = require('../repositories/token-repository')
const UserDto = require('../dtos/user-dto')

class TokenService {
  async generateToken(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN_KEY, {
      expiresIn: '30m',
    })
    const refreshToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN_KEY, {
      expiresIn: '30d',
    })

    return {
      accessToken,
      refreshToken,
    }
  }

  async saveToken(refreshToken, id) {
    const token = await TokenRepository.saveToken(refreshToken, id)
    return token
  }

  async setToken(user) {
    const userDto = new UserDto(user)
    const tokens = await this.generateToken({ ...userDto })
    await this.saveToken(tokens.refreshToken, userDto.id)

    return {
      ...tokens,
      user: userDto,
    }
  }
}

module.exports = new TokenService()
