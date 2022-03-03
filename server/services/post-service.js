const path = require('path')
const uuid = require('uuid')
const postRepository = require('../repositories/post-repository')

class PostService {
  async create(postBody) {
    const { title, text, img, userId } = postBody
    let fileName = uuid.v4() + '.jpg'
    img.mv(path.resolve(__dirname, '..', 'static', fileName))
    const post = await postRepository.create({ ...postBody, img: fileName })
    return post
  }
}

module.exports = new PostService()
