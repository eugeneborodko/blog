const TokenModel = require('../models/token-model')

class TokenRepository {
  async saveToken(refreshToken, id) {
    const token = await TokenModel.create({ refreshToken, userId: id })
    return token
  }

  async removeToken(refreshToken) {
    const token = await TokenModel.destroy({ where: { refreshToken } })
    return {message: 'Token was removed from the database'}
  }
}

module.exports = new TokenRepository()
