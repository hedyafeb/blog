const Comment = require('../models/comment')

class CommentController {
    static createComment(req, res) { 
        Comment.create({
            title: req.body.title,
            detail: req.body.detail,
            articleID: req.params.articleID,
            userID: req.userID 
        })
        .then( response => {
            res.status(201).json(response)
        })
        .catch( err => {
            res.status(500).json({err, msg: 'error from create comment'})
        })
    }

    static readComment(req, res) {
        Comment.find({ 
            articleID: req.params.articleID
        })
        .populate('userID')
        .then( response => {
            res.status(200).json(response)
        })
        .catch( err => {
            res.status(500).json({err, msg: 'error from read all comments of article'})
        })
    }
    
    static deleteComment(req, res) {
        Comment.deleteOne({
            articleID: req.params.articleID,
            _id: req.params.commentID,
            userID: req.userID
        })
        .then( response => {
            res.status(200).json(response)
        })
        .catch( err => {
            res.status(500).json({err, msg: 'error from deleting comment of article'})
        })
    }

    static editComment(req, res) {
        Comment.updateOne({
            _id: req.params.commentID,
            userID: req.userID,
            articleID: req.params.articleID
        }, {
            title: req.body.title,
            detail: req.body.detail
        })
        .then( response => {
            res.status(200).json(response)
        })
        .catch( err => {
            res.status(500).json({err, msg: 'error from editing comment'})
        })
    }

}

module.exports = CommentController;

