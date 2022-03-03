const postModel = require('../models/post-model')

class PostRepository {
  async create(postBody) {
    console.log(postBody)
    const { title, text, img, userId } = postBody
    const post = postModel.create({ title, text, img, userId })
    return post
  }
}

module.exports = new PostRepository()
