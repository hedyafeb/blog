const chai = require('chai')
const chaiHttp = require('chai-http') 
const app = require('../app.js')
const expect = chai.expect 
require('dotenv').config()
const jwt = require('jsonwebtoken')
const Article = require('../models/article.js')
const User = require('../models/user')
chai.use(chaiHttp)

// run specific unit testing: npm test -- --grep 'read article'

let accesstoken = ""
let userID = ""
let article = ""

describe('article CRUD tests', function() {
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
            done()
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


    // TESTING create an article:
    it('should return article data and success status 201', function(done) {
        chai.request(app)
            .post('/article')
            .set('accesstoken', accesstoken)
            .send({
                title: 'testArticle',
                detail: 'this is description of creating a new article',
                userID: userID 
            })
            .end(function (err, res) {
                article = res.body
                
                expect(err).to.be.null;
                expect(res).to.have.status(201);
                expect(res.body).to.have.property('_id');
                expect(res.body).to.have.property('title');
                expect(res.body).to.have.property('detail');
                // expect(res.body).to.have.property('userID');
                expect(res.body).to.have.property('createdAt');
                expect(res.body).to.have.property('updatedAt');
                expect(res.body).to.be.an('object');
                done()
            })
    })

    it('should return status 401 and user must be logged in first', function(done) {
        chai.request(app)
            .post('/article')
            .send({
                title: 'testArticle',
                detail: 'this is description of creating a new article'
            })
            .end(function (err, res) {
                expect(res).to.have.status(401)
                expect(res.body).to.have.property('msg').to.equal("accesstoken is not found");
                done()
            })
    })

    it('should have "title" field to be filled in', function(done) {
        chai.request(app)
            .post('/article')
            .set('accesstoken', accesstoken)
            .send({
                detail: 'this is description of creating a new article'
            })
            .end(function (err, res) {
                expect(res).to.have.status(400)
                expect(res.body).to.have.property('msg').to.equal("title field must be filled in")
                done()
            })
    })

    // TESTING read ARTICLE:
    it('should have success status 200 and have output of all articles', function(done) {
        chai.request(app)
            .get('/article')
            .end(function (err, res) {
                expect(res).to.have.status(200)
                expect(res.body[0]).to.have.property('_id')
                expect(res.body[0]).to.have.property('title')
                expect(res.body[0]).to.have.property('userID')
                expect(res.body[0]).to.have.property('createdAt')
                expect(res.body[0]).to.have.property('updatedAt')
                done()
            })
    })

    // TESTING update ARTICLE
    it('should have success status 200 and updated article based on its ID', function(done) {
        chai.request(app)
            .put(`/article/${article._id}`)
            .set('accesstoken', accesstoken)
            .send({
                title: 'testArticleUpdate',
                detail: 'this is updated description of creating a new article'
            })
            .end(function (err, res) {
                expect(res).to.have.status(200)
                expect(err).to.be.null;
                done()
            })
    })

    // TESTING delete ARTICLE
    it('should have success status 200 and deleted article based on its ID', function(done) {
        chai.request(app)
            .delete(`/article/${article._id}`)
            .set('accesstoken', accesstoken)
            .end(function (err, res) {
                expect(res).to.have.status(200)
                expect(err).to.be.null;
                done()
            })
    })
})





