const { validationResult } = require('express-validator')
const postService = require('../services/post-service')
const ApiError = require('../exceptions/api-error')

class PostController {
  async getAll(req, res, next) {
    try {
      const { userId } = req.query
      const posts = await postService.getAll(userId)
      return res.json(posts)
    } catch (err) {
      next(err)
    }
  }

  async getOne(req, res, next) {
    try {
      const { id } = req.params
      const post = await postService.getOne(id)
      return res.json(post)
    } catch (err) {
      next(err)
    }
  }

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
