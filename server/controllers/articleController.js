const Article = require('../models/article.js')

class articleController {
    static create(req, res) {
        if (!req.body.title) {
            res.status(400).json({msg: "title field must be filled in"})
        }
        else {
            Article.create({
                title: req.body.title,
                detail: req.body.detail,
                userID: req.userID
            })
            .then( response => {
                res.status(201).json(response)
            })
            .catch( err => {
                res.status(500).json({err, message: 'error from create Article'})
            })
        }
    }

    static read(req, res) {
        Article.find()
        .populate('userID')
        .then( response => {
            res.status(200).json(response)
        })
        .catch( err => {
            res.status(500).json({err})
        })
    }

    static deleteOne(req, res) { 
        Article.deleteOne({
            _id: req.params.articleID
        })
        .then( response => {
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(500).json({err})
        })
    }

    static readOne(req, res) {
        Article.findOne({ _id: req.params.articleID})
        .populate('userID')
        .then( response => {
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static readMyArticles(req, res) {
        Article.find({ userID: req.userID})
        .then( response => {
            res.status(200).json(response)
        })
        .catch( err => {
            res.status(500).json(err)
        })
    }

    static update(req, res) {
        Article.findOneAndUpdate({ _id: req.params.articleID}, {
            title: req.body.title,
            detail: req.body.detail
        })
        .then( response => {
            res.status(200).json(response)
        })
        .catch( err => {
            res.status(500).json(err)
        })
    }
}


module.exports = articleController