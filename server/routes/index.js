const router = require('express').Router()
const article = require('./article.js')
// const comment = require('./comment.js')
const user = require('./user.js')
const UserController = require('../controllers/userController') 
 
router.use('/article', article)
// router.use('/article', comment)
router.use('/user', user)

router.post('/register', UserController.register)
router.post('/login', UserController.login)

module.exports = router
