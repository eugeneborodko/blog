const Router = require('express')
const router = new Router()
const validatePost = require('../validators/post')
const authMiddleware = require('../middlewares/auth-middleware')
const postController = require('../controllers/post-controller')

router.get('/', authMiddleware, postController.getAll)
router.get('/:id', authMiddleware, postController.getOne)

router.post('/create', authMiddleware, validatePost(), postController.create)

module.exports = router
