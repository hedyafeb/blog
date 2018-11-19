const router = require('express').Router()
const articleController = require('../controllers/articleController.js')
const isAuthenticated = require('../middlewares/isAuthenticated')
const commentController = require('../controllers/commentController.js')

router.post('/', isAuthenticated , articleController.create)
router.get('/', articleController.read)
router.post('/myArticles', isAuthenticated, articleController.readMyArticles)
router.delete('/:articleID', isAuthenticated, articleController.deleteOne)
router.get('/:articleID', articleController.readOne)
router.put('/:articleID', articleController.update)


router.post('/:articleID/addComment', isAuthenticated, commentController.createComment) 
router.get('/:articleID/comments', commentController.readComment) 
router.delete('/:articleID/:commentID', isAuthenticated, commentController.deleteComment)
router.put('/:articleID/:commentID', isAuthenticated, commentController.editComment)




module.exports = router