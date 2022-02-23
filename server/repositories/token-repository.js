const TokenModel = require('../models/token-model')

class TokenRepository {
  async saveToken(refreshToken, userId) {
    const token = await TokenModel.create({ refreshToken, userId })
    return token
  }

  async removeToken(refreshToken) {
    const token = await TokenModel.destroy({ where: { refreshToken } })
    return token
  }

  async findToken(refreshToken) {
    const token = await TokenModel.findOne({ where: { refreshToken } })
    return token
  }

  async findTokenByUserId(userId) {
    const token = await TokenModel.findOne({ where: { userId } })
    return token
  }
}

module.exports = new TokenRepository()
