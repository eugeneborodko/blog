const Router = require('express')
const router = new Router()
const userController = require('../controllers/user-controller')
const validateRegistration = require('../validators/registration')
const authMiddleware = require('../middlewares/auth-middleware')
const checkRoleMiddleware = require('../middlewares/check-role-middleware')

router.get('/users', authMiddleware, userController.getAll)
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
router.delete('/delete/:id', checkRoleMiddleware(2), userController.delete)

module.exports = router
