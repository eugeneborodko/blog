const { body } = require('express-validator')

const validatePost = () => [
  body('title').isLength({ min: 2, max: 32 }),
  body('text').isLength({ min: 3, max: 3200 }),
  body('img').isEmpty(),
  body('userId').isNumeric()
]

module.exports = validatePost