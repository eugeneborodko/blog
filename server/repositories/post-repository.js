const postModel = require('../models/post-model')

class PostRepository {
  async getAll() {
    const posts = await postModel.findAll()
    return posts
  }

  async getOne(id) {
    const post = await postModel.findOne({ where: { id } })
    return post
  }

  async create(postBody) {
    const { title, text, img, userId } = postBody
    const post = postModel.create({ title, text, img, userId })
    return post
  }
}

module.exports = new PostRepository()
