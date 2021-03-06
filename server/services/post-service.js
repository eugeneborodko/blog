const path = require('path')
const uuid = require('uuid')
const postRepository = require('../repositories/post-repository')

class PostService {
  async getAll(userId) {
    if (userId) {
      const posts = postRepository.getByUserId(userId)
      return posts
    }

    const posts = await postRepository.getAll()
    return posts
  }

  async getOne(id) {
    const post = await postRepository.getOne(id)
    return post
  }

  async create(postBody) {
    const { img } = postBody
    let fileName = uuid.v4() + '.jpg'
    img.mv(path.resolve(__dirname, '..', 'static', fileName))
    const post = await postRepository.create({ ...postBody, img: fileName })
    return post
  }
}

module.exports = new PostService()
