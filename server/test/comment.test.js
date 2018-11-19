const chai = require('chai')
const chaiHttp = require('chai-http') 
const app = require('../app.js')
const expect = chai.expect 
require('dotenv').config()
const jwt = require('jsonwebtoken')
// const Comment = require('../models/comment')
const Article = require('../models/article')
const User = require('../models/user')
chai.use(chaiHttp)

let accesstoken = ""
let userID = ""
let article = {}
let comment = {}

describe('comment CRUD tests', function() {
    before(function(done) {
        User.create({
            name: 'test user',
            email: 'test@mail.com',
            password: '123'
        })
        .then( user => {
            console.log(`AFTER user created: ${user}, BEFORE testing crud article`);
            accesstoken = jwt.sign({
                name: user.name,
                email: user.email,
                password: user.password
            }, process.env.JWT_TOKEN);
            userID = user._id 

            Article.create({
                title: "testArticle",
                detail: "testArticle content"
            })
            .then(response => {
                console.log(response, 'ini dari commnettt nihhh');
                article = response
                console.log(`AFTER article created, BEFORE testing crud comment. response: ${response}`);
                done()
            })
            .catch( err => {
                console.log(`AFTER article created, BEFORE testing crud comment. ERR: ${err}`);
            })
        })
        .catch( err => {
            console.log(`AFTER user created, BEFORE testing crud article. ERR: ${err}`);
        })
    })


    after(function(done) {
        User.deleteOne({
            email: 'test@mail.com'
        })
        .then( response => {
            console.log(`AFTER DELETED user, AFTER testing crud article. response: ${response}`);
            Article.deleteOne({
                title: 'testArticle'
            })
            .then( response => {
                console.log(`AFTER DELETED article, AFTER testing crud article, response: ${response}`);
                done()
            })
            .catch( err => {
                console.log(`AFTER DELETED article, AFTER testing crud article. ERR: ${err}`);
            })
        })
        .catch( err => {
            console.log(`AFTER DELETED user, AFTER testing crud article. ERR: ${err}`);
        })
    })

    // TESTING create an comment:
    it('should return comment data and success status 201', function(done) {
        chai.request(app)
            .post(`/article/${article._id}/addComment`)
            .set('accesstoken', accesstoken)
            .send({
                title: 'testComment',
                detail: 'this is description of new Comment',
            })
            .end(function (err, res) {
                comment = res.body
                expect(err).to.be.null;
                expect(res).to.have.status(201);
                expect(res.body).to.have.property('_id');
                expect(res.body).to.have.property('title');
                expect(res.body).to.have.property('detail');
                expect(res.body).to.have.property('createdAt');
                expect(res.body).to.have.property('updatedAt');
                expect(res.body).to.be.an('object');
                done()
            })
    })


    // TESTING read a comment:
    it('should have success status 200 and have output of all comments', function(done) {
        chai.request(app)
            .get(`/article/${article._id}/comments`)
            .end(function (err, res) {
                expect(res).to.have.status(200)
                expect(res.body[0]).to.have.property('_id')
                expect(res.body[0]).to.have.property('title')
                expect(res.body[0]).to.have.property('detail')
                expect(res.body[0]).to.have.property('articleID')
                expect(res.body[0]).to.have.property('userID')
                expect(res.body[0]).to.have.property('createdAt')
                expect(res.body[0]).to.have.property('updatedAt')
                done()
            })
    })


    // TESTING delete COMMENT
    it('should have success status 200 and deleted comment', function(done) {
        chai.request(app)
            .delete(`/article/${article._id}/${comment._id}`)
            .set('accesstoken', accesstoken)
            .end(function (err, res) {
                expect(res).to.have.status(200)
                expect(err).to.be.null;
                done()
            })
    })

})


