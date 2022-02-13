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
      return res.json(user)
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = new UserController()
