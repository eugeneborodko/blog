const ApiError = require('../exceptions/api-error')
const tokenService = require('../services/token-service')

const authMiddleware = (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization
    if (!authorizationHeader) {
      throw ApiError.unauthorized()
    }

    const accessToken = authorizationHeader.split(' ')[1]
    if (!accessToken) {
      throw ApiError.unauthorized()
    }

    const userData = tokenService.validateAccessToken(accessToken)
    if (!userData) {
      throw ApiError.unauthorized()
    }

    req.user = userData
    next()
  } catch (err) {
    throw ApiError.unauthorized()
  }
}

module.exports = authMiddleware
