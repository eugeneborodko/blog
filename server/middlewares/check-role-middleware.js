const ApiError = require('../exceptions/api-error')
const jwt = require('jsonwebtoken')

const checkRoleMiddleware = (roleId) => (req, res, next) => {
  if (req.method === 'OPTIONS') {
    next()
  }
  try {
    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
      throw ApiError.badRequest('Not authorized')
    }
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
    if (decoded.roleId !== roleId) {
      throw ApiError.forbidden()
    }
    req.user = decoded
    next()
  } catch (e) {
    throw ApiError.badRequest('Not authorized')
  }
}

module.exports = checkRoleMiddleware
