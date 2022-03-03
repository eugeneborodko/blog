const Router = require('express')
const router = new Router()
const usersRouter = require('./users')
const postRouter = require('./posts')

router.use('/users', usersRouter)
router.use('/posts', postRouter)

module.exports = router
