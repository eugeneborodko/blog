const jwt = require('jsonwebtoken')
const TokenRepository = require('../repositories/token-repository')
const UserDto = require('../dtos/user-dto')

class TokenService {
  generateToken(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: '30m',
    })
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: '30d',
    })

    return {
      accessToken,
      refreshToken,
    }
  }

  async saveToken(refreshToken, userId) {
    const tokenData = await TokenRepository.findTokenByUserId(userId)
    if (tokenData) {
      tokenData.refreshToken = refreshToken
      return tokenData.save()
    }
    const token = await TokenRepository.saveToken(refreshToken, userId)
    return token
  }

  async setToken(user) {
    const userDto = new UserDto(user)
    const tokens = this.generateToken({ ...userDto })
    await this.saveToken(tokens.refreshToken, userDto.id)

    return {
      ...tokens,
      user: userDto,
    }
  }

  validateAccessToken(token) {
    try {
      const user = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
      return user
    } catch (err) {
      return null
    }
  }

  validateRefreshToken(token) {
    try {
      const user = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
      return user
    } catch (err) {
      return null
    }
  }
}

module.exports = new TokenService()
