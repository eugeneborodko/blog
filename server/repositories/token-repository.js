const TokenModel = require('../models/token-model')

class TokenRepository {
  async saveToken(refreshToken, id) {
    const token = await TokenModel.create({ refreshToken, userId: id })
    return token
  }
}

module.exports = new TokenRepository()
