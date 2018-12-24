const chai = require('chai')
const chaiHttp = require('chai-http') 
const app = require('../app.js')
const expect = chai.expect 
require('dotenv').config()
const jwt = require('jsonwebtoken')
const User = require('../models/user')
chai.use(chaiHttp)



// USER REGISTER:
describe('REGISTER testing', function() {
    afterEach(function(done) {
        User.deleteOne({
            name: 'Test User',
        })
        .then( response => {
            console.log(`AFTER register testing. AFTER deleted user. response: ${response}`);
            done()
        })
        .catch( err => {
            console.log(`AFTER register testing. ERR: ${err}`);
        })
    })

    it('should return status 201 as user is successfully registered', function(done) {
        chai.request(app)
            .post('/register')
            .send({
                name: "Test User",
                email: "test@mail.com",
                password: "123"
            })
            .end(function(err, res) {
                expect(res).to.have.status(201)
                expect(res.body).to.have.property('_id')
                expect(res.body).to.have.property('name')
                expect(res.body).to.have.property('email')
                expect(res.body).to.have.property('password')
                expect(res.body).to.have.property('createdAt')
                expect(res.body).to.have.property('updatedAt')
                done()
            })
    })

    it('should return 400 if email field is not filled in', function(done) {
        chai.request(app)
            .post('/register')
            .send({
                name: "Test User",
                password: "123"
            })
            .end(function(err, res) {
                expect(res).to.have.status(400)
                expect(res.body).to.have.property('msg').to.equal("email field must be filled in")
                done()
            })
    })

    it('should return 400 if password field is not filled in', function(done) {
        chai.request(app)
            .post('/register')
            .send({
                name: "Test User",
                email: "test@mail.com"
            })
            .end(function(err, res) {
                expect(res).to.have.status(400)
                expect(res.body).to.have.property('msg').to.equal("password field must be filled in")
                done()
            })
    })

    it('should return status 400 if user is already registered', function(done) {
        chai.request(app)
            .post('/register')
            .send({
                name: "Hedya Febritanti",
                email: "hedya@mail.com",
                password: "123"
            })
            .end(function(err, res) {
                expect(res).to.have.status(400)
                expect(res.body).to.have.property('msg').to.equal("email is already registered")
                done()
            })
    })
})



describe('LOGIN testing', function() {
    before(function(done) {
        User.create({
            name: 'Test User',
            email: 'test@mail.com',
            password: '123'
        })
        .then( user => {
            console.log(`BEFORE login testing. AFTER created user. user: ${user}`);
            done()
        })
        .catch( err => {
            console.log(`BEFORE login testing. ERR: ${err}`);
        })
    })

    after(function(done) {
        User.deleteOne({
            name: 'Test User',
        })
        .then( response => {
            console.log(`AFTER login testing. AFTER deleted user. response: ${response}`);
            done()
        })
        .catch( err => {
            console.log(`AFTER login testing. ERR: ${err}`);
        })
    })


    it('should return 400 if email field is not filled in', function(done) {
        chai.request(app)
            .post('/login')
            .send({
                password: "123"
            })
            .end(function(err, res) {
                expect(res).to.have.status(400)
                expect(res.body).to.have.property('msg').to.equal("email field must be filled in")
                done()
            })
    })

    it('should return 400 if password field is not filled in', function(done) {
        chai.request(app)
            .post('/login')
            .send({
                email: "test@mail.com"
            })
            .end(function(err, res) {
                expect(res).to.have.status(400)
                expect(res.body).to.have.property('msg').to.equal("password field must be filled in")
                done()
            })
    })
})
