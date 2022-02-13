const { validationResult } = require('express-validator')
const userService = require('../services/user-service')

class UserController {
  async getAll(req, res) {
    try {
      const users = await userService.getAll()
      return res.json(users)
    } catch (err) {
      console.log(err)
    }
  }

  async registration(req, res) {
    try {
      const { email, password } = req.body
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.json(errors.array())
      }
      const user = await userService.registration(email, password)
      const maxAge = 30 * 24 * 60 * 60 * 1000
      res.cookie('refreshToken', user.refreshToken, { maxAge, httpOnly: true })
      return res.json(user)
    } catch (err) {
      console.log(err)
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body
      const user = await userService.login(email, password)
      const maxAge = 30 * 24 * 60 * 60 * 1000
      res.cookie('refreshToken', user.refreshToken, { maxAge, httpOnly: true })
      return res.json(user)
    } catch (err) {
      console.log(err)
    }
  }

  async logout(req, res) {
    try {
      const { refreshToken } = req.cookies
      const token = await userService.logout(refreshToken)
      res.clearCookie('refreshToken')
      return res.json(token)
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = new UserController()
