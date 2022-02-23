const ApiError = require('../exceptions/api-error')

const errorMiddleware = (err, req, res, next) => {
  const { status, message, errors } = err
  console.log(err)
  if (err instanceof ApiError) {
    return res.status(status).json({ message, errors })
  }
  return res.status(500).json({ message: 'Unexpected error' })
}

module.exports = errorMiddleware
