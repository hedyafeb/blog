const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: String,
    email: String,
    password: String
    // articleID: [{ type: Schema.Types.ObjectId, ref: 'Article' }]
}, {timestamps: true}) 

const User = mongoose.model('User', userSchema)

module.exports = User;