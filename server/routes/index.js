const Router = require('express')
const router = new Router()
const userController = require('../controllers/user-controller')
const validateRegistration = require('../validators/registration')

router.get('/getAll', userController.getAll)
router.post(
  '/registration',
  validateRegistration(),
  userController.registration
)
router.post(
  '/login',
  validateRegistration(),
  userController.login
)
router.post(
  '/logout',
  userController.logout
)
router.get(
  '/refresh',
  userController.refresh
)

module.exports = router
