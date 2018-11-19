const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
    title: String,
    detail: String,
    articleID: { type: Schema.Types.ObjectId, ref: 'Article' },
    userID: { type: Schema.Types.ObjectId, ref: 'User' }
}, {timestamps: true}) 

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment;