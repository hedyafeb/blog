const User = require('../models/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require('dotenv').config()

class UserController {
    static register(req, res) {
        if (!req.body.email) {
            res.status(400).json({msg: "email field must be filled in"})
        } else {
            if (!req.body.password) {
                res.status(400).json({msg: "password field must be filled in"})
            } else {
                User.findOne({ email: req.body.email })
                .then( user => {
                    if (user) {
                        res.status(400).json({msg: "email is already registered"})
                    } else {
                        bcrypt.hash(req.body.password, 10, function(err, hash) {
                            User.create({
                                name: req.body.name,
                                email: req.body.email,
                                password: hash
                            })
                            .then(response => {
                                res.status(201).json(response)
                            })
                            .catch(err => {
                                res.status(500).json(err)
                            })
                        })
                    }
                })
                .catch( err => {
                    res.status(500).json(err)
                })
            }
        }
    }

    static login(req, res) {
        if (!req.body.email) {
            res.status(400).json({msg: "email field must be filled in"})
        } 
        else {
            if (!req.body.password) {
                res.status(400).json({msg: "password field must be filled in"})
            } 
            else {
                User.findOne({email: req.body.email})
                .then( user => {
                    console.log(user);
                    bcrypt.compare(req.body.password, user.password) 
                    .then( result => {
                        if (result === true) {
                            let accesstoken = jwt.sign({
                                email: req.body.email,
                                userID: user._id,
                                name: user.name 
                            }, process.env.JWT_TOKEN)
                            res.status(200).json({accesstoken, userID: user._id, name: user.name}) 
                        }
                        else {
                            res.status(400).json({err, msg: 'invalid password'}) 
                        }
                    })
                    .catch(err => {
                        console.log('error before jwt:', err);
                        res.status(500).json({err: err, msg: 'wrong password'})
                    })
                })
                .catch(err => {
                    res.status(500).json({err, msg: "User is not registered"})
                })
            }
        }
    }

    static getAllUsers(req, res) {
        User.find()
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static delete(req, res) {
        User.deleteOne({ _id: req.params.userID })
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

}

module.exports = UserController;