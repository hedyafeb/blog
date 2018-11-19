const UserController = require('../controllers/userController')
const router = require('express').Router()

router.get('/', UserController.getAllUsers)
router.delete('/:userID', UserController.delete)
// router.put('/:userID', UserController.update)

module.exports = router