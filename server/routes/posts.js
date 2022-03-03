const Router = require('express')
const router = new Router()
const validatePost = require('../validators/post')
const postController = require('../controllers/post-controller')

router.post('/create', validatePost(), postController.create)

module.exports = router
