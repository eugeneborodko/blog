const TokenModel = require('../models/token-model')

class TokenRepository {
  async saveToken(refreshToken, id) {
    const token = await TokenModel.create({ refreshToken, userId: id })
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
}

module.exports = new TokenRepository()
