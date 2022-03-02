const { validationResult } = require('express-validator')
const userService = require('../services/user-service')
const ApiError = require('../exceptions/api-error')

class UserController {
  async getAll(req, res, next) {
    try {
      const users = await userService.getAll()
      return res.json(users)
    } catch (err) {
      next(err)
    }
  }

  async registration(req, res, next) {
    try {
      const { email, password } = req.body
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        throw ApiError.badRequest('Validation error', errors.array())
      }
      const user = await userService.registration(email, password)
      return res.json(user)
    } catch (err) {
      next(err)
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body
      const user = await userService.login(email, password)
      const maxAge = 30 * 24 * 60 * 60 * 1000
      res.cookie('refreshToken', user.refreshToken, { maxAge, httpOnly: true })
      return res.json(user)
    } catch (err) {
      next(err)
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies
      const token = await userService.logout(refreshToken)
      res.clearCookie('refreshToken')
      return res.json(token)
    } catch (err) {
      next(err)
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies
      const tokens = await userService.refresh(refreshToken)
      const maxAge = 30 * 24 * 60 * 60 * 1000
      res.cookie('refreshToken', tokens.refreshToken, { maxAge, httpOnly: true })
      return res.json(tokens)
    } catch (err) {
      next(err)
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params
      await userService.deleteUser(id)
      return res.json({message: `user with id ${id} successfully removed`})
    } catch (err) {
      next(err)
    }
  }
}

module.exports = new UserController()
