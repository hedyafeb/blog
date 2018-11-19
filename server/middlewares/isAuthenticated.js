const jwt = require('jsonwebtoken')
require('dotenv').config()
const User = require('../models/user')

function isAuthenticated(req, res, next) {
    if (req.headers.accesstoken) {
        jwt.verify(req.headers.accesstoken, process.env.JWT_TOKEN, (err, decoded) => {
            if (decoded) {
                User.findOne({ email: decoded.email }) 
                .then( user => {
                    if (user) {
                        req.userID = user._id
                        next()
                    }
                    else {
                        res.status(401).json({err, msg: 'you cannot access this page'}) 
                    }
                })
                .catch( err => {
                    res.status(500).json(err) 
                })
            }
            else {
                res.status(500).json({err, msg: 'something wrong with the token decoding'}) 
            }
        })
    }
    else {
        res.status(401).json({msg: 'accesstoken is not found'}) 
    }
}

module.exports = isAuthenticated

