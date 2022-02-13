const jwt = require('jsonwebtoken')

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
}

module.exports = new TokenService()
