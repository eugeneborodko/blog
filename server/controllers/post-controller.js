const { validationResult } = require('express-validator')
const postService = require('../services/post-service')
const ApiError = require('../exceptions/api-error')

class PostController {
  async create(req, res, next) {
    try {
      const { title, text, userId } = req.body
      const { img } = req.files
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        throw ApiError.badRequest('Validation error', errors.array())
      }
      const postBody = { title, text, img, userId: Number(userId) }
      const post = await postService.create(postBody)
      return res.json(post)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = new PostController()
